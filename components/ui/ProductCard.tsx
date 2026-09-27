// components/ui/ProductCard.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WigProduct, WigSizeRange } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";

const getColorHex = (code: string) => {
  switch (code) {
    case 'black': return '#1a1a1a';
    case 'burgundy': return '#4a0e1c';
    case 'ginger': return '#b86b3d';
    case 'blonde': return '#f5e6c8';
    case 'highlight': return '#c9a26a';
    case 'darkbrown': return '#3b2011';
    case 'grey': return '#888888';
    case 'red': return '#a31c1c';
    default: return '#555555';
  }
};

interface ProductCardProps {
  product: WigProduct;
  range: WigSizeRange;
}

export function ProductCard({ product, range }: ProductCardProps) {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const selectedSize = range.sizes[selectedSizeIndex];
  const selectedColor = range.colors[selectedColorIndex];
  const currentPrice = selectedColor.prices[selectedSize];

  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      productId: `${product.id}-${range.label}`,
      productName: product.name,
      rangeLabel: range.label,
      size: selectedSize,
      color: selectedColor.name,
      price: currentPrice,
      image: selectedColor.image,
      quantity: 1,
    });
    openCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative bg-[#111] border border-white/5 rounded-2xl overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-900">
        <motion.img
          key={selectedColor.image}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          src={selectedColor.image}
          alt={`${product.name} ${range.label} - ${selectedColor.name}`}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] tracking-widest text-[#d4af37]">
          {range.label}
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-1">
          {range.sizes.map((size, idx) => (
            <button
              key={size}
              onClick={() => setSelectedSizeIndex(idx)}
              className={`w-8 h-8 text-xs rounded-full flex items-center justify-center transition-all ${
                selectedSizeIndex === idx
                  ? "bg-[#ec4899] text-white font-bold"
                  : "bg-black/50 backdrop-blur-md text-white border border-white/20"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold tracking-wide">{product.name}</h3>
        <p className="text-xs text-gray-500 mt-1 flex-1">{product.description}</p>

        <div className="flex gap-2 mt-4 mb-5 flex-wrap">
          {range.colors.map((color, idx) => (
            <button
              key={color.code}
              onClick={() => setSelectedColorIndex(idx)}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                selectedColorIndex === idx
                  ? "border-[#ec4899] scale-110"
                  : "border-transparent hover:border-white/50"
              }`}
              style={{ backgroundColor: getColorHex(color.code) }}
              title={color.name}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-[#d4af37]">{formatPrice(currentPrice)}</span>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-white/10 hover:bg-[#ec4899] hover:text-white transition-all rounded-full text-xs font-bold tracking-widest uppercase"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}