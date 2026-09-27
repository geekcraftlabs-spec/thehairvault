// components/shop/ShopContent.tsx
"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { wigProducts } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import {
  FilterBar,
  CategoryFilter,
  PriceFilter,
  SortOption,
} from "./FilterBar";
import { WigProduct, WigSizeRange } from "@/types";

function getRangeMinPrice(range: WigSizeRange): number {
  return Math.min(...range.colors.flatMap((c) => Object.values(c.prices)));
}

function matchesPrice(minPrice: number, filter: PriceFilter): boolean {
  switch (filter) {
    case "under-1000": return minPrice < 1000;
    case "1000-2000": return minPrice >= 1000 && minPrice < 2000;
    case "2000-3000": return minPrice >= 2000 && minPrice < 3000;
    case "over-3000": return minPrice >= 3000;
    default: return true;
  }
}

export function ShopContent() {
  const searchParams = useSearchParams();
  const urlFilter = searchParams.get("filter");

  // User-driven category override. If null, we fall back to the URL param.
  const [categoryOverride, setCategoryOverride] = useState<CategoryFilter | null>(null);
  const [price, setPrice] = useState<PriceFilter>("all");
  const [sort, setSort] = useState<SortOption>("default");

  // Derive the effective category: user override wins, otherwise URL param.
  const category: CategoryFilter =
    categoryOverride ?? (urlFilter === "featured" ? "featured" : "all");

  const results = useMemo(() => {
    const allCards = wigProducts.flatMap((product: WigProduct) =>
      product.ranges.map((range) => ({
        product,
        range,
        minPrice: getRangeMinPrice(range),
      }))
    );

    const filtered = allCards.filter(({ product, minPrice }) => {
      if (category === "featured" && !product.featured) return false;
      if (
        category !== "all" &&
        category !== "featured" &&
        product.category !== category
      )
        return false;
      if (!matchesPrice(minPrice, price)) return false;
      return true;
    });

    if (sort === "price-asc") filtered.sort((a, b) => a.minPrice - b.minPrice);
    if (sort === "price-desc") filtered.sort((a, b) => b.minPrice - a.minPrice);

    return filtered;
  }, [category, price, sort]);

  const handleCategoryChange = (value: CategoryFilter) => {
    setCategoryOverride(value);
  };

  const handleClearFilters = () => {
    setCategoryOverride("all");
    setPrice("all");
    setSort("default");
  };

  return (
    <>
      <FilterBar
        category={category}
        price={price}
        sort={sort}
        onCategoryChange={handleCategoryChange}
        onPriceChange={setPrice}
        onSortChange={setSort}
        resultCount={results.length}
      />

      {results.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg mb-2">No wigs match those filters.</p>
          <button
            onClick={handleClearFilters}
            className="text-[#ec4899] text-sm tracking-widest uppercase hover:text-[#d4af37]"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map(({ product, range }) => (
            <ProductCard
              key={`${product.id}-${range.label}`}
              product={product}
              range={range}
            />
          ))}
        </div>
      )}
    </>
  );
}