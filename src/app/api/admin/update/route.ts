import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// Define model types
type ModelType = 'Text' | 'Image' | 'Video';

// Define request body type
interface UpdateRequestBody {
    id: string;
    modelType: ModelType;
    data: Record<string, unknown>;
}

export async function POST(req: Request) {
    try {
        const body = await req.json() as UpdateRequestBody;
        const { id, data, modelType } = body;

        // Validate required fields
        if (!id || !data || !modelType) {
            return NextResponse.json(
                { error: 'ID, data, and modelType are required fields' },
                { status: 400 }
            );
        }

        let updatedItem;

        // Update the appropriate model
        const numericId = parseInt(id, 10);
        
        switch (modelType) {
            case 'Text':
                updatedItem = await prisma.text.update({
                    where: { id: numericId },
                    data,
                });
                break;
            case 'Image':
                updatedItem = await prisma.image.update({
                    where: { id: numericId },
                    data,
                });
                break;
            case 'Video':
                updatedItem = await prisma.video.update({
                    where: { id: numericId },
                    data,
                });
                break;
            default:
                return NextResponse.json(
                    { error: 'Invalid model type. Must be Text, Image, or Video' },
                    { status: 400 }
                );
        }

        return NextResponse.json(updatedItem);
    } catch (error) {
        console.error('Error updating item:', error);
        return NextResponse.json(
            { error: 'Update failed' },
            { status: 500 }
        );
    }
}