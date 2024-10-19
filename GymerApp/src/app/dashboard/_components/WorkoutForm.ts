"use client";

import { workoutFormSchema } from "@/schema/workout"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function WorkoutForm() {
  const form = useForm<z.infer<typeof workoutFormSchema>>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      title: "",
      description: "",
      startTime: "",
      endTime: "",
    },
  })

  function onSubmit(values: z.infer<typeof workoutFormSchema>) {
    console.log(values)
  }

  return null

  // return (
  //   <Form {...form}>
  //     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
  //       <FormField
  //         control={form.control}
  //         name="title"
  //         render={({ field }) => (
  //           <FormItem>
  //             <FormLabel>Workout Title</FormLabel>
  //             <FormControl>
  //               <Input placeholder="Enter workout title" {...field} />
  //             </FormControl>
  //             <FormDescription>Give your workout a name</FormDescription>
  //             <FormMessage />
  //           </FormItem>
  //         )}
  //       />
  //       <FormField
  //         control={form.control}
  //         name="description"
  //         render={({ field }) => (
  //           <FormItem>
  //             <FormLabel>Description</FormLabel>
  //             <FormControl>
  //               <Textarea placeholder="Describe your workout" {...field} />
  //             </FormControl>
  //             <FormDescription>Briefly describe your workout (optional)</FormDescription>
  //             <FormMessage />
  //           </FormItem>
  //         )}
  //       />
  //       <FormField
  //         control={form.control}
  //         name="startTime"
  //         render={({ field }) => (
  //           <FormItem>
  //             <FormLabel>Start Time</FormLabel>
  //             <FormControl>
  //               <Input type="time" {...field} />
  //             </FormControl>
  //             <FormMessage />
  //           </FormItem>
  //         )}
  //       />
  //       <FormField
  //         control={form.control}
  //         name="endTime"
  //         render={({ field }) => (
  //           <FormItem>
  //             <FormLabel>End Time</FormLabel>
  //             <FormControl>
  //               <Input type="time" {...field} />
  //             </FormControl>
  //             <FormMessage />
  //           </FormItem>
  //         )}
  //       />
  //       <Button type="submit">Submit Workout</Button>
  //     </form>
  //   </Form>
  // );
}