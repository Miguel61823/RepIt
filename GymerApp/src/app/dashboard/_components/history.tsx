// "use client";

// import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { WorkoutForm } from "../../../components/forms/WorkoutForm";
import { getWorkoutHistory } from "@/server/api/workouts";
import { WorkoutCard } from "./workoutcard";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
              </SheetHeader>
              <WorkoutForm/>            
              {/* <SheetClose asChild>
                <Button>
                  Submit
                </Button>
              </SheetClose> */}
            </SheetContent>            
{/* 
            <SheetFooter>
              <Button>
                  hi
              </Button>
  
            </SheetFooter> */}
          </Sheet>

        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
