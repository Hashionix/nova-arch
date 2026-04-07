import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please provide a valid email address."),
  organization: z.string().min(2, "Please enter your organization name."),
  projectType: z.string().min(1, "Please select a project type."),
  budget: z.string().min(1, "Please select a budget range."),
  message: z
    .string()
    .min(20, "Please share at least 20 characters about your project."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
