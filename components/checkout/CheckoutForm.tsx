// components/checkout/CheckoutForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Home, Lock, Loader2 } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

type DeliveryMethod = "door" | "locker";

export function CheckoutForm() {
  const router = useRouter();
  const { items, getTotal, closeCart, clearCart } = useCartStore();

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("door");
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappConfirm, setWhatsappConfirm] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    closeCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subtotal = getTotal();
  const deliveryFee = 100;
  const total = subtotal + deliveryFee;

  const whatsappValid = /^\d{9}$/.test(whatsapp) && whatsapp === whatsappConfirm;
  const canSubmit =
    whatsappValid &&
    name.trim().length > 0 &&
    (deliveryMethod === "door" ? address.trim().length > 0 : true) &&
    items.length > 0;

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp,
          deliveryMethod,
          address: deliveryMethod === "door" ? address.trim() : null,
          items,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      // ✅ Clear cart — order confirmed
      clearCart();

      // Redirect to thank-you page
      router.push(`/thank-you/${data.orderId}`);
    } catch (err) {
      console.error("Checkout error:", err);
      setErrorMsg("Network error. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Contact Details */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-widest uppercase text-[#d4af37]">
          Your Details
        </h2>

        <input
          type="text"
          autoComplete="off"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
        />

        <div className="space-y-3">
          <div className="flex items-stretch rounded-xl border border-white/10 bg-white/5 focus-within:border-[#d4af37] transition-colors overflow-hidden">
            <span className="px-4 flex items-center text-gray-400 border-r border-white/10 font-medium select-none">
              +27
            </span>
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="off"
              placeholder="831234567"
              maxLength={9}
              value={whatsapp}
              onChange={(e) =>
                setWhatsapp(e.target.value.replace(/\D/g, "").slice(0, 9))
              }
              className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none"
            />
          </div>

          <div className="flex items-stretch rounded-xl border border-white/10 bg-white/5 focus-within:border-[#d4af37] transition-colors overflow-hidden">
            <span className="px-4 flex items-center text-gray-400 border-r border-white/10 font-medium select-none">
              +27
            </span>
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="off"
              placeholder="Confirm your 9-digit number"
              maxLength={9}
              value={whatsappConfirm}
              onChange={(e) =>
                setWhatsappConfirm(
                  e.target.value.replace(/\D/g, "").slice(0, 9)
                )
              }
              className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none"
            />
          </div>

          {whatsappConfirm && !whatsappValid && (
            <p className="text-xs text-red-400">
              {whatsapp.length !== 9
                ? "Enter your 9-digit SA mobile number (e.g., 831234567)."
                : "Numbers do not match."}
            </p>
          )}
        </div>
      </section>

      {/* Delivery Method */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-widest uppercase text-[#d4af37]">
          Delivery Method
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setDeliveryMethod("door")}
            className={`p-4 rounded-xl border transition-all text-left ${
              deliveryMethod === "door"
                ? "border-[#ec4899] bg-[#ec4899]/10"
                : "border-white/10 bg-white/5 hover:border-white/30"
            }`}
          >
            <Home className="w-5 h-5 text-[#ec4899] mb-2" />
            <p className="text-sm font-semibold">Door Delivery</p>
            <p className="text-xs text-gray-400 mt-1">To your address</p>
            <p className="text-xs text-[#d4af37] font-bold mt-2">R100</p>
          </button>

          <button
            onClick={() => setDeliveryMethod("locker")}
            className={`p-4 rounded-xl border transition-all text-left ${
              deliveryMethod === "locker"
                ? "border-[#ec4899] bg-[#ec4899]/10"
                : "border-white/10 bg-white/5 hover:border-white/30"
            }`}
          >
            <Lock className="w-5 h-5 text-[#ec4899] mb-2" />
            <p className="text-sm font-semibold">Locker Collection</p>
            <p className="text-xs text-gray-400 mt-1">Pick up at a locker</p>
            <p className="text-xs text-[#d4af37] font-bold mt-2">R100</p>
          </button>
        </div>
      </section>

      {/* Address (Door Delivery Only) */}
      {deliveryMethod === "door" && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-widest uppercase text-[#d4af37]">
            Delivery Address
          </h2>

          <textarea
            rows={3}
            placeholder="Enter your full address (e.g., 123 Main Street, Sandton, Johannesburg, 2196)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] resize-none"
          />

          <p className="text-xs text-gray-500">
            Please include street name, suburb, city, and postal code. The more
            details you provide, the faster we can deliver.
          </p>
        </section>
      )}

      {/* Locker Note */}
      {deliveryMethod === "locker" && (
        <section>
          <div className="p-4 bg-[#ec4899]/10 border border-[#ec4899]/30 rounded-xl">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-[#ec4899] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">
                  Locker Collection
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  We will send you the 3 closest Courier Guy lockers to your
                  area via WhatsApp after your order is confirmed. You simply
                  select the one that suits you best.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Order Summary */}
      <section className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3">
        <h2 className="text-lg font-semibold tracking-widest uppercase text-[#d4af37]">
          Order Summary
        </h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>
              Subtotal ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Delivery (2-3 business days)</span>
            <span>{formatPrice(deliveryFee)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-[#d4af37] pt-2 border-t border-white/10">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </section>

      {errorMsg && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <p className="text-sm text-red-400">{errorMsg}</p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!canSubmit || submitting}
        className="w-full py-4 bg-[#d4af37] text-black font-bold tracking-widest rounded-xl hover:bg-[#ec4899] hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> PROCESSING...
          </>
        ) : (
          "CONFIRM ORDER"
        )}
      </button>
    </div>
  );
}