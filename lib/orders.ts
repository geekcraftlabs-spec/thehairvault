// lib/orders.ts
import { CartItem } from "@/types";

export type OrderStatus =
  | "pending"
  | "payment_sent"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  name: string;
  whatsapp: string;
  deliveryMethod: "door" | "locker";
  address: string | null;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  payshapReference: string;
  createdAt: string;
  waybill: string | null;
}

// ⚠️ TEMPORARY in-memory store. Wipes on server restart.
const orders = new Map<string, Order>();

function generateOrderId(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `CV-${yy}${mm}${dd}-${random}`;
}

function generatePayshapReference(name: string): string {
  const firstName = name.trim().split(/\s+/)[0] || "CV";
  const clean = firstName.replace(/[^a-zA-Z]/g, "").slice(0, 10) || "CV";
  const capitalized =
    clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
  const digits = Math.floor(100 + Math.random() * 900);
  return `${capitalized}${digits}`;
}

export function toWaNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function createOrder(data: {
  name: string;
  whatsapp: string;
  deliveryMethod: "door" | "locker";
  address: string | null;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}): Order {
  const order: Order = {
    id: generateOrderId(),
    name: data.name,
    whatsapp: data.whatsapp,
    deliveryMethod: data.deliveryMethod,
    address: data.address,
    items: data.items,
    subtotal: data.subtotal,
    deliveryFee: data.deliveryFee,
    total: data.total,
    status: "pending",
    payshapReference: generatePayshapReference(data.name),
    createdAt: new Date().toISOString(),
    waybill: null,
  };

  orders.set(order.id, order);
  return order;
}

export function getOrder(id: string): Order | undefined {
  return orders.get(id);
}

export function getAllOrders(): Order[] {
  return Array.from(orders.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getOrdersByStatus(status: OrderStatus): Order[] {
  return getAllOrders().filter((o) => o.status === status);
}

export function updateOrderStatus(
  id: string,
  status: OrderStatus
): Order | undefined {
  const order = orders.get(id);
  if (!order) return undefined;
  order.status = status;
  orders.set(id, order);
  return order;
}

export function updateOrderWaybill(
  id: string,
  waybill: string
): Order | undefined {
  const order = orders.get(id);
  if (!order) return undefined;
  order.waybill = waybill;
  orders.set(id, order);
  return order;
}

/* ---------- Stats ---------- */

export interface OrderStats {
  total: number;
  pending: number;
  paymentSent: number;
  paid: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  revenue: number;
  thisMonthRevenue: number;
}

export function getOrderStats(): OrderStats {
  const all = getAllOrders();
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const paidStatuses: OrderStatus[] = ["paid", "shipped", "delivered"];

  return {
    total: all.length,
    pending: all.filter((o) => o.status === "pending").length,
    paymentSent: all.filter((o) => o.status === "payment_sent").length,
    paid: all.filter((o) => o.status === "paid").length,
    shipped: all.filter((o) => o.status === "shipped").length,
    delivered: all.filter((o) => o.status === "delivered").length,
    cancelled: all.filter((o) => o.status === "cancelled").length,
    revenue: all
      .filter((o) => paidStatuses.includes(o.status))
      .reduce((sum, o) => sum + o.total, 0),
    thisMonthRevenue: all
      .filter((o) => {
        const d = new Date(o.createdAt);
        return (
          paidStatuses.includes(o.status) &&
          d.getMonth() === currentMonth &&
          d.getFullYear() === currentYear
        );
      })
      .reduce((sum, o) => sum + o.total, 0),
  };
}