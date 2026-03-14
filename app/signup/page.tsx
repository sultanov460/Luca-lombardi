"use client";

import { Container } from "@/components/Container";
import { useAuth } from "@/hooks/useAuth";
import { signSchema } from "@/schemas/sign";
import type { LoginFormData } from "@/types/login";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoEye, IoEyeOff } from "react-icons/io5";
import z from "zod";
import { firebaseAuth } from "@/lib/firebase";
import { Metadata } from "next";

interface ErrorsState {
  email: string | null;
  password: string | null;
}

export const metadata: Metadata = {
  title: "Signup",
};

export default function Signup() {
  const router = useRouter();
  const { handleGoogleLogin } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ErrorsState>({
    email: null,
    password: null,
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [show, setShow] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
    setErrorMessage(null);
  }

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
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
      await createUserWithEmailAndPassword(
        firebaseAuth,
        result.data.email,
        result.data.password,
      );

      router.push("/");
    } catch (err: any) {
      const code = String(err?.code || "");
      if (code === "auth/email-already-in-use") {
        setErrorMessage("Этот email уже зарегистрирован.");
      } else if (code === "auth/weak-password") {
        setErrorMessage("Слабый пароль (минимум 6 символов).");
      } else if (code === "auth/invalid-email") {
        setErrorMessage("Неверный email.");
      } else {
        setErrorMessage("Ошибка регистрации. Попробуй ещё раз.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleClick() {
    setErrorMessage(null);
    setIsGoogleSubmitting(true);
    try {
      await handleGoogleLogin();
      router.push("/");
    } catch (err) {
      console.error("Google signup failed:", err);
      setErrorMessage(
        "Не удалось зарегистрироваться через Google. Попробуй ещё раз.",
      );
    } finally {
      setIsGoogleSubmitting(false);
    }
  }

  return (
    <div className="pt-20 pb-30">
      <Container>
        <div className="w-full sm:w-150 mx-auto">
          <div className="grid grid-cols-1 gap-5 shadow-2xl rounded-3xl p-8">
            <h1 className="text-4xl tracking-[2px] text-center mb-1">
              Sign Up
            </h1>

            {errorMessage && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <button
              type="button"
              onClick={handleGoogleClick}
              disabled={isSubmitting || isGoogleSubmitting}
              className="w-full flex items-center justify-center gap-3 rounded-3xl py-3 font-medium border border-neutral-200 bg-white cursor-pointer transition xl:hover:shadow-md xl:hover:-translate-y-[1px] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FcGoogle size={22} />
              {isGoogleSubmitting ? "Creating..." : "Sign up with Google"}
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-neutral-200" />
              <span className="text-xs text-neutral-500">OR</span>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            <form onSubmit={handleSignup} className="grid grid-cols-1 gap-5">
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
                  autoComplete="new-password"
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

              <button
                disabled={isSubmitting || isGoogleSubmitting}
                className="bg-black text-white font-medium tracking-[2px] py-3 rounded-3xl cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating..." : "Signup"}
              </button>

              <span className="text-sm mx-auto">
                Already have an account{" "}
                <Link
                  href={"/login"}
                  className="text-sky-500 xl:hover:underline ml-1"
                >
                  Sign in
                </Link>
              </span>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
