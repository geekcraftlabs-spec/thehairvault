// components/navigation/AdminShortcut.tsx
"use client";

import Link from "next/link";
import { Crown } from "lucide-react";
import { motion } from "framer-motion";

export function AdminShortcut() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="fixed top-4 right-4 z-40"
    >
      <Link
        href="/admin"
        aria-label="Admin"
        className="group flex items-center justify-center w-9 h-9 rounded-full border border-white/5 bg-black/20 backdrop-blur-sm opacity-20 hover:opacity-100 hover:border-[#d4af37]/50 transition-all duration-300"
      >
        <Crown className="w-4 h-4 text-gray-500 group-hover:text-[#d4af37] transition-colors" />
      </Link>
    </motion.div>
  );
}