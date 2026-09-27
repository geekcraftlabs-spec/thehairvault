// lib/orders.ts
import { prisma } from "./db";
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

export async function createOrder(data: {
  name: string;
  whatsapp: string;
  deliveryMethod: "door" | "locker";
  address: string | null;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}): Promise<Order> {
  const order = await prisma.order.create({
    data: {
      id: generateOrderId(),
      name: data.name,
      whatsapp: data.whatsapp,
      deliveryMethod: data.deliveryMethod,
      address: data.address,
      items: data.items as unknown as object,
      subtotal: data.subtotal,
      deliveryFee: data.deliveryFee,
      total: data.total,
      status: "pending",
      payshapReference: generatePayshapReference(data.name),
      waybill: null,
    },
  });
  return mapPrismaOrder(order);
}

export async function getOrder(id: string): Promise<Order | undefined> {
  const order = await prisma.order.findUnique({ where: { id } });
  return order ? mapPrismaOrder(order) : undefined;
}

export async function getAllOrders(): Promise<Order[]> {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });
  return orders.map(mapPrismaOrder);
}

export async function getOrdersByStatus(
  status: OrderStatus
): Promise<Order[]> {
  const orders = await prisma.order.findMany({
    where: { status },
    orderBy: { createdAt: "desc" },
  });
  return orders.map(mapPrismaOrder);
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<Order | undefined> {
  try {
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });
    return mapPrismaOrder(order);
  } catch {
    return undefined;
  }
}

export async function updateOrderWaybill(
  id: string,
  waybill: string
): Promise<Order | undefined> {
  try {
    const order = await prisma.order.update({
      where: { id },
      data: { waybill },
    });
    return mapPrismaOrder(order);
  } catch {
    return undefined;
  }
}

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

export async function getOrderStats(): Promise<OrderStats> {
  const all = await getAllOrders();
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

function mapPrismaOrder(o: {
  id: string;
  name: string;
  whatsapp: string;
  deliveryMethod: string;
  address: string | null;
  items: unknown;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: string;
  payshapReference: string;
  createdAt: Date;
  waybill: string | null;
}): Order {
  return {
    id: o.id,
    name: o.name,
    whatsapp: o.whatsapp,
    deliveryMethod: o.deliveryMethod as "door" | "locker",
    address: o.address,
    items: o.items as CartItem[],
    subtotal: o.subtotal,
    deliveryFee: o.deliveryFee,
    total: o.total,
    status: o.status as OrderStatus,
    payshapReference: o.payshapReference,
    createdAt: o.createdAt.toISOString(),
    waybill: o.waybill,
  };
}