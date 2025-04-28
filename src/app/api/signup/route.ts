import { NextRequest } from "next/server";
import { Signup } from "@/controllers/signupController";


export async function POST(req: NextRequest) {
  const body = await req.json();
  return Signup(body);
}
