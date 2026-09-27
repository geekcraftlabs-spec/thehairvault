// app/admin/dashboard/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  LogOut,
  RefreshCw,
  Loader2,
  MessageCircle,
  CheckCircle2,
  Truck,
  Clock,
  X,
  Home,
  Lock,
  Package,
  Ban,
  ExternalLink,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Order, OrderStatus, OrderStats } from "@/lib/orders";

type Tab =
  | "all"
  | "pending"
  | "payment_sent"
  | "paid"
  | "shipped"
  | "cancelled";

const TABS: { key: Tab; label: string }[] = [
  { key: "pending", label: "Pending" },
  { key: "payment_sent", label: "Awaiting Proof" },
  { key: "paid", label: "Paid" },
  { key: "shipped", label: "Shipped" },
  { key: "cancelled", label: "Cancelled" },
  { key: "all", label: "All" },
];

const emptyStats: OrderStats = {
  total: 0,
  pending: 0,
  paymentSent: 0,
  paid: 0,
  shipped: 0,
  delivered: 0,
  cancelled: 0,
  revenue: 0,
  thisMonthRevenue: 0,
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats>(emptyStats);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("pending");
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setOrders(data.orders);
      setStats(data.stats);
    } catch (err) {
      console.error("Fetch orders error:", err);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders().finally(() => setLoading(false));
    const interval = setInterval(fetchOrders, 15000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const filteredOrders = orders.filter((o) => {
    if (activeTab === "all") return true;
    if (activeTab === "shipped")
      return o.status === "shipped" || o.status === "delivered";
    return o.status === activeTab;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto">
      <header className="flex flex-wrap gap-4 justify-between items-center mb-8 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Crown className="w-6 h-6 text-[#d4af37]" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-[#d4af37]">HAIR</span>{" "}
              <span className="text-[#ec4899]">VAULT</span> Admin
            </h1>
            <p className="text-xs text-gray-500 tracking-widest uppercase">
              Order Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-xs tracking-widest uppercase text-gray-400 hover:border-[#d4af37] hover:text-[#d4af37] transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-xs tracking-widest uppercase text-gray-400 hover:border-[#ec4899] hover:text-[#ec4899] transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Pending" value={stats.pending} accent="yellow" icon={Clock} />
        <StatCard
          label="Awaiting Proof"
          value={stats.paymentSent}
          accent="blue"
          icon={MessageCircle}
        />
        <StatCard label="Paid" value={stats.paid} accent="gold" icon={CheckCircle2} />
        <StatCard
          label="This Month"
          value={formatPrice(stats.thisMonthRevenue)}
          accent="pink"
          icon={Crown}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((tab) => {
          const count = orders.filter((o) => {
            if (tab.key === "all") return true;
            if (tab.key === "shipped")
              return o.status === "shipped" || o.status === "delivered";
            return o.status === tab.key;
          }).length;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all border ${
                activeTab === tab.key
                  ? "bg-[#d4af37] text-black border-[#d4af37]"
                  : "bg-white/5 text-gray-300 border-white/10 hover:border-[#d4af37]/50"
              }`}
            >
              {tab.label}
              {count > 0 && (
                <span
                  className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${
                    activeTab === tab.key ? "bg-black/20" : "bg-white/10"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-4 text-gray-700" />
          <p>No orders in this view.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} onUpdate={fetchOrders} />
            ))}
          </AnimatePresence>
        </div>
      )}

      <p className="text-[10px] text-gray-600 tracking-[0.3em] uppercase text-center pt-12">
        Premium Hair · Timeless Beauty · Unapologetic You
      </p>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  accent: "yellow" | "blue" | "gold" | "pink";
  icon: React.ElementType;
}) {
  const colors = {
    yellow: "text-yellow-400",
    blue: "text-blue-400",
    gold: "text-[#d4af37]",
    pink: "text-[#ec4899]",
  };

  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest">
          {label}
        </p>
        <Icon className={`w-4 h-4 ${colors[accent]}`} />
      </div>
      <p className={`text-2xl font-bold ${colors[accent]}`}>{value}</p>
    </div>
  );
}

function OrderCard({
  order,
  onUpdate,
}: {
  order: Order;
  onUpdate: () => Promise<void> | void;
}) {
  const [busy, setBusy] = useState(false);
  const [waybill, setWaybill] = useState(order.waybill || "");

  const whatsappNumber = order.whatsapp.replace(/\D/g, "");

  const patchOrder = async (body: {
    status?: OrderStatus;
    waybill?: string;
  }) => {
    setBusy(true);
    try {
      await fetch(`/api/admin/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await onUpdate();
    } finally {
      setBusy(false);
    }
  };

  const handleSendPayment = () => {
    const paymentUrl = `${window.location.origin}/pay/${order.id}`;
    const message = `Hi ${order.name.split(" ")[0]}! Thank you for shopping with The Hair Vault 🖤

Your order *${order.id}* total is *${formatPrice(order.total)}*.

To complete your payment, please click this link to easily copy your Payshap details:
${paymentUrl}

Once paid, kindly send us a screenshot of your proof of payment here on WhatsApp.

Order processing time: same-day · Delivery: 2-3 business days nationwide.`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    patchOrder({ status: "payment_sent" });
  };

  const handleOpenChat = () => {
    const url = `https://wa.me/${whatsappNumber}`;
    window.open(url, "_blank");
  };

  const handleSendTracking = () => {
    if (!waybill.trim()) return;
    const message = `Hi ${order.name.split(" ")[0]}! Great news 🎉

Your order *${order.id}* has been shipped!

Track your parcel here:
${waybill}

Delivery is expected within 2-3 business days. We can't wait for you to receive your crown! 👑`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    patchOrder({ status: "shipped", waybill: waybill.trim() });
  };

  const handleMarkDelivered = () => {
    patchOrder({ status: "delivered" });
  };

  const handleCancel = () => {
    if (!confirm("Cancel this order? This cannot be undone.")) return;
    patchOrder({ status: "cancelled" });
  };

  const statusBadge = () => {
    const map: Record<OrderStatus, { label: string; color: string }> = {
      pending: { label: "Pending", color: "bg-yellow-500/20 text-yellow-400" },
      payment_sent: {
        label: "Awaiting Proof",
        color: "bg-blue-500/20 text-blue-400",
      },
      paid: { label: "Paid", color: "bg-[#d4af37]/20 text-[#d4af37]" },
      shipped: { label: "Shipped", color: "bg-[#ec4899]/20 text-[#ec4899]" },
      delivered: {
        label: "Delivered",
        color: "bg-green-500/20 text-green-400",
      },
      cancelled: { label: "Cancelled", color: "bg-red-500/20 text-red-400" },
    };
    const s = map[order.status];
    return (
      <span
        className={`text-[10px] px-2 py-1 rounded-full uppercase tracking-widest font-semibold ${s.color}`}
      >
        {s.label}
      </span>
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4"
    >
      <div className="flex flex-wrap justify-between items-start gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <p className="font-mono text-sm text-[#d4af37]">{order.id}</p>
            {statusBadge()}
          </div>
          <p className="text-xs text-gray-500">
            {new Date(order.createdAt).toLocaleString("en-ZA")}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-[#d4af37]">
            {formatPrice(order.total)}
          </p>
          <p className="text-xs text-gray-500">
            {order.items.length} {order.items.length === 1 ? "item" : "items"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
            Customer
          </p>
          <p>{order.name}</p>
          <p className="text-gray-400 font-mono text-xs">{order.whatsapp}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-1">
            {order.deliveryMethod === "door" ? (
              <Home className="w-3 h-3" />
            ) : (
              <Lock className="w-3 h-3" />
            )}
            {order.deliveryMethod === "door"
              ? "Door Delivery"
              : "Locker Collection"}
          </p>
          <p className="text-gray-300 text-xs">
            {order.address || "Lockers sent via WhatsApp"}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10 space-y-1">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-xs text-gray-400">
            <span className="truncate">
              {item.productName} · {item.rangeLabel} · Size {item.size} ·{" "}
              {item.color} × {item.quantity}
            </span>
            <span className="flex-shrink-0">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {(order.status === "paid" ||
        order.status === "shipped" ||
        order.status === "delivered") && (
        <div className="pt-3 border-t border-white/10 space-y-2">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">
            Courier Guy Tracking
          </p>
          {order.status === "paid" ? (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Paste waybill / tracking link"
                value={waybill}
                onChange={(e) => setWaybill(e.target.value)}
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
              />
              <button
                onClick={handleSendTracking}
                disabled={!waybill.trim() || busy}
                className="px-4 py-2 bg-[#d4af37] text-black rounded-lg text-xs font-bold tracking-widest hover:bg-[#ec4899] hover:text-white transition-colors disabled:opacity-40"
              >
                Send Tracking
              </button>
            </div>
          ) : (
            order.waybill && (
              <p className="text-xs text-gray-300 font-mono break-all">
                {order.waybill}
              </p>
            )
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
        {order.status === "pending" && (
          <>
            <ActionBtn
              onClick={handleSendPayment}
              disabled={busy}
              icon={MessageCircle}
              label="Send Payment Details"
              primary
            />
            <ActionBtn
              onClick={handleCancel}
              disabled={busy}
              icon={Ban}
              label="Cancel"
              danger
            />
          </>
        )}

        {order.status === "payment_sent" && (
          <>
            <ActionBtn
              onClick={handleOpenChat}
              disabled={busy}
              icon={ExternalLink}
              label="Open WhatsApp Chat"
              primary
            />
            <ActionBtn
              onClick={() => patchOrder({ status: "paid" })}
              disabled={busy}
              icon={CheckCircle2}
              label="Mark as Paid"
            />
            <ActionBtn
              onClick={handleCancel}
              disabled={busy}
              icon={Ban}
              label="Cancel"
              danger
            />
          </>
        )}

        {order.status === "paid" && (
          <>
            <ActionBtn
              onClick={handleOpenChat}
              disabled={busy}
              icon={MessageCircle}
              label="Open WhatsApp"
            />
            <ActionBtn
              onClick={handleCancel}
              disabled={busy}
              icon={Ban}
              label="Cancel"
              danger
            />
          </>
        )}

        {order.status === "shipped" && (
          <>
            <ActionBtn
              onClick={handleOpenChat}
              disabled={busy}
              icon={MessageCircle}
              label="Open WhatsApp"
            />
            <ActionBtn
              onClick={handleMarkDelivered}
              disabled={busy}
              icon={Truck}
              label="Mark as Delivered"
            />
          </>
        )}

        {order.status === "delivered" && (
          <span className="text-xs text-green-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Order complete
          </span>
        )}

        {order.status === "cancelled" && (
          <span className="text-xs text-red-400 flex items-center gap-2">
            <X className="w-4 h-4" /> Cancelled
          </span>
        )}
      </div>
    </motion.div>
  );
}

function ActionBtn({
  onClick,
  disabled,
  icon: Icon,
  label,
  primary = false,
  danger = false,
}: {
  onClick: () => void;
  disabled?: boolean;
  icon: React.ElementType;
  label: string;
  primary?: boolean;
  danger?: boolean;
}) {
  const style = primary
    ? "bg-[#d4af37] text-black hover:bg-[#ec4899] hover:text-white"
    : danger
    ? "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20"
    : "bg-white/5 text-gray-300 border border-white/10 hover:border-[#d4af37] hover:text-[#d4af37]";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${style}`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}