"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase"; // поправь путь под свой файл
import { Container } from "@/components/Container";

interface OrderItem {
  productId: string;
  title: string;
  src: string;
  sizeId: number;
  sizeLabel: string;
  unitPriceCents: number;
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalCents: number;
  status: "pending" | "paid" | "expired" | "cancelled";
  createdAt: string;
  paidAt?: string;
}

const statusLabels: Record<
  Order["status"],
  { label: string; className: string }
> = {
  pending: {
    label: "Awaiting payment",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  paid: {
    label: "Paid",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  expired: {
    label: "Expired",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-gray-100 text-gray-500 border-gray-200",
  },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loggedOut, setLoggedOut] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (fbUser) => {
      if (!fbUser) {
        setLoggedOut(true);
        setLoading(false);
        return;
      }

      try {
        const idToken = await fbUser.getIdToken();

        const res = await fetch("/api/orders", {
          headers: { Authorization: `Bearer ${idToken}` },
        });

        if (!res.ok) throw new Error("Failed to load orders");

        const data = await res.json();
        setOrders(data.orders);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleCancel = async (orderId: string) => {
    setCancellingId(orderId);

    try {
      const idToken = await firebaseAuth.currentUser?.getIdToken();

      const res = await fetch(`/api/orders/${orderId}/cancel`, {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (!res.ok) throw new Error("Failed to cancel order");

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "cancelled" } : o)),
      );
    } catch (err) {
      console.error(err);
      alert("Failed to cancel the order. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return (
      <Container className="py-20 text-center text-gray-500">
        Loading orders...
      </Container>
    );
  }

  if (loggedOut) {
    return (
      <Container className="py-20 text-center text-gray-500">
        Sign in to view your order history.
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-20 text-center text-red-500">{error}</Container>
    );
  }

  if (!orders.length) {
    return (
      <Container className="py-20 text-center text-gray-500">
        You don&apos;t have any orders yet.
      </Container>
    );
  }

  return (
    <Container className="py-14">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => {
          const status = statusLabels[order.status];
          const totalQuantity = order.items.reduce(
            (sum, item) => sum + item.quantity,
            0,
          );

          return (
            <div
              key={order.id}
              className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/5 pb-4">
                <div>
                  <p className="text-xs text-gray-400">
                    Order #{order.id.slice(0, 8)}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${status.className}`}
                  >
                    {status.label}
                  </span>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Total</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${(order.totalCents / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                      {item.src && (
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="60px"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        Size: {item.sizeLabel} · Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      $
                      {((item.unitPriceCents * item.quantity) / 100).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  Total items: {totalQuantity}
                </p>

                {order.status === "pending" && (
                  <button
                    type="button"
                    onClick={() => handleCancel(order.id)}
                    disabled={cancellingId === order.id}
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {cancellingId === order.id
                      ? "Cancelling..."
                      : "Cancel order"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
