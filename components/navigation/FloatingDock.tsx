// components/navigation/FloatingDock.tsx
"use client";

import { motion } from "framer-motion";
import { Home, Store, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";

const dockItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Store, label: "Shop", href: "/shop" },
  { icon: ShoppingBag, label: "Cart", href: "#", action: "cart" },
];

export function FloatingDock() {
  const { openCart, items } = useCartStore();
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="flex items-end gap-4 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl"
    >
      {dockItems.map((item, index) => (
        <motion.a
          key={index}
          href={item.action === "cart" ? "#" : item.href}
          onClick={(e) => {
            if (item.action === "cart") {
              e.preventDefault();
              openCart();
            }
          }}
          className="relative group flex flex-col items-center justify-center"
          whileHover={{ scale: 1.15, y: -5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <item.icon className="w-6 h-6 text-gray-400 group-hover:text-[#d4af37] transition-colors" />

          <span className="absolute -top-10 px-2 py-1 bg-black/80 text-[10px] uppercase tracking-widest text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {item.label}
          </span>

          {item.label === "Cart" && cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#ec4899] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </motion.a>
      ))}
    </motion.div>
  );
}