'use client';

import React from 'react';
import {sessionFormSchema} from '@/schema/session';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Calendar} from '@/components/ui/calendar';
import {format} from 'date-fns';

import {Session, updateSession} from '@/server/api/sessions';

import {cn} from '@/lib/utils';
import {Textarea} from '../ui/textarea';

/**
 * A form component for editing an existing session.
 *
 * @component
 *
 * @typedef {Object} EditSessionFormProps
 * @property {string} session_id - The unique ID of the session being edited.
 * @property {string} name - The name of the session.
 * @property {string} type - The type of the session.
 * @property {Date} date - The date of the session.
 * @property {string} session_data - Additional session details, provided as text.
 *
 * @example
 * <EditSessionForm
 *   session_id="123"
 *   name="Running"
 *   type="Running"
 *   date={new Date('2024-01-01')}
 *   session_data="Ran 5 miles"
 * />
 */
export function EditSessionForm({
  session_id,
  name,
  type,
  date,
  session_data,
}: Session) {
  const form = useForm<z.infer<typeof sessionFormSchema>>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: {
      name: name,
      type: type,
      date: date,
      session_data: session_data,
    },
  });

  // Handles the "Tab" key press to insert spaces in the session data text area
  const handleTab = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const target = event.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const value = target.value;
      const newValue =
        value.substring(0, start) + '    ' + value.substring(end);

      form.setValue('session_data', newValue);

      // Set cursor position after the inserted spaces
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  // Handles form submission, sending updated session data to the server
  async function onSubmit(values: z.infer<typeof sessionFormSchema>) {
    window.dispatchEvent(new Event('closeEditSessionSheet'));
    const result = await updateSession(session_id, values);
    if (result?.error) {
      form.setError('root', {message: 'Edit Session Error. :('});
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
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
          render={({field}) => (
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
          render={({field}) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
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
          name="session_data"
          render={({field}) => (
            <FormItem>
              <FormLabel>Session Data</FormLabel>
              <FormControl>
                <Textarea {...field} onKeyDown={handleTab} rows={10} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <div className="text-red-500">
            {form.formState.errors.root.message}
          </div>
        )}

        <Button type="submit">Save Session</Button>
      </form>
    </Form>
  );
}
