import prisma from "@/lib/db";
import { hash } from "bcrypt";
import { User } from "@/types/user";
import { z } from "zod";
import { NextResponse } from "next/server";
export const Signup = async (body: string) => {
  if (!body) {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }
  try {
    const result = User.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
    }
    const { Name, email, Password } = result.data;
    if (!email || !Password || !Name) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingEmail) {
      const HashedPassword = await hash(Password, 10);
      const response = await prisma.user.create({
        data: {
          email,
          password: HashedPassword,
          name: Name,
        },
      });
      const res = await prisma.profile.create({
        data: {
          id: response.id,
          username: "",
          url: "",
          name: Name,
          email: email,
          phone: "",
        },
      });
      if (response && res) {
        return NextResponse.json({ message: "Signed Up Successfully!!" }, { status: 201 });
      } else {
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
      }
    } else {
      return NextResponse.json({ message: "Email Already Exists!" }, { status: 409 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { message: "Unexpected error occurred", error },
        { status: 500 }
      );
    }
  }
}
