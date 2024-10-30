import { z } from "zod";

export const nodeFormSchema = z.object({
  type: z.enum(['Group', 'Metric']),
  value:  z.number().optional(),
  unit: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  path: z.array(z.string()).min(1, "Path must contain at least one element")
})