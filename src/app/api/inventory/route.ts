import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '9');
        const search = searchParams.get('search') || '';
        const category = searchParams.get('category') || '';
        const sortBy = searchParams.get('sortBy') || 'price-asc';
        const minPrice = parseFloat(searchParams.get('minPrice') || '0');
        const maxPrice = parseFloat(searchParams.get('maxPrice') || '1000');

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Build filter object
        const filter: Prisma.InventoryWhereInput = {
            // Ensure title is not null or empty
            NOT: {
                OR: [
                    { title: null },
                    { title: { equals: '' } }
                ]
            },
            ...(search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { tags: { contains: search, mode: 'insensitive' } },
                    { handle: { contains: search, mode: 'insensitive' } },
                ],
            }),
            ...(category && category !== 'all' && { type: { equals: category, mode: 'insensitive' } }),
            ...(minPrice >= 0 && maxPrice > 0 && {
                variantPrice: {
                    gte: minPrice.toString(),
                    lte: maxPrice.toString(),
                },
            }),
        };

        // Determine sort options
        const [sortField, sortOrder] = sortBy.split('-');
        const orderBy: Prisma.InventoryOrderByWithRelationInput = {};
        
        // Convert string sort order to Prisma SortOrder enum
        const orderDirection = sortOrder === 'desc' ? Prisma.SortOrder.desc : Prisma.SortOrder.asc;
        
        // Map frontend sort options to database fields
        if (sortField === 'price') {
            orderBy.variantPrice = orderDirection;
        } else if (sortField === 'name') {
            orderBy.title = orderDirection;
        } else if (sortField === 'stock') {
            orderBy.quantity = orderDirection;
        } else if (sortField === 'createdAt') {
            orderBy.createdAt = orderDirection;
        }

        // Get products with count
        const [products, total, additionalImages] = await Promise.all([
            prisma.inventory.findMany({
                where: filter,
                orderBy,
                skip,
                take: limit,
            }),
            prisma.inventory.count({ where: filter }),
            // Get 5 additional products that have images
            prisma.inventory.findMany({
                where: {
                    AND: [
                        { NOT: { imageSrc: null } },
                        { NOT: { imageSrc: '' } }
                    ]
                },
                take: 5,
                orderBy: { id: 'desc' },
            })
        ]);

        // Transform products to match frontend expectations
        const transformedProducts = products.map(product => ({
            id: product.id,
            name: product.title,
            price: parseFloat(product.variantPrice || '0'),
            stock: Number(product.quantity || 0),
            sales: 0, // Would need to be tracked separately
            image: product.imageSrc || product.variantImage || '/placeholder-product.png',
            category: product.type,
            description: product.bodyHTML || '', // Include description from bodyHTML
            
        }));

        // Transform additional image products
        const imageOnlyProducts = additionalImages.map(product => ({
            id: product.id,
            image: product.imageSrc || product.variantImage || '/placeholder-product.png',
        }));

        return NextResponse.json({
            products: transformedProducts,
            additionalImages: imageOnlyProducts,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error('Error fetching inventory:', error);
        return NextResponse.json(
            { error: 'Failed to fetch inventory', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
