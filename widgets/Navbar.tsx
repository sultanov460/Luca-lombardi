"use client";

import { Container } from "@/components/Container";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { LuUser } from "react-icons/lu";
import { GrClose } from "react-icons/gr";
import { FiLogOut, FiShoppingCart } from "react-icons/fi";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { firebaseAuth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

import Search from "./Search";
import { MobileDrawer } from "./MobileDrawer";

export const Navbar = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const router = useRouter();

  const { user, loading } = useAppSelector((s) => s.auth);
  const { query } = useAppSelector((s) => s.search);

  const dispatch = useAppDispatch();

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/search");
  }

  function handleClose() {
    setIsNavActive(false);
  }

  const navLinks = [
    { id: 1, title: "Women", href: "/women-collection" },
    { id: 2, title: "Men", href: "/men-collection" },
    { id: 3, title: "Sunglasses", href: "/sunglasses-collection" },
    { id: 4, title: "New Collection", href: "/new-collection" },
  ];

  function toggleNav() {
    setIsNavActive((prev) => !prev);
  }

  async function handleLogout() {
    await firebaseAuth.signOut();
    router.push("/login");
  }

  const cartItemCount = useAppSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <nav className="sticky top-0 z-30 w-full bg-white text-gray-600 shadow-sm">
      <div>
        <Container className="flex items-center justify-between p-5">
          <Link href="/" className="text-xl font-bold tracking-wide">
            LUCA LOMBARDI
          </Link>

          <div className="flex items-center gap-6 md:gap-12">
            <Search onClose={handleClose} />
            {!loading && !user && (
              <Link
                href="/login"
                className="flex cursor-pointer items-center gap-2 text-sm transition hover:opacity-50"
              >
                <LuUser size={25} />
                <span className="hidden md:block">Login</span>
              </Link>
            )}

            {!loading && user && (
              <div className="flex items-center gap-6">
                <Link
                  href="/cart"
                  className="relative flex cursor-pointer items-center gap-2 text-sm transition hover:opacity-50"
                  title="Cart"
                >
                  <FiShoppingCart size={24} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2.5 right-6.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                      {cartItemCount > 9 ? "9+" : cartItemCount}
                    </span>
                  )}
                  <span className="hidden md:block">Cart</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-2 text-sm transition hover:opacity-50"
                  title="Logout"
                >
                  <FiLogOut size={24} />
                  <span className="hidden md:block">Logout</span>
                </button>
              </div>
            )}

            <button
              onClick={toggleNav}
              className="z-50 flex cursor-pointer items-center gap-2 text-sm transition hover:opacity-70 md:hidden"
              type="button"
            >
              {isNavActive ? (
                <GrClose size={25} />
              ) : (
                <BiMenuAltLeft size={28} />
              )}
            </button>
          </div>
        </Container>

        <Container className="hidden items-center justify-between border-y border-gray-300 py-6 md:flex">
          <div className="flex items-center gap-8 text-sm font-medium sm:gap-12 sm:text-md">
            {navLinks.map((link) => (
              <Link className="hover:underline" key={link.id} href={link.href}>
                {link.title}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            className="cursor-pointer rounded-lg bg-black px-9 py-3 text-sm font-normal text-white"
          >
            Contact Us!
          </Link>
        </Container>

        <MobileDrawer
          isOpen={isNavActive}
          onClose={handleClose}
          navLinks={navLinks}
          onLogout={handleLogout}
          isAuthenticated={!!user}
        />
      </div>
    </nav>
  );
};
