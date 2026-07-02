"use client";

import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCart } from "@/store/slices/cartSlice";
import { CartProduct } from "@/types/product";

const CART_COOKIE_KEY = "cart";

export const CartPersistence = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [cookies, setCookie] = useCookies([CART_COOKIE_KEY]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const savedCart = cookies[CART_COOKIE_KEY] as CartProduct[] | undefined;
    if (savedCart && Array.isArray(savedCart)) {
      dispatch(setCart(savedCart));
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setCookie(CART_COOKIE_KEY, cartItems, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
  }, [cartItems, setCookie]);

  return null;
};
