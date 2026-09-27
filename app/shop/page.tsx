// app/shop/page.tsx
import { Suspense } from "react";
import { ShopContent } from "@/components/shop/ShopContent";

export default function ShopPage() {
  return (
    <main className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto pt-24">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#d4af37] mb-4">
          THE COLLECTION
        </h1>
        <p className="text-gray-400 tracking-widest uppercase text-sm">
          Find Your Perfect Crown
        </p>
      </header>

      <Suspense fallback={<div className="text-center text-gray-500 py-20">Loading...</div>}>
        <ShopContent />
      </Suspense>
    </main>
  );
}