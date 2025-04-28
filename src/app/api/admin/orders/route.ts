import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    const { action, email, orderId, status } = body;

    try {
        if (action === "makeStaff" && email) {
            const user = await prisma.user.update({
                where: { email },
                data: { role: "STAFF" },
            });
            return NextResponse.json({ message: "User promoted to staff", user });
        }

        if (action === "revokeRole" && email) {
            const user = await prisma.user.update({
                where: { email },
                data: { role: "CUSTOMER" }, // or whatever your default role is
            });
            return NextResponse.json({ message: "User role revoked", user });
        }

        // Orders management
        if (action === "updateOrderStatus" && orderId && status) {
            const order = await prisma.order.update({
                where: { id: orderId },
                data: { status },
            });
            return NextResponse.json({ message: "Order status updated", order });
        }

        if (action === "deleteOrder" && orderId) {
            const order = await prisma.order.delete({
                where: { id: orderId },
            });
            return NextResponse.json({ message: "Order deleted", order });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    } catch {
        return NextResponse.json({ error: "Error processing request" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true,
                payments: true,
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            }
        });
        return NextResponse.json(orders);
    } catch {
        return NextResponse.json({ error: "Error fetching orders" }, { status: 500 });
    }
}