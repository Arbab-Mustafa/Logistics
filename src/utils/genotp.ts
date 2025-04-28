import { randomBytes } from "crypto";

/**
 * Generates a secure One-Time Password (OTP) for server-side environments.
 * @param length - Length of the OTP to generate (default is 6).
 * @returns A string representing the OTP.
 */
export function generateOTP(length = 6): number {
  if (length <= 0) {
    throw new Error("OTP length must be greater than 0.");
  }

  // Generate random bytes and map them to digits
  const bytes = randomBytes(length);
  return Number(Array.from(bytes, (byte) => byte % 10).join(""));
}
