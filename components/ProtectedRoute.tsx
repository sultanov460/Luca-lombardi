"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({
  children,
  redirectTo = "/login",
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const { isAuthed, loading } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthed) {
      router.replace(redirectTo);
    }
  }, [loading, isAuthed, redirectTo, router]);

  if (loading) return null; // можно заменить на "Loading..."
  if (!isAuthed) return null; // пока редиректим

  return <>{children}</>;
}
