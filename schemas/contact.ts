import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email"),
  message: z.string().min(1, "Please enter your message"),
  phone: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
