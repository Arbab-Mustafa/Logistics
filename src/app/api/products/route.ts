import { NextResponse } from "next/server";
import prisma from "@/lib/db";
export async function GET() {
    const products = await prisma.inventory.findMany();
    const data = products.map(product => ({
        id: product.id,
        name: product.handle,
        price: product.variantPrice,
    }));

    console.log(data);
    return NextResponse.json(data);
}
