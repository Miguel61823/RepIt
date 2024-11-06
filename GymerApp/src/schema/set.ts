import {z} from 'zod';

export const setFormSchema = z.object({
  reps: z.number().min(1, 'At least 1 rep is Required'),
  weight: z.number().min(0, 'Weight cannot be Negative'),
  notes: z.string().optional(),
});
