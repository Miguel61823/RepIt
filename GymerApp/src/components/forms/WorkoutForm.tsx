"use client";

import { workoutFormSchema } from "@/schema/workout"
// import { exerciseFormSchema } from "@/schema/exercise"
// import { setFormSchema } from "@/schema/set"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
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
      exercises: [{name: "", sets: [{ reps: 0, weight: 0, notes: ""}] }],
    },
  })

  const { fields, append, remove} = useFieldArray({
    control:form.control,
    name: "exercises",

  })

  const handleRemove = (index: number) => {
    remove(index);
  }

  const handleAppend = () => {
    append({ name: "", sets: [{ reps: 0, weight: 0, notes: "" }]});
  }

  function onSubmit(values: z.infer<typeof workoutFormSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter workout title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your workout (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {fields.map(({id}, index) => (
          <FormField
          key={id}
          control={form.control}
          name={ `exercises.${index}.name`}
          render={({ field }) => (
            <div className="flex items-start justify-center gap-2">
              <FormItem className="flex-grow">
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
              <Button type="button" onClick={() => handleRemove(index)}>
                (-)
              </Button>

            </div>
        )}
          />
        ))}
        <div className="w-full mt-auto flex justify-between">
          <Button type="button" onClick={handleAppend} className="text-xs">
            + Add Exercise
          </Button>
        </div>
        
        <Button type="submit">Submit Workout</Button>
      </form>
    </Form>
  );
}