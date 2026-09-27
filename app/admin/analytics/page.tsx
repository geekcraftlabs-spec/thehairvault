// app/admin/analytics/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Crown, TrendingUp, ShoppingBag, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/lib/orders";

export default function AdminAnalyticsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []))
      .finally(() => setLoading(false));
  }, []);

  const paidStatuses = ["paid", "shipped", "delivered"];

  const monthMap = new Map<
    string,
    { label: string; revenue: number; count: number }
  >();
  orders
    .filter((o) => paidStatuses.includes(o.status))
    .forEach((o) => {
      const d = new Date(o.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleString("en-ZA", {
        month: "long",
        year: "numeric",
      });
      const entry = monthMap.get(key) || { label, revenue: 0, count: 0 };
      entry.revenue += o.total;
      entry.count += 1;
      monthMap.set(key, entry);
    });

  const monthOptions = Array.from(monthMap.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, val]) => ({ key, ...val }));

  const filtered =
    selectedMonth === "all"
      ? orders.filter((o) => paidStatuses.includes(o.status))
      : orders.filter((o) => {
          if (!paidStatuses.includes(o.status)) return false;
          const d = new Date(o.createdAt);
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
          return key === selectedMonth;
        });

  const totalRevenue = filtered.reduce((s, o) => s + o.total, 0);
  const orderCount = filtered.length;
  const avgOrder = orderCount > 0 ? totalRevenue / orderCount : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-5xl mx-auto">
      <header className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
        <Crown className="w-6 h-6 text-[#d4af37]" />
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-[#d4af37]">HAIR</span>{" "}
            <span className="text-[#ec4899]">VAULT</span> Analytics
          </h1>
          <p className="text-xs text-gray-500 tracking-widest uppercase">
            Sales Performance
          </p>
        </div>
      </header>

      <div className="mb-6">
        <label className="text-xs text-gray-500 uppercase tracking-widest mr-3">
          Period:
        </label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="bg-white/5 border border-white/10 text-gray-200 text-sm px-4 py-2 rounded-full focus:outline-none focus:border-[#d4af37]"
          suppressHydrationWarning
        >
          <option value="all" className="bg-[#111]">
            All Time
          </option>
          {monthOptions.map((m) => (
            <option key={m.key} value={m.key} className="bg-[#111]">
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              Total Revenue
            </p>
            <TrendingUp className="w-5 h-5 text-[#d4af37]" />
          </div>
          <p className="text-3xl font-bold text-[#d4af37]">
            {formatPrice(totalRevenue)}
          </p>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              Orders
            </p>
            <ShoppingBag className="w-5 h-5 text-[#ec4899]" />
          </div>
          <p className="text-3xl font-bold text-[#ec4899]">{orderCount}</p>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              Avg. Order
            </p>
            <Crown className="w-5 h-5 text-[#d4af37]" />
          </div>
          <p className="text-3xl font-bold text-[#d4af37]">
            {formatPrice(avgOrder)}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold tracking-widest uppercase text-[#d4af37] mb-4">
          Order Breakdown
        </h2>
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">
            No paid orders in this period.
          </p>
        ) : (
          filtered
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((o) => (
              <div
                key={o.id}
                className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl"
              >
                <div>
                  <p className="font-mono text-xs text-[#d4af37]">{o.id}</p>
                  <p className="text-sm text-gray-300">{o.name}</p>
                  <p className="text-[10px] text-gray-500">
                    {new Date(o.createdAt).toLocaleDateString("en-ZA")}
                  </p>
                </div>
                <p className="text-lg font-bold text-[#d4af37]">
                  {formatPrice(o.total)}
                </p>
              </div>
            ))
        )}
      </div>

      <p className="text-[10px] text-gray-600 tracking-[0.3em] uppercase text-center pt-12">
        Premium Hair · Timeless Beauty · Unapologetic You
      </p>
    </div>
  );
}