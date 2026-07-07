// app/api/orders/[id]/cancel/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/firebase-admin";
import { adminAuth as auth } from "@/lib/firebase-admin-auth";
import { sendOrderCancelledEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface Props {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: Props) {
  const { id: orderId } = await params;

  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = await auth.verifyIdToken(authHeader.split("Bearer ")[1]);
  } catch (err) {
    console.error("Token verification failed:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    const orderRef = db.collection("orders").doc(orderId);
    const orderSnap = await orderRef.get();

    if (!orderSnap.exists) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const order = orderSnap.data()!;

    if (order.userId !== decoded.uid) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (order.status !== "pending") {
      return NextResponse.json(
        { error: "Only pending orders can be cancelled" },
        { status: 400 },
      );
    }

    if (order.stripeSessionId) {
      try {
        await stripe.checkout.sessions.expire(order.stripeSessionId);
      } catch (err) {
        console.warn("Could not expire Stripe session:", err);
      }
    }

    await orderRef.update({
      status: "cancelled",
      cancelledAt: new Date().toISOString(),
    });

    try {
      const userRecord = await auth.getUser(decoded.uid);
      if (userRecord.email) {
        await sendOrderCancelledEmail(userRecord.email, {
          orderId,
          items: order.items,
          totalCents: order.totalCents,
        });
      }
    } catch (emailErr) {
      console.error("Failed to send cancellation email:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to cancel order:", err);
    return NextResponse.json(
      { error: "Failed to cancel order" },
      { status: 500 },
    );
  }
}
