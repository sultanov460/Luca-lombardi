"use client";

import Link from "next/link";
import { FiArrowLeft, FiRefreshCw, FiAlertCircle } from "react-icons/fi";

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-4xl items-center justify-center">
        <div className="w-full rounded-3xl bg-slate-800 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-12">
          <div className="mb-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/5">
              <FiAlertCircle className="text-3xl" />
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">
              Error
            </p>

            <h1 className="mt-4 text-6xl font-bold leading-none sm:text-7xl md:text-8xl">
              500
            </h1>

            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              Something went wrong
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              An unexpected error occurred while loading this page. Please try
              again or go back to the homepage.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/45">
              Error details
            </p>
            <p className="break-words text-sm leading-6 text-white/80">
              {error.message || "Unknown error"}
            </p>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={reset}
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-800 transition-all duration-300 hover:-translate-y-[2px] hover:bg-slate-100 hover:shadow-lg active:translate-y-0"
            >
              <FiRefreshCw className="text-base transition-transform duration-300 group-hover:rotate-180" />
              Try again
            </button>

            <Link
              href="/"
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition duration-300 hover:bg-white/10"
            >
              <FiArrowLeft className="text-base" />
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
