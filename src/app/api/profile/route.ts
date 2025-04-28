import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get('email');
    if (!email) {
        return NextResponse.json(
            { error: 'Email query parameter is required' },
            { status: 400 }
        );
    }
    const profile = await prisma.profile.findUnique({
        where: { email },
        select: {
            email: true,
            name: true,
            url: true,
        },
    });

    if (!profile) {
        return NextResponse.json(
            { error: 'Profile not found' },
            { status: 404 }
        );
    }

    return NextResponse.json(profile, { status: 200 });
}