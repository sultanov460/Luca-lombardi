"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { CookiesProvider } from "react-cookie";
import { CartPersistence } from "@/components/CartPersistence";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <CartPersistence />
        {children}
      </Provider>
    </CookiesProvider>
  );
}
