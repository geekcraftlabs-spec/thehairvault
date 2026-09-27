// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingDock } from "@/components/navigation/FloatingDock";
import { BackToTop } from "@/components/navigation/BackToTop";
import { AdminShortcut } from "@/components/navigation/AdminShortcut";
import { CartDrawer } from "@/components/cart/CartDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Hair Vault by Miss Independent G | Premium Hair",
  description:
    "Premium Hair. Timeless Beauty. Unapologetic You. Luxury wigs delivered to your door in 2-3 days.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} pb-32`} suppressHydrationWarning>
        <AdminShortcut />
        {children}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-end gap-3">
          <FloatingDock />
          <BackToTop />
        </div>
        <CartDrawer />
      </body>
    </html>
  );
}