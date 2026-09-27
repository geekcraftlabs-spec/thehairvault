// app/pay/[orderId]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Crown,
  Copy,
  Check,
  Loader2,
  ShieldCheck,
  Phone,
  Hash,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface PayOrder {
  id: string;
  name: string;
  total: number;
  payshapReference: string;
  status: string;
}

export default function PayPage() {
  const params = useParams<{ orderId: string }>();
  const orderId = (params?.orderId || "").toUpperCase();

  const [order, setOrder] = useState<PayOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;
    fetch(`/api/public/order/${orderId}`)
      .then((r) => r.json().then((d) => ({ ok: r.ok, data: d })))
      .then(({ ok, data }) => {
        if (ok) setOrder(data.order);
        else setError(data.error || "Order not found.");
      })
      .catch(() => setError("Could not load order."))
      .finally(() => setLoading(false));
  }, [orderId]);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // silent fail
    }
  };

  const payshapNumber = process.env.NEXT_PUBLIC_PAYSHAP_NUMBER || "";

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin" />
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-red-400 mb-2">{error || "Order not found."}</p>
        </div>
      </main>
    );
  }

  if (order.status !== "pending" && order.status !== "payment_sent") {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
        <div className="text-center space-y-4 max-w-md">
          <Crown className="w-10 h-10 text-[#d4af37] mx-auto" />
          <h1 className="text-3xl font-bold text-[#d4af37]">
            Payment Received
          </h1>
          <p className="text-gray-400">
            We&apos;ve confirmed your payment. Your order is on its way!
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white px-6 py-16 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#d4af37]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-[#ec4899]/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-xl mx-auto space-y-6"
      >
        <div className="text-center space-y-3">
          <Crown className="w-8 h-8 text-[#d4af37] mx-auto" />
          <p className="text-xs tracking-[0.4em] uppercase text-[#ec4899]">
            Secure Payment
          </p>
          <h1 className="text-3xl font-bold text-[#d4af37]">
            Complete Your Payment
          </h1>
          <p className="text-sm text-gray-400">
            Hi {order.name.split(" ")[0]}, copy the details below into your
            banking app.
          </p>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
          <p className="text-xs text-gray-500 tracking-widest uppercase mb-1">
            Amount Due
          </p>
          <p className="text-4xl font-bold text-[#d4af37]">
            {formatPrice(order.total)}
          </p>
          <p className="text-xs text-gray-500 mt-2 font-mono">
            Order {order.id}
          </p>
        </div>

        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#ec4899]" />
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Payshap Number
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-lg font-mono tracking-wider">{payshapNumber}</p>
            <button
              onClick={() => copyToClipboard(payshapNumber, "phone")}
              className="flex items-center gap-2 px-3 py-2 bg-[#d4af37] text-black rounded-lg text-xs font-bold tracking-widest hover:bg-[#ec4899] hover:text-white transition-colors"
            >
              {copiedField === "phone" ? (
                <>
                  <Check className="w-4 h-4" /> COPIED
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> COPY
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-[#ec4899]" />
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Payment Reference
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-lg font-mono tracking-wider">
              {order.payshapReference}
            </p>
            <button
              onClick={() =>
                copyToClipboard(order.payshapReference, "reference")
              }
              className="flex items-center gap-2 px-3 py-2 bg-[#d4af37] text-black rounded-lg text-xs font-bold tracking-widest hover:bg-[#ec4899] hover:text-white transition-colors"
            >
              {copiedField === "reference" ? (
                <>
                  <Check className="w-4 h-4" /> COPIED
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> COPY
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-5 bg-[#ec4899]/10 border border-[#ec4899]/30 rounded-2xl space-y-3">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#ec4899] flex-shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 space-y-2">
              <p className="font-semibold text-white text-sm">
                How to pay with Payshap:
              </p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Open your banking app</li>
                <li>Tap &quot;Pay&quot; or &quot;Payshap&quot;</li>
                <li>Paste the Payshap number above</li>
                <li>Enter the reference exactly as shown</li>
                <li>Confirm the amount and pay</li>
                <li>
                  Send the proof of payment screenshot to us on WhatsApp
                </li>
              </ol>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-gray-600 tracking-[0.3em] uppercase text-center pt-6">
          Premium Hair · Timeless Beauty · Unapologetic You
        </p>
      </motion.div>
    </main>
  );
}