"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import Search from "./Search";
import { FiLogOut, FiShoppingCart, FiPackage } from "react-icons/fi";

type NavLink = { id: number; title: string; href: string };

type Props = {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  onLogout: () => void;
  isAuthenticated: boolean;
};

export function MobileDrawer({
  isOpen,
  onClose,
  navLinks,
  onLogout,
  isAuthenticated,
}: Props) {
  // Блокируем скролл фона, пока дровер открыт
  useEffect(() => {
    if (!isOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // Закрытие по Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Drawer (LEFT) */}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-50 h-dvh w-[88%] max-w-sm bg-white/90 backdrop-blur-xl shadow-2xl ring-1 ring-black/5",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-hidden={!isOpen}
      >
        <div className="relative flex h-full flex-col">
          {/* Top */}
          <div className="top-0 z-10 bg-white/70 backdrop-blur-xl px-5 p-4 border-b border-black/5">
            <Search className="!block" onClose={onClose} />
          </div>

          {/* Links */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-2xl px-4 py-4 text-[18px] font-medium text-gray-900 hover:bg-black/5 transition"
                >
                  <span>{link.title}</span>
                  <span className="text-gray-400">→</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Bottom actions */}
          <div className="px-5 pb-6">
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={onClose}
                className={clsx(
                  "rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm font-medium text-gray-900 hover:bg-black/5 transition flex items-center justify-center gap-2",
                  !isAuthenticated && "col-span-2",
                )}
              >
                <FiShoppingCart size={18} />
                Cart
              </Link>

              {isAuthenticated && (
                <>
                  <Link
                    href="/orders"
                    onClick={onClose}
                    className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm font-medium text-gray-900 hover:bg-black/5 transition flex items-center justify-center gap-2"
                  >
                    <FiPackage size={18} />
                    Orders
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onLogout();
                    }}
                    className="col-span-2 rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm font-medium text-gray-900 hover:bg-black/5 transition flex items-center justify-center gap-2"
                  >
                    <FiLogOut size={18} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
