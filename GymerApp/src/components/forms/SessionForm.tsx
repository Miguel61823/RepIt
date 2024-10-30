"use client"

import React from 'react';
import { sessionFormSchema } from "@/FormSchema/session";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

import { createSession } from '@/server/api/sessions';

import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';

// Types for the workout data structure
type WorkoutValue = string | WorkoutObject;
type WorkoutObject = {
    [key: string]: WorkoutValue;
};
const parseWorkoutText = (text: string): WorkoutObject => {
  const lines = text.split('\n');
  const root: WorkoutObject = {};
  const stack: [WorkoutObject, number][] = [[root, -1]];
  let lastParent: WorkoutObject | null = null;
  let lastKey: string | null = null;
  let lastLevel: number = -1;

  lines.forEach(line => {
    if (!line.trim()) return;

    const level = Math.floor(line.search(/\S|$/) / 4);
    const content = line.trim();

    // Handle non-colon lines (notes)
    if (!content.includes(':') && lastParent && lastKey && level > lastLevel) {
      const currentValue = lastParent[lastKey];
      if (typeof currentValue === 'string') {
        lastParent[lastKey] = [currentValue, content];
      } else if (Array.isArray(currentValue)) {
        currentValue.push(content);
      }
      return;
    }

    // Pop stack until we find the appropriate parent
    while (stack.length > 1 && stack[stack.length - 1][1] >= level) {
      stack.pop();
    }

    const parent = stack[stack.length - 1][0];

    if (content.includes(':')) {
      // This is a key-value pair
      const [key, ...valueParts] = content.split(':');
      const value = valueParts.join(':').trim();
      parent[key.trim()] = value;
      lastParent = parent;
      lastKey = key.trim();
      lastLevel = level;
    } else {
      // This is a new object
      const newObj: WorkoutObject = {};
      parent[content] = newObj;
      stack.push([newObj, level]);
      lastParent = null;
      lastKey = null;
      lastLevel = -1;
    }
  });

  return root;
};

export function SessionForm() {
  const form = useForm<z.infer<typeof sessionFormSchema>>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: {
      name: "",
      type: "",
      date: new Date(),
      data: ""
    },
  });

  const handleTab = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const target = event.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const value = target.value;
      const newValue = value.substring(0, start) + "    " + value.substring(end);
      
      form.setValue('data', newValue);
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  async function onSubmit(values: z.infer<typeof sessionFormSchema>) {
    console.log(JSON.stringify(values.data));    
    // convert data from string to jsonb
    const result = parseWorkoutText(values.data)
    console.log(JSON.stringify(result, null, 2))
    // make new Session object
    // create session in db from new object
    // const data = await createSession(values);
    // if (data?.error) {
    //   form.setError("root", {message: "Create Session Error. :("})
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Type</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
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
        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Data</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  onKeyDown={handleTab}
                  rows={10}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Session</Button>
      </form>
    </Form>
  );
}