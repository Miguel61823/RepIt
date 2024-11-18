import {z} from 'zod';

// Helper function to strip time from Date objects
const stripTime = (date: Date) => new Date(date.toDateString());

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

  dueDate: z.date().refine(date => stripTime(date) >= stripTime(new Date()), {
    message: 'Due date must be today or in the future',
  }),

  completed: z.boolean().default(false),
});
