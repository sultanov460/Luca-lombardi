"use client";

import { Container } from "@/components/Container";
import { signSchema } from "@/schemas/sign";
import type { LoginFormData } from "@/types/login";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import z from "zod";

import { firebaseAuth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

interface ErrorsState {
  email: string | null;
  password: string | null;
}

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ErrorsState>({
    email: null,
    password: null,
  });

  const [show, setShow] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    const result = signSchema.safeParse(formData);
    if (!result.success) {
      const flattened = z.flattenError(result.error);
      const fieldErrors = flattened.fieldErrors;

      setErrors({
        email: fieldErrors.email?.[0] || null,
        password: fieldErrors.password?.[0] || null,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(
        firebaseAuth,
        result.data.email,
        result.data.password,
      );

      router.push("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        const code = String(err?.code || "");
        if (code === "auth/invalid-credential") {
          setErrorMessage("Неверный email или пароль.");
        } else {
          setErrorMessage("Ошибка входа. Попробуй ещё раз.");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="pt-20 pb-30">
      <Container>
        <form
          onSubmit={handleLogin}
          className="grid grid-cols-1 gap-5 shadow-2xl rounded-3xl p-8 w-full sm:w-150 mx-auto"
        >
          <h1 className="text-4xl tracking-[2px] text-center mb-1">Sign In</h1>

          {errorMessage && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col gap-5">
            <div className="flex flex-col relative">
              <input
                type="email"
                placeholder="Email"
                className="bg-[#f2f2f2] py-3 px-2 rounded-xl outline-none"
                onChange={handleChange}
                value={formData.email}
                name="email"
                autoComplete="email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="flex flex-col relative">
              <input
                type={show ? "password" : "text"}
                className="bg-[#f2f2f2] py-3 px-2 rounded-xl outline-none pr-12"
                placeholder="Password"
                onChange={handleChange}
                name="password"
                value={formData.password}
                autoComplete="current-password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.password}
                </span>
              )}

              <button
                type="button"
                className="absolute top-3 right-5 cursor-pointer"
                onClick={() => setShow((s) => !s)}
              >
                {show ? <IoEye size={20} /> : <IoEyeOff size={20} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <Link
                href={"/forgot-password"}
                className="text-sky-500 xl:hover:underline text-sm"
              >
                Forgot password?
              </Link>
            </div>

            <button
              disabled={isSubmitting}
              className="bg-black text-white font-medium tracking-[2px] py-3 rounded-3xl cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing in..." : "Login"}
            </button>

            <span className="text-sm mx-auto">
              Don&apos;t have an account{" "}
              <Link
                href={"/signup"}
                className="text-sky-500 xl:hover:underline ml-1"
              >
                Create an account now
              </Link>
            </span>
          </div>
        </form>
      </Container>
    </div>
  );
}
