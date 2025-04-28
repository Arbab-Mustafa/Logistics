import z from "zod";
export const UserLogin = z.object({
  email: z.string().email(),
  Password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine(
      (pass) => /[A-Z]/.test(pass),
      "Password must contain at least one uppercase letter"
    )
    .refine(
      (pass) => /[a-z]/.test(pass),
      "Password must contain at least one lowercase letter"
    )
    .refine(
      (pass) => /[0-9]/.test(pass),
      "Password must contain at least one number"
    )
    .refine(
      (pass) => /[^A-Za-z0-9]/.test(pass),
      "Password must contain at least one special character"
    ),
});
