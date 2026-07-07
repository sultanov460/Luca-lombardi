// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/firebase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      console.error("No orderId in session metadata");
      return NextResponse.json({ received: true });
    }

    try {
      await db.runTransaction(async (tx) => {
        const orderRef = db.collection("orders").doc(orderId);
        const orderSnap = await tx.get(orderRef);

        if (!orderSnap.exists) {
          throw new Error(`Order not found: ${orderId}`);
        }

        const order = orderSnap.data()!;

        if (order.status === "paid") {
          return;
        }

        const items = order.items as {
          productId: string;
          sizeId: number;
          quantity: number;
        }[];

        // --- ФАЗА 1: ВСЕ ЧТЕНИЯ ---
        const productRefs = items.map((item) =>
          db.collection("products").doc(item.productId),
        );
        const productSnaps = await Promise.all(
          productRefs.map((ref) => tx.get(ref)),
        );

        // --- ФАЗА 2: ВСЕ ЗАПИСИ ---
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const productSnap = productSnaps[i];

          if (!productSnap.exists) continue;

          const data = productSnap.data()!;
          const sizes = data.sizes as {
            id: number;
            label: string;
            stock: number;
          }[];
          const sizeIndex = sizes.findIndex((s) => s.id === item.sizeId);

          if (sizeIndex === -1) continue;

          const updatedSizes = [...sizes];
          updatedSizes[sizeIndex] = {
            ...updatedSizes[sizeIndex],
            stock: Math.max(0, updatedSizes[sizeIndex].stock - item.quantity),
          };

          tx.update(productRefs[i], { sizes: updatedSizes });
        }

        tx.update(orderRef, {
          status: "paid",
          paidAt: new Date().toISOString(),
        });
      });
    } catch (err) {
      console.error("Failed to process order after payment:", err);
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      try {
        const orderRef = db.collection("orders").doc(orderId);
        const orderSnap = await orderRef.get();

        if (orderSnap.exists && orderSnap.data()?.status === "pending") {
          await orderRef.update({ status: "expired" });
        }
      } catch (err) {
        console.error("Failed to mark order expired:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
