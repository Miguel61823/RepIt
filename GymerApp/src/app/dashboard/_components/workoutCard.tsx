'use client';

// import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {Button} from '@/components/ui/button';
import {Workout, deleteWorkout} from '@/server/api/workouts';
import {formatDate} from '@/lib/utils';

export const WorkoutCard = ({
  id,
  title,
  description,
  date_completed,
  exercises,
}: Workout) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full bg-gray-200 dark:bg-gray-800">
      <CardHeader className="bg-violet-600 text-white">
        <CardTitle className="text-xl font-bold truncate">{title}</CardTitle>
        <CardDescription className="mt-1 text-white ">
          {formatDate(date_completed)}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-grow mb-6">
        <p className="text-sm mb-3">{description}</p>
        <div className="space-y-2">
          <ul className="space-y-2">
            {exercises.map(exercise => (
              <li key={exercise.e_id} className="text-sm">
                <span className="font-semibold">{exercise.name}</span>
                <ul className="pl-4 mt-1 space-y-1">
                  {exercise.sets.map((set, index) => (
                    <li key={index} className="text-xs">
                      Set {index + 1}: {set.reps} reps @ {set.weight}lbs
                      {set.notes && (
                        <span className="ml-2 text-gray-500">
                          {'~'} {set.notes}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between">
          {/* <Button>
            Edit
          </Button> */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="text-red-500 hover:text-red-500 hover:bg-gray-50 hover:dark:bg-gray-900"
              >
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your workout data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex w-full justify-between px-24">
                <AlertDialogAction onClick={() => deleteWorkout(id)}>
                  Yes, I am sure
                </AlertDialogAction>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};
