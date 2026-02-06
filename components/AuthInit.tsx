"use client";

import { useAuthListener } from "@/hooks/useAuthListener";

export function AuthInit() {
  useAuthListener();
  return null;
}
