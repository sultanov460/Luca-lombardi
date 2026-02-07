"use client";

import { Container } from "@/components/Container";
import Link from "next/link";
import { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";
import { LuUser } from "react-icons/lu";
import { GrClose } from "react-icons/gr";
import { FiLogOut, FiShoppingCart } from "react-icons/fi";
import { Menu } from "./Menu";

import { useAppSelector } from "@/store/hooks";
import { firebaseAuth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const router = useRouter();

  const { user, loading } = useAppSelector((s) => s.auth);

  const navLinks = [
    { id: 1, title: "Women", href: "/women-collection" },
    { id: 2, title: "Men", href: "/men-collection" },
    { id: 3, title: "New Collection", href: "/new-collection" },
    { id: 4, title: "Sunglasses", href: "/sunglasses" },
  ];

  function toggleNav() {
    setIsNavActive(!isNavActive);
  }

  async function handleLogout() {
    await firebaseAuth.signOut(); // Firebase сам скажет listener-у → Redux станет user=null
    router.push("/login");
  }

  return (
    <nav className="sticky z-30 w-full top-0 bg-white text-gray-600 shadow-sm">
      <div>
        <Container className="flex justify-between items-center p-5">
          <Link href={"/"} className="text-xl font-bold tracking-wide">
            LUCA LOMBARDI
          </Link>

          <div className="flex gap-6 md:gap-12 items-center">
            <button
              type="button"
              className="flex items-center gap-2 text-sm hover:opacity-50 transition cursor-pointer"
            >
              <IoMdSearch size={26} />
              <span className="hidden md:block">Search</span>
            </button>

            {!loading && !user && (
              <Link
                href={"/login"}
                className="flex items-center gap-2 text-sm hover:opacity-50 transition cursor-pointer"
              >
                <LuUser size={25} />
                <span className="hidden md:block">Login</span>
              </Link>
            )}

            {!loading && user && (
              <div className="flex items-center gap-6">
                <Link
                  href={"/cart"}
                  className="flex items-center gap-2 text-sm hover:opacity-50 transition cursor-pointer"
                  title="Cart"
                >
                  <FiShoppingCart size={24} />
                  <span className="hidden md:block">Cart</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm hover:opacity-50 transition cursor-pointer"
                  title="Logout"
                >
                  <FiLogOut size={24} />
                  <span className="hidden md:block">Logout</span>
                </button>
              </div>
            )}

            <button
              onClick={toggleNav}
              className="z-50 flex items-center gap-2 text-sm hover:opacity-70 transition cursor-pointer md:hidden"
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

        <Container className="border-y border-gray-300 py-6 hidden md:flex justify-between items-center">
          <div className="flex items-center gap-8 text-sm sm:text-md sm:gap-12 font-medium">
            {navLinks.map((link) => (
              <Link className="hover:underline" key={link.id} href={link.href}>
                {link.title}
              </Link>
            ))}
          </div>

          <Link
            href={"/contact"}
            className="bg-black px-9 py-3 rounded-lg cursor-pointer text-white text-sm font-normal "
          >
            Contact Us!
          </Link>
        </Container>

        <Menu isNavActive={isNavActive} navLinks={navLinks} />
      </div>
    </nav>
  );
};
