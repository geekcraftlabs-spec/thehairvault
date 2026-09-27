// app/thank-you/[orderId]/page.tsx
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Truck,
  MessageCircle,
  ArrowRight,
  Crown,
} from "lucide-react";
import { getOrder } from "@/lib/orders";
import { formatPrice } from "@/lib/utils";

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await getOrder(orderId);
  const firstName = order?.name.split(" ")[0] ?? "";

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#d4af37]/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-[#ec4899]/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        <div className="flex flex-col items-center gap-4">
          <Crown className="w-10 h-10 text-[#d4af37]" />
          <div className="p-4 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30">
            <CheckCircle2 className="w-12 h-12 text-[#d4af37]" />
          </div>
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#d4af37] mb-3">
            Thank You{firstName ? `, ${firstName}` : ""}!
          </h1>
          <p className="text-gray-300 text-lg">Your order has been received.</p>
        </div>

        {order && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <span className="text-xs text-gray-500 uppercase tracking-widest">
              Order
            </span>
            <span className="text-sm font-mono text-[#d4af37]">{order.id}</span>
          </div>
        )}

        <div className="space-y-4 max-w-xl mx-auto">
          <p className="text-base md:text-lg leading-relaxed text-gray-300">
            We&apos;ll be with you{" "}
            <span className="text-[#d4af37] font-semibold">within the hour</span>{" "}
            on WhatsApp to walk you through the payment process.
          </p>
          <p className="text-sm text-gray-500">
            Keep an eye on your messages — our dedicated order management team
            will reach out shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
            <Clock className="w-6 h-6 text-[#d4af37] mx-auto mb-2" />
            <p className="text-xs text-gray-400 tracking-wider uppercase">
              Same-Day Processing
            </p>
          </div>
          <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
            <Truck className="w-6 h-6 text-[#ec4899] mx-auto mb-2" />
            <p className="text-xs text-gray-400 tracking-wider uppercase">
              2-3 Day Delivery
            </p>
          </div>
          <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
            <MessageCircle className="w-6 h-6 text-[#d4af37] mx-auto mb-2" />
            <p className="text-xs text-gray-400 tracking-wider uppercase">
              Dedicated Support
            </p>
          </div>
        </div>

        {order && (
          <div className="text-left p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3 mt-4">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-[#d4af37]">
              Order Summary
            </h2>
            <div className="space-y-2 text-sm">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between gap-3 text-gray-400"
                >
                  <span className="truncate">
                    {item.productName} · {item.rangeLabel} · Size {item.size} ·{" "}
                    {item.color}
                  </span>
                  <span className="flex-shrink-0 text-gray-300">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-gray-400 pt-3 border-t border-white/10">
                <span>Delivery</span>
                <span>{formatPrice(order.deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-[#d4af37] pt-2 border-t border-white/10">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-gray-500">
                <span className="text-gray-400 font-semibold">
                  {order.deliveryMethod === "door"
                    ? "Door Delivery"
                    : "Locker Collection"}
                  :
                </span>{" "}
                {order.deliveryMethod === "door"
                  ? order.address
                  : "We'll send you the 3 closest lockers via WhatsApp."}
              </p>
            </div>
          </div>
        )}

        <div className="pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#d4af37] text-[#d4af37] font-bold tracking-widest rounded-full hover:bg-[#d4af37] hover:text-black transition-all"
          >
            CONTINUE SHOPPING <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-[10px] text-gray-600 tracking-[0.3em] uppercase pt-10">
          Premium Hair · Timeless Beauty · Unapologetic You
        </p>
      </div>
    </main>
  );
}