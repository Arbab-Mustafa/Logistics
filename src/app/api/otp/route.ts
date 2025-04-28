import { NextRequest, NextResponse } from "next/server";
import { generateOTP } from "@/utils/genotp";

import prisma from "@/lib/db";
import EmailService from "@/services/Emailservice";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const otp = generateOTP();
  console.log(otp);
  console.log(email);
  await prisma.verification.create({
    data: {
      Otp: otp,
      EmailId: email 
    }
  });
  EmailService(email, otp);
  return NextResponse.json(
    { message: "OTP has been sent to your email!" },
    { status: 200 },
  );
}
