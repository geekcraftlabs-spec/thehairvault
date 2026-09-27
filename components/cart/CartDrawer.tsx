// components/cart/CartDrawer.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, getTotal } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0f0f0f] border-l border-white/10 z-[70] flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
                <h2 className="text-xl font-semibold tracking-widest text-[#d4af37]">
                  YOUR CART
                </h2>
                {items.length > 0 && (
                  <span className="text-xs px-2 py-0.5 bg-[#ec4899]/20 text-[#ec4899] rounded-full">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-700 mb-4" />
                  <p className="text-gray-500 mb-2">Your cart is empty.</p>
                  <button
                    onClick={closeCart}
                    className="text-[#ec4899] text-sm tracking-widest uppercase hover:text-[#d4af37] transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={`${item.productId}-${item.size}-${item.color}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5"
                  >
                    <Image
                      src={item.image}
                      alt={item.productName}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">{item.productName}</h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {item.rangeLabel} • Size {item.size} • {item.color}
                      </p>
                      <p className="text-[#d4af37] font-semibold mt-2">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          {item.quantity} × {formatPrice(item.price)}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.size, item.color)}
                      className="text-gray-500 hover:text-[#ec4899] transition-colors h-fit self-start"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Subtotal</span>
                  <span className="text-xl font-bold text-[#d4af37]">
                    {formatPrice(getTotal())}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mb-4">
                  Delivery calculated at checkout (2-3 business days nationwide).
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full py-4 bg-[#d4af37] text-black text-center font-bold tracking-widest rounded-xl hover:bg-[#ec4899] hover:text-white transition-colors"
                >
                  PROCEED TO CHECKOUT
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}