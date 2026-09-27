// app/api/admin/orders/route.ts
import { NextResponse } from "next/server";
import { getAllOrders, getOrderStats } from "@/lib/orders";

export async function GET() {
  const orders = getAllOrders();
  const stats = getOrderStats();
  return NextResponse.json({ orders, stats });
}