// app/page.tsx
import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, Clock, Music2, Crown } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-28 pb-20 md:pt-32 md:pb-28 md:min-h-screen text-center overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full bg-[#d4af37]/5 blur-[120px]" />
          <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#ec4899]/10 blur-[100px] translate-x-32 translate-y-20" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <Crown className="w-10 h-10 text-[#d4af37] mx-auto mb-6" />

          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#ec4899] mb-4">
            By Miss Independent G
          </p>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 drop-shadow-2xl">
            <span className="text-[#d4af37]">THE</span>{" "}
            <span className="text-[#ec4899]">HAIR</span>{" "}
            <span className="text-[#d4af37]">VAULT</span>
          </h1>

          <p className="text-base md:text-xl text-gray-300 mb-3 font-light tracking-wide px-4 italic">
            Premium Hair. Timeless Beauty. Unapologetic You.
          </p>

          <p className="text-sm md:text-base text-gray-500 mb-10 max-w-xl mx-auto px-4">
            Luxury wigs curated for the queen who knows her worth. Delivered to
            your door in 2-3 days.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4af37] text-black font-bold tracking-widest rounded-full hover:bg-white transition-all transform hover:scale-105"
            >
              SHOP THE COLLECTION <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/shop?filter=featured"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#ec4899] text-[#ec4899] font-bold tracking-widest rounded-full hover:bg-[#ec4899] hover:text-white transition-all transform hover:scale-105"
            >
              <Music2 className="w-5 h-5" /> FEATURED FROM TIKTOK
            </Link>
          </div>
        </div>
      </section>

      {/* Delivery Promise */}
      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="p-4 rounded-full bg-[#d4af37]/10 mb-4">
              <Clock className="w-8 h-8 md:w-10 md:h-10 text-[#d4af37]" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Same-Day Processing</h3>
            <p className="text-gray-400 text-sm max-w-xs">
              All orders are processed and prepared for shipment on the same day.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-4 rounded-full bg-[#ec4899]/10 mb-4">
              <Truck className="w-8 h-8 md:w-10 md:h-10 text-[#ec4899]" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">2-3 Day Delivery</h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Nationwide delivery via The Courier Guy — door or locker.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-4 rounded-full bg-[#d4af37]/10 mb-4">
              <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-[#d4af37]" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Secure Payment</h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Easy Payshap payments directly from your banking app.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center border-t border-white/5">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Great Hair Isn&apos;t Just A Look.
          <br />
          <span className="text-[#ec4899]">It&apos;s A Lifestyle.</span>
        </h2>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          At The Hair Vault, we believe your hair is your crown. It tells your
          story, boosts your confidence, and makes you feel unstoppable.
          That&apos;s why we provide premium quality hair that&apos;s soft,
          durable, and beautiful.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 mt-10 px-6 py-3 text-[#d4af37] font-bold tracking-widest border-b-2 border-[#d4af37] hover:text-[#ec4899] hover:border-[#ec4899] transition-all"
        >
          EXPLORE ALL STYLES <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
}