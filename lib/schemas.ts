import { z } from "zod";

export const rfqSchema = z.object({
  company: z.string().min(2, "Company name required"),
  contactName: z.string().min(2, "Contact name required"),
  email: z.string().email("Valid business email required"),
  phone: z.string().optional(),
  country: z.string().min(2, "Country required"),
  application: z.string().min(2, "Application required"),
  annualVolume: z.string().min(1, "Estimated volume required"),
  targetDate: z.string().min(1, "Target date required"),
  notes: z.string().optional(),
});

export type RFQFormData = z.infer<typeof rfqSchema>;