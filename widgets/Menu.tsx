import { NavLink } from "@/types/navbar";
import clsx from "clsx";
import Link from "next/link";

interface MenuProps {
  isNavActive: boolean;
  navLinks: NavLink[];
}

export const Menu = ({ isNavActive, navLinks }: MenuProps) => {
  if (!isNavActive) return null;
  return (
    <div
      className={clsx(
        "fixed top-0 right-0 bottom-0 bg-gray-200 w-full z-10 flex flex-col gap-10 justify-center px-5 rounded-e-3xl text-gray-600 transition-all duration-400",
        isNavActive ? "left-0" : "-left-full"
      )}
    >
      {navLinks.map((link) => (
        <Link className="text-3xl border-b pb-5" key={link.id} href={link.href}>
          {link.title}
        </Link>
      ))}
    </div>
  );
};
