// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { parsePriceToCents } from "@/lib/parsePrice";
import { db } from "@/lib/firebase-admin";
import { CartProduct } from "@/types/product";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CartProduct[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const line_items = [];
    const orderItems = [];

    for (const item of items) {
      const requestedSize = item.sizes[0];
      const snap = await db.collection("products").doc(item.id).get();

      if (!snap.exists) {
        throw new Error(`Product not found: ${item.id}`);
      }

      const data = snap.data()!;
      const sizes = data.sizes as {
        id: number;
        label: string;
        stock: number;
      }[];
      const size = sizes.find((s) => s.id === requestedSize.id);

      if (!size) {
        throw new Error(`Size not found for product: ${item.id}`);
      }

      if (item.quantity > size.stock) {
        throw new Error(
          `Not enough stock for ${data.title} (${size.label}). Available: ${size.stock}`,
        );
      }

      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `${data.title} (Size: ${size.label})`,
          },
          unit_amount: parsePriceToCents(data.price),
        },
        quantity: item.quantity,
      });

      orderItems.push({
        productId: item.id,
        sizeId: size.id,
        quantity: item.quantity,
      });
    }

    const orderRef = await db.collection("orders").add({
      items: orderItems,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      metadata: {
        orderId: orderRef.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
