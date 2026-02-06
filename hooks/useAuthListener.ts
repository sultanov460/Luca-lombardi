"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";
import { useAppDispatch } from "@/store/hooks";
import { setLoading, setUser } from "@/store/slices/authSlice";

export function useAuthListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsub = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
          }),
        );
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsub();
  }, [dispatch]);
}
