import NextAuth from "next-auth";
import { AuthOptions } from "@/lib/auth";
const handlers = NextAuth(AuthOptions);
export { handlers as GET, handlers as POST };
