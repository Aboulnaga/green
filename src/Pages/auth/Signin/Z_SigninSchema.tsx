import z from "zod";

export const Z_SigninSchema = z.object({
  email: z
    .string()
    .email({ message: "something went wrong in email or password" }),
  password: z
    .string()
    .min(6, { message: "something went wrong in email or password" }),
});
