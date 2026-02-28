"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchQuery } from "@/store/slices/searchSlice";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { IoMdSearch } from "react-icons/io";

type Props = {
  className?: string;
};

export default function Search({ className = "" }: Props) {
  const { query } = useAppSelector((s) => s.search);
  const router = useRouter();
  const dispatch = useAppDispatch();

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    router.push("/search");
  }

  return (
    <form
      onSubmit={handleSearch}
      className={`relative hidden md:block w-full ${className}`}
    >
      <input
        className="w-full rounded-2xl border border-black/10 bg-white/85 px-4 py-3 pr-12 text-sm text-gray-900 outline-none
        placeholder:text-gray-400 focus:border-black/20 focus:ring-4 focus:ring-black/5 transition"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2 text-gray-700 hover:bg-black/5 active:scale-[0.98] transition"
        aria-label="Search"
      >
        <IoMdSearch size={22} />
      </button>
    </form>
  );
}
