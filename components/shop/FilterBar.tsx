// components/shop/FilterBar.tsx
"use client";

import { motion } from "framer-motion";

export type CategoryFilter =
  | "all"
  | "9x6-glueless"
  | "straight"
  | "curls"
  | "bobo"
  | "double-drawn"
  | "featured";

export type PriceFilter =
  | "all"
  | "under-1000"
  | "1000-2000"
  | "2000-3000"
  | "over-3000";

export type SortOption = "default" | "price-asc" | "price-desc";

const categories: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "featured", label: "⭐ Featured" },
  { value: "9x6-glueless", label: "9x6 Glueless" },
  { value: "straight", label: "Straight" },
  { value: "curls", label: "Curls" },
  { value: "bobo", label: "Bob" },
  { value: "double-drawn", label: "Double Drawn" },
];

const priceRanges: { value: PriceFilter; label: string }[] = [
  { value: "all", label: "All Prices" },
  { value: "under-1000", label: "Under R1000" },
  { value: "1000-2000", label: "R1000 - R2000" },
  { value: "2000-3000", label: "R2000 - R3000" },
  { value: "over-3000", label: "R3000+" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
];

interface FilterBarProps {
  category: CategoryFilter;
  price: PriceFilter;
  sort: SortOption;
  onCategoryChange: (v: CategoryFilter) => void;
  onPriceChange: (v: PriceFilter) => void;
  onSortChange: (v: SortOption) => void;
  resultCount: number;
}

export function FilterBar({
  category,
  price,
  sort,
  onCategoryChange,
  onPriceChange,
  onSortChange,
  resultCount,
}: FilterBarProps) {
  return (
    <div className="mb-10 space-y-6">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((c) => (
          <motion.button
            key={c.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(c.value)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all border ${
              category === c.value
                ? "bg-[#d4af37] text-black border-[#d4af37]"
                : "bg-white/5 text-gray-300 border-white/10 hover:border-[#d4af37]/50"
            }`}
          >
            {c.label}
          </motion.button>
        ))}
      </div>

      {/* Price + Sort + Result Count */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
        <select
          value={price}
          onChange={(e) => onPriceChange(e.target.value as PriceFilter)}
          className="bg-white/5 border border-white/10 text-gray-200 text-sm px-4 py-2 rounded-full focus:outline-none focus:border-[#ec4899]"
          suppressHydrationWarning
        >
          {priceRanges.map((p) => (
            <option key={p.value} value={p.value} className="bg-[#111]">
              {p.label}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="bg-white/5 border border-white/10 text-gray-200 text-sm px-4 py-2 rounded-full focus:outline-none focus:border-[#ec4899]"
          suppressHydrationWarning
        >
          {sortOptions.map((s) => (
            <option key={s.value} value={s.value} className="bg-[#111]">
              {s.label}
            </option>
          ))}
        </select>

        <span className="text-xs text-gray-500 tracking-widest uppercase">
          {resultCount} {resultCount === 1 ? "result" : "results"}
        </span>
      </div>
    </div>
  );
}