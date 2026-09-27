// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/orders";
import { CartItem } from "@/types";

interface CheckoutBody {
  name: string;
  whatsapp: string;
  deliveryMethod: "door" | "locker";
  address: string | null;
  items: CartItem[];
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CheckoutBody;

    if (!body.name || body.name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!body.whatsapp || !/^\d{9}$/.test(body.whatsapp)) {
      return NextResponse.json(
        { error: "WhatsApp number must be exactly 9 digits." },
        { status: 400 }
      );
    }

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 }
      );
    }

    if (
      body.deliveryMethod === "door" &&
      (!body.address || body.address.trim().length < 5)
    ) {
      return NextResponse.json(
        { error: "Please enter a full delivery address." },
        { status: 400 }
      );
    }

    const whatsapp = `+27${body.whatsapp}`;

    const subtotal = body.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
    const deliveryFee = 100;
    const total = subtotal + deliveryFee;

    const order = await createOrder({
      name: body.name.trim(),
      whatsapp,
      deliveryMethod: body.deliveryMethod,
      address:
        body.deliveryMethod === "door" && body.address
          ? body.address.trim()
          : null,
      items: body.items,
      subtotal,
      deliveryFee,
      total,
    });

    return NextResponse.json({
      orderId: order.id,
      payshapReference: order.payshapReference,
    });
  } catch (err) {
    console.error("[checkout] error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}