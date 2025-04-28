import { NextRequest, NextResponse } from "next/server";
import { Signin } from "@/controllers/signinController";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return Signin(body);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
