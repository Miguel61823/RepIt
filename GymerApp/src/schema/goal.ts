import { z } from 'zod';

// Define the main goal form schema
export const goalFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(50, 'Title must be 50 characters or less'),

  description: z
    .string()
    .max(500, 'Description must be 500 characters or less')
    .optional(),

  dueDate: z.date().refine(date => date >= new Date(), {
    message: 'Due date must be in the future',
  }),

  completed: z.boolean().default(false),
});
