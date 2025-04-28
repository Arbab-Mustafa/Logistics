import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db'; // Adjust the import path as needed

// Define the structure for an affiliate application
interface AffiliateApplication {
    name: string;
    email: string;
    message: string;
}

export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const body: AffiliateApplication = await request.json();
        
        // Validate required fields
        if (!body.name || !body.email) {
            return NextResponse.json(
                { error: 'Name and email are required fields' },
                { status: 400 }
            );
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: 'Please provide a valid email address' },
                { status: 400 }
            );
        }
        
        // Create affiliate user in database
        const newAffiliate = await prisma.affiliate.create({
            data: {
                name: body.name,
                email: body.email,
                message: body.message || '',
                status: 'PENDING'
            }
        });
        
        return NextResponse.json(
            { 
                success: true,
                message: 'Affiliate application received successfully',
                affiliate: newAffiliate
            },
            { status: 201 }
        );
        
    } catch (error) {
        console.error('Error processing affiliate application:', error);
        return NextResponse.json(
            { error: 'Failed to process your application' },
            { status: 500 }
        );
    }
}