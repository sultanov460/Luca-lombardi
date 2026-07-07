// app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { adminAuth as auth } from "@/lib/firebase-admin-auth";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const idToken = authHeader.split("Bearer ")[1];
  let decoded;

  try {
    decoded = await auth.verifyIdToken(idToken);
  } catch (err) {
    console.error("Token verification failed:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    const snapshot = await db
      .collection("orders")
      .where("userId", "==", decoded.uid)
      .orderBy("createdAt", "desc")
      .get();

    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ orders });
  } catch (err) {
    console.error("Firestore query failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch orders", details: (err as Error).message },
      { status: 500 },
    );
  }
}
