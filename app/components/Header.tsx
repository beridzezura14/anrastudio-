"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/", label: "მთავარი" },
  { href: "/pages/about", label: "ჩვენბს შესახებ" },
  { href: "/pages/services", label: "სერვისები" },
  { href: "/pages/portfolio", label: "პორტფოლიო" },
  { href: "/pages/prices", label: "ფასები" },
  // { href: "/pages/contact", label: "კონტაქტი" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // 🧠 close on route change (IMPORTANT UX FIX)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // 🧠 close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-sky-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          scroll={true}
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent"
        >
          ANRA Studio
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
                <Link
                key={link.href}
                href={link.href}
                className={`group text-sm relative transition ${
                    isActive
                    ? "text-sky-600 font-semibold"
                    : "text-sky-700 hover:text-indigo-500"
                }`}
                >
                {link.label}

                {/* underline */}
                <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-300
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                />
                </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <Link
          href="/pages/contact"
          className="hidden lg:inline-flex px-5 py-2 text-sm rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:opacity-90 transition"
        >
          დაგვიკავშირდი
        </Link>

        {/* BURGER BUTTON */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="lg:hidden w-10 h-10 relative flex items-center justify-center"
        >
          <span
            className={`absolute h-[2px] w-6 bg-sky-600 transition-all duration-300 ${
              open ? "rotate-45 translate-y-0" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-[2px] w-6 bg-indigo-500 transition-all duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-[2px] w-6 bg-sky-600 transition-all duration-300 ${
              open ? "-rotate-45 translate-y-0" : "translate-y-2"
            }`}
          />
        </button>
      </div>

      {/* OVERLAY (NEW - FIXES CLICK UX) */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/10 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        className={`lg:hidden fixed left-0 top-16 w-full transition-all duration-300 ease-out ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="mx-4 mt-2 rounded-2xl border border-sky-100 bg-white/90 backdrop-blur-xl shadow-xl overflow-hidden">
          <div className="flex flex-col py-3">
            {links.map((link, index) => (
            <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-5 py-4 text-sky-700 hover:text-indigo-600 transition"
            >
                <span
                className={`block transition-all duration-300 ease-out
                    ${
                    open
                        ? "opacity-100 translate-y-0 blur-0"
                        : "opacity-0 translate-y-4 blur-sm"
                    }`}
                style={{
                    transitionDelay: open ? `${index * 90}ms` : "0ms",
                }}
                >
                {link.label}
                </span>
            </Link>
            ))}

            {/* CTA */}
            <div className="px-5 pt-3 pb-4">
              <Link
                href="/pages/contact"
                onClick={() => setOpen(false)}
                className="block text-center px-4 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-medium shadow-md hover:opacity-90 transition"
              >
                დაგვიკავშირდი
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}