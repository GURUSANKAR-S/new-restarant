"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-orange-500/95 via-red-500/90 to-orange-600/95 backdrop-blur-3xl shadow-2xl border-b border-orange-200/30">
      <div className="container flex h-20 max-w-screen-2xl items-center">
        <Link href="/" className="mr-8 flex items-center space-x-3">
          <span className="text-3xl font-black bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent drop-shadow-2xl">
            Graze & Grain
          </span>
        </Link>
        <nav className="ml-auto flex items-center space-x-2 lg:space-x-8">
          {[
            { href: "/", label: "Home" },
            { href: "/menu", label: "Menu" },
            { href: "/about", label: "About" },
            { href: "/cart", label: "Cart" },
            { href: "/reservations", label: "Reserve" },
            { href: "/admin/login", label: "Admin" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative px-6 py-4 text-lg font-bold text-white/90 hover:text-white transition-all rounded-3xl bg-white/10 backdrop-blur-xl hover:bg-white/30 hover:shadow-xl hover:scale-105 border border-white/20 hover:border-white/40"
            >
              <span>{item.label}</span>
              <span className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity blur-xl -inset-1 animate-pulse-glow" />
            </Link>
          ))}
          {itemCount > 0 && (
            <div className="ml-4 relative">
              <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-2xl bg-red-500 text-xs font-black text-white shadow-2xl border-4 border-white/50 animate-bounce">
                {itemCount}
              </span>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
