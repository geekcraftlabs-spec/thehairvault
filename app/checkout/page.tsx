// app/checkout/page.tsx
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto pt-24">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#d4af37] mb-3">
          CHECKOUT
        </h1>
        <p className="text-gray-400 tracking-widest uppercase text-sm">
          Complete your order in 2 minutes
        </p>
      </header>

      <CheckoutForm />
    </main>
  );
}