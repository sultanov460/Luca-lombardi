// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { parsePriceToCents } from "@/lib/parsePrice";
import { db } from "@/lib/firebase-admin";
import { CartProduct } from "@/types/product";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { items, userId }: { items: CartProduct[]; userId?: string } =
      await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json(
        { error: "User must be logged in to checkout" },
        { status: 401 },
      );
    }

    const line_items = [];
    const orderItems = [];
    let totalCents = 0;

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

      const unitPriceCents = parsePriceToCents(data.price);
      totalCents += unitPriceCents * item.quantity;

      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `${data.title} (Size: ${size.label})`,
          },
          unit_amount: unitPriceCents,
        },
        quantity: item.quantity,
      });

      orderItems.push({
        productId: item.id,
        title: data.title,
        src: data.src,
        sizeId: size.id,
        sizeLabel: size.label,
        unitPriceCents,
        quantity: item.quantity,
      });
    }

    const orderRef = await db.collection("orders").add({
      userId,
      items: orderItems,
      totalCents,
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

    await orderRef.update({ stripeSessionId: session.id });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
