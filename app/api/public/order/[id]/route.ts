// app/api/public/order/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getOrder } from "@/lib/orders";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = await getOrder(id.toUpperCase());

  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return NextResponse.json({
    order: {
      id: order.id,
      name: order.name,
      total: order.total,
      payshapReference: order.payshapReference,
      status: order.status,
    },
  });
}