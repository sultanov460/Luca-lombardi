"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLoading, setUser } from "@/store/slices/authSlice";
import CustomLoading from "@/widgets/CustomLoading";

export function AuthInit() {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.auth);

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

  if (loading) return <CustomLoading />;

  return null;
}
