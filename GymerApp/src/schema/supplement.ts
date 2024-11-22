import { z } from 'zod';

export const supplementFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
  dosage: z.string().min(1, 'Dosage is required').max(50, 'Dosage must be 50 characters or less'),
  frequency: z.string().min(1, 'Frequency is required').max(100, 'Frequency must be 100 characters or less'),
  instructions: z.string().max(500, 'Instructions must be 500 characters or less').optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  isActive: z.boolean().default(true),
}).refine((data) => {
  if (data.endDate && data.startDate > data.endDate) {
    return false;
  }
  return true;
}, {
  message: "End date cannot be before start date",
  path: ["endDate"],
});

export type SupplementFormData = z.infer<typeof supplementFormSchema>;
