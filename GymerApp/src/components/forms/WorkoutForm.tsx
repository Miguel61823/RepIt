import React from 'react';
import { workoutFormSchema } from "@/schema/workout";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

import { createWorkout } from '@/server/api/workouts';

export function WorkoutForm() {
  const form = useForm<z.infer<typeof workoutFormSchema>>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      title: "",
      description: "",
      exercises: [{name: "", sets: [{ reps: 0, weight: 0, notes: ""}] }],
    },
  });

  const { fields: exerciseFields, append: appendExercise, remove: removeExercise } = useFieldArray({
    control: form.control,
    name: "exercises",
  });

  async function onSubmit(values: z.infer<typeof workoutFormSchema>) {
    console.log('...submitting workout form...');
    const data = await createWorkout(values);
    console.log('...createWorkout() ran...');
    if (data?.error) {
      form.setError("root", {message: "Create Workout Error. :("})
    }
    

  }

  // console.log(form.formState.errors);

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
        <FormField
          control={form.control}
          name="dateCompleted"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                
                    <Button
                      variant="outline"
                      
                      className={cn(
                        "p-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value? (
                        format(field.value, "PPP")
                      ) : (
                        <>Choose completed date</>
                      )}
                    </Button>
                
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar 
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {exerciseFields.map((exercise, exerciseIndex) => (
          <ExerciseFieldArray 
            key={exercise.id} 
            nestIndex={exerciseIndex} 
            control={form.control}
            remove={removeExercise}
          />
        ))}
        <div className='flex justify-between'>
          <Button type="button" onClick={() => appendExercise({ name: "", sets: [{ reps: 0, weight: 0, notes: "" }] })}>
            Add Exercise
          </Button>
          
          <Button type="submit">Submit Workout</Button>
        </div>
      </form>
    </Form>
  );
}

function ExerciseFieldArray({ nestIndex, control, remove }) {
  const { fields, append, remove: removeSet } = useFieldArray({
    control,
    name: `exercises.${nestIndex}.sets`
  });

  return (
    <div className="border p-4 mb-4">
      <FormField
        control={control}
        name={`exercises.${nestIndex}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Exercise Name</FormLabel>
            <FormControl>
              <Input placeholder="Exercise name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="mt-4">
        <h4>Sets</h4>
        {fields.map((field, setIndex) => (
          <div key={field.id} className="flex gap-2 mt-2">
            <FormField
              control={control}
              name={`exercises.${nestIndex}.sets.${setIndex}.reps`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" placeholder="Reps" {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`exercises.${nestIndex}.sets.${setIndex}.weight`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" placeholder="Weight" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`exercises.${nestIndex}.sets.${setIndex}.notes`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Notes" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="button" onClick={() => removeSet(setIndex)}>
              Remove Set
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => append({ reps: 0, weight: 0, notes: "" })} className="mt-2">
          Add Set
        </Button>
      </div>
      
      <Button type="button" onClick={() => remove(nestIndex)} className="mt-4">
        Remove Exercise
      </Button>
    </div>
  );
}
