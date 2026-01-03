"use client";
import { Container } from "@/components/Container";
import Link from "next/link";
import { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";
import { LuUser } from "react-icons/lu";
import { Menu } from "./Menu";
import { GrClose } from "react-icons/gr";

export const Navbar = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const navLinks = [
    { id: 1, title: "Women", href: "/women-collection" },
    { id: 2, title: "Men", href: "/men-collection" },
    { id: 3, title: "New Arrivals", href: "/new-arrivals" },
    { id: 4, title: "Sale", href: "/sale" },
  ];

  function toggleNav() {
    setIsNavActive(!isNavActive);
  }

  return (
    <nav className="sticky z-30 w-full top-0 bg-white text-gray-600 shadow-sm">
      <div>
        <Container className="flex justify-between items-center p-5">
          <Link href={"/"} className="text-xl font-bold tracking-wide">
            LUCA LOMBARDI
          </Link>
          <div className="flex gap-6 md:gap-12">
            <button className="flex items-center gap-2 text-sm hover:opacity-50 transition cursor-pointer">
              <IoMdSearch size={26} />{" "}
              <span className="hidden md:block">Search</span>
            </button>
            <button className="flex items-center gap-2 text-sm hover:opacity-50 transition cursor-pointer">
              <LuUser size={25} />{" "}
              <span className="hidden md:block">Login</span>
            </button>
            <button
              onClick={toggleNav}
              className="z-50 flex items-center gap-2 text-sm hover:opacity-70 transition cursor-pointer md:hidden"
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
