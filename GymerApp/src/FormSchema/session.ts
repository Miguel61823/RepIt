
import { z } from "zod";
import { nodeFormSchema } from "./session_node";

// define sessionFormSchema
export const sessionFormSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(25, "Name must be 25 characters or less"),
  type: z.string()
  .min(1, "Type is required")
  .max(25, "Type must be 25 characters or less"),
  date: z.date(),
  nodes: z.array(nodeFormSchema).min(1, "At least 1 Group is Required"),
})

