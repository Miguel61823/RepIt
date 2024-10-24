import { z } from "zod";
import { exerciseFormSchema } from "./exercise";

export const workoutFormSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(25, "Title must be 100 characters or less"),
  
  description: z.string()
    .max(500, "Description must be 500 characters or less"),
  
  dateCompleted: z.date(),

  // startTime: z.string()
  //   .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format. Use HH:MM")
  //   .refine((time) => {
  //     const [hours, minutes] = time.split(':').map(Number);
  //     return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
  //   }, "Invalid time"),
  
  // endTime: z.string()
  //   .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format. Use HH:MM")
  //   .refine((time) => {
  //     const [hours, minutes] = time.split(':').map(Number);
  //     return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
  //   }, "Invalid time"),
  exercises: z.array(exerciseFormSchema).min(1, "At least 1 Exercise is Required"),
})

// .refine((data) => {
//   // const start = new Date(`1970-01-01T${data.startTime}`);
//   // const end = new Date(`1970-01-01T${data.endTime}`);
//   // return end > start;
// }, {
//   // message: "End time must be after start time",
//   // path: ["endTime"],
// });
