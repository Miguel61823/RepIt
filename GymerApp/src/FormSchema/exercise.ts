import { z } from "zod";
import { setFormSchema } from "./set";

export const exerciseFormSchema = z.object({
  name: z.string()
    .min(1, "Exercise name is required"),
  sets: z.array(setFormSchema).min(1, "At least 1 set is required"),
});