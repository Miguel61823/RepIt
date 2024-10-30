
import { z } from "zod";

// Define the literal schema
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

// Define the JSON schema that recursively handles any JSON structure
type Literal = z.infer<typeof literalSchema>;
type Json = Literal | { [key: string]: Json } | Json[];
const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);

// Define the main session form schema
export const sessionFormSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(25, "Name must be 25 characters or less"),
  
  type: z.string()
    .min(1, "Type is required")
    .max(25, "Type must be 25 characters or less"),
  
  date: z.date().refine((date) => date <= new Date(), {
    message: "Date cannot be in the future",
  }),

  data: jsonSchema.optional() // Use the JSON schema for dynamic data
});