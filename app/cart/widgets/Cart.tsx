"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "@/store/slices/cartSlice";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

export const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(String(item.price).replace(/[^0-9.]/g, ""));
    return sum + price * item.quantity;
  }, 0);

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      console.error(data.error);
    }
  };

  if (!cartItems.length) {
    return (
      <div className="pt-20 pb-24">
        <Container>
          <div className="mx-auto max-w-xl rounded-3xl border border-black/10 bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl font-semibold text-gray-900">Cart</h1>
            <p className="mt-3 text-gray-500">
              Your cart is empty. Let’s add something nice.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition"
            >
              Continue shopping
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-24">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Cart</h1>
            <p className="mt-1 text-gray-500">
              {cartItems.length} item{cartItems.length > 1 ? "s" : ""} in your
              cart
            </p>
          </div>

          <Link
            href="/"
            className="hidden sm:inline-flex rounded-2xl border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-black/5 transition"
          >
            Continue shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex gap-4 sm:gap-5">
                  <div className="relative h-28 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:h-32 sm:w-28">
                    {item.src ? (
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.collection}
                        </p>
                        <span className="mt-2 inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                          Size: {item.size}
                        </span>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {item.price}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-2 py-2">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              decreaseQuantity({
                                id: item.id,
                                size: item.size,
                              }),
                            )
                          }
                          className="grid cursor-pointer h-9 w-9 place-items-center rounded-xl hover:bg-black/5 active:scale-[0.98] transition"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus />
                        </button>

                        <span className="min-w-[36px] text-center text-sm font-semibold text-gray-900">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => dispatch(addToCart(item))}
                          className="grid cursor-pointer h-9 w-9 place-items-center rounded-xl hover:bg-black/5 active:scale-[0.98] transition"
                          aria-label="Increase quantity"
                        >
                          <FiPlus />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            removeFromCart({ id: item.id, size: item.size }),
                          )
                        }
                        className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-black/5 transition"
                      >
                        <FiTrash2 />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-3xl border border-black/10 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-gray-900">
              Order summary
            </h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-gray-900">Calculated</span>
              </div>
              <div className="h-px w-full bg-black/5" />
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total</span>
                <span className="text-lg font-semibold text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-6 w-full cursor-pointer rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90 transition"
            >
              Checkout
            </button>

            <p className="mt-3 text-center text-xs text-gray-500">
              Secure checkout • Fast delivery
            </p>
          </aside>
        </div>
      </Container>
    </div>
  );
};
