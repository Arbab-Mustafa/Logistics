import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { OrderStatus } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "@/lib/auth";

// Helper functions for responses
const successResponse = <T>(message: string, data?: T) => 
    NextResponse.json({ success: true, message, data });

const errorResponse = (error: unknown, status = 500) => {
    console.error("Admin API error:", error);
    return NextResponse.json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
    }, { status });
};

// Admin action handlers
const adminActions = {
    async makeStaff(email: string) {
        const user = await prisma.user.update({
            where: { email },
            data: { role: "STAFF" },
        });
        return successResponse("User promoted to staff", { user });
    },
    
    async revokeRole(email: string) {
        const user = await prisma.user.update({
            where: { email },
            data: { role: "CUSTOMER" },
        });
        return successResponse("User role revoked", { user });
    },
    
    async controlTestimonial(reviewId: number, approve: boolean) {
        const review = await prisma.review.update({
            where: { id: reviewId },
            data: { isApproved: approve },
        });
        return successResponse(`Review ${approve ? 'approved' : 'rejected'}`, { review });
    },
    
    async updateOrderStatus(orderId: string, status: string) {
        // Validate that status is a valid OrderStatus enum value
        if (!Object.values(OrderStatus).includes(status as OrderStatus)) {
            throw new Error(`Invalid order status: ${status}`);
        }
        
        const order = await prisma.order.update({
            where: { id: parseInt(orderId, 10) },
            data: { status: status as OrderStatus },
            include: {
                user: { select: { id: true, name: true, email: true } },
                payments: true,
                orderItems: { include: { product: true } }
            }
        });
        return successResponse("Order status updated", { order });
    },
    
    async deleteOrder(orderId: string) {
        const order = await prisma.order.delete({
            where: { id: parseInt(orderId, 10) },
        });
        return successResponse("Order deleted", { order });
    }
};

// Verify the user has admin access
async function verifyAdminAccess() {
    const session = await getServerSession(AuthOptions);
    
    if (!session?.user) {
        throw new Error("Unauthorized: Not logged in");
    }
    
    const user = await prisma.user.findUnique({
        where: { email: session.user.email as string },
    });
    
    if (user?.role !== "ADMIN") {
        throw new Error("Forbidden: Admin access required");
    }
    
    return user;
}

export async function POST(request: Request) {
    try {
        await verifyAdminAccess();
        
        const { action, ...params } = await request.json();
        
        if (!action || typeof action !== "string") {
            return errorResponse(new Error("Missing or invalid action parameter"), 400);
        }
        
        const handler = adminActions[action as keyof typeof adminActions];
        
        if (!handler || typeof handler !== "function") {
            return errorResponse(new Error(`Unknown action: ${action}`), 400);
        }
        
        switch(action) {
            case 'makeStaff':
                return await adminActions.makeStaff(params.email);
            case 'revokeRole':
                return await adminActions.revokeRole(params.email);
            case 'controlTestimonial':
                return await adminActions.controlTestimonial(params.reviewId, params.approve);
            case 'updateOrderStatus':
                return await adminActions.updateOrderStatus(params.orderId, params.status);
            case 'deleteOrder':
                return await adminActions.deleteOrder(params.orderId);
            default:
                return errorResponse(new Error(`Unsupported action: ${action}`), 400);
        }
    } catch (error) {
        const status = 
            error instanceof Error && 
            (error.message.includes("Unauthorized") || error.message.includes("Forbidden")) 
                ? 403 : 500;
        
        return errorResponse(error, status);
    }
}

export async function GET() {
    try {
        await verifyAdminAccess();
        
        // Return admin dashboard data
        const users = await prisma.user.count();
        const orders = await prisma.order.count();
        const pendingReviews = await prisma.review.count({
            where: { isApproved: false }
        });
        
        return successResponse("Admin dashboard data", {
            stats: { users, orders, pendingReviews }
        });
    } catch (error) {
        return errorResponse(error);
    }
}
