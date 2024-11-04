import {z} from 'zod';

// Define the main session form schema
export const sessionFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(25, 'Name must be 25 characters or less'),

  type: z
    .string()
    .min(1, 'Type is required')
    .max(25, 'Type must be 25 characters or less'),

  date: z.date().refine(date => date <= new Date(), {
    message: 'Date cannot be in the future',
  }),
  session_data: z.string(), // store data as string in form schema, convert to jsonb on submit
});
