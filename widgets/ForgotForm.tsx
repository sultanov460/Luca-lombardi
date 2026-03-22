"use client";

import { Container } from "@/components/Container";
import { firebaseAuth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

export const ForgotForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setEmailError(null);
    setErrorMessage(null);
    setSuccessMessage(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setEmailError(null);
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setEmailError("Email is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      await sendPasswordResetEmail(firebaseAuth, trimmedEmail);

      setSuccessMessage(
        "We sent a password reset link to your email. Please check your inbox.",
      );
      setEmail("");
    } catch (err: unknown) {
      console.error("Reset password failed:", err);
      setErrorMessage("Failed to send reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="pt-20 pb-30">
      <Container>
        <div className="w-full sm:w-150 mx-auto">
          <div className="grid grid-cols-1 gap-5 rounded-3xl p-8 shadow-2xl">
            <h1 className="mb-1 text-center text-4xl tracking-[2px]">
              Forgot Password
            </h1>

            <p className="text-center text-sm text-neutral-500">
              Enter your email and we&apos;ll send you a link to reset your
              password.
            </p>

            {errorMessage && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
              <div className="flex flex-col">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="rounded-xl bg-[#f2f2f2] px-2 py-3 outline-none transition focus:ring-2 focus:ring-slate-800/10"
                />
                {emailError && (
                  <span className="mt-1 text-sm text-red-500">
                    {emailError}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer rounded-3xl bg-black py-3 font-medium tracking-[2px] text-white transition xl:hover:-translate-y-[1px] xl:hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>

              <div className="text-center text-sm">
                <Link
                  href="/login"
                  className="text-sky-500 transition xl:hover:underline"
                >
                  Back to Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};
