// "use client";

// import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WorkoutForm } from "../../../components/forms/WorkoutForm";
import { Workout, getWorkoutHistory, deleteWorkout } from "@/server/api/workouts";
import { formatDate } from "@/lib/utils";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// const InsertCard = () => {
//   return(
//     <Card className="overflow-hidden flex flex-col h-full">
//       <CardHeader className="bg-blue-600 text-white">
//         <CardTitle className="text-xl font-bold truncate">Add New Workout</CardTitle>
//         <CardDescription className="mt-1 text-white ">Complete this Form</CardDescription>
//       </CardHeader>
//       <CardContent className="p-4 flex-grow">
//         <WorkoutForm />
//       </CardContent>
//     </Card>
//   )
// }

const WorkoutCard = ({
  id,
  title,
  description,
  date_completed,
  exercises
}: Workout) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <CardHeader className="bg-blue-600 text-white">
        <CardTitle className="text-xl font-bold truncate">{title} {id}</CardTitle>
        <CardDescription className="mt-1 text-white ">{formatDate(date_completed)}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-grow mb-6">
        <p className="text-sm mb-3">{description}</p>
        <div className="space-y-2">
          <ul className="space-y-2">
            {exercises.map((exercise) => (
              <li key={exercise.e_id} className="text-sm">
                <span className="font-semibold">{exercise.name}</span>
                <ul className="pl-4 mt-1 space-y-1">
                  {exercise.sets.map((set, index) => (
                    <li key={index} className="text-xs">
                      Set {index + 1}: {set.reps} reps @ {set.weight}lbs
                      {set.notes && <span className="ml-2 text-gray-500">{'~'} {set.notes}</span>}
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
          <Button>
            Edit
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">
                Delete
              </Button>
              </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your workout data from our servers.
                </DialogDescription>
              </DialogHeader>
              <div className="flex w-full justify-between px-24">
                <Button>
                    Yes, I am sure
                </Button>
                <DialogClose asChild>
                  <Button type="button">
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
};

const WorkoutHistoryPage = async () => {

  const workouts = getWorkoutHistory();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="bg-white dark:bg-black shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
            Workout History
          </h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost">
                + Add Workout
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="overflow-y-auto no-scrollbar">
              <SheetHeader>
                <SheetTitle>New Workout</SheetTitle> 
                <WorkoutForm/>          
              </SheetHeader>
            </SheetContent>
          </Sheet>

        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* <InsertCard/> */}
              {(await workouts).map(workout => (
                <WorkoutCard key={workout.id} {...workout} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkoutHistoryPage;
