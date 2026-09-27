// app/api/admin/orders/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  getOrder,
  updateOrderStatus,
  updateOrderWaybill,
  OrderStatus,
} from "@/lib/orders";

const VALID_STATUSES: OrderStatus[] = [
  "pending",
  "payment_sent",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await req.json()) as {
    status?: OrderStatus;
    waybill?: string;
  };

  const order = getOrder(id);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (body.status && !VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  let updated = order;
  if (body.status) {
    updated = updateOrderStatus(id, body.status) || updated;
  }
  if (body.waybill !== undefined) {
    updated = updateOrderWaybill(id, body.waybill) || updated;
  }

  return NextResponse.json({ order: updated });
}