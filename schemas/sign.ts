import { z } from "zod";

export const signSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Invalid password"),
});

export type ContactFormData = z.infer<typeof signSchema>;
