'use client'


import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { WorkoutForm } from "../../../components/forms/WorkoutForm";


export interface Workout {
  id: number;
  title: string;
  description: string;
  date_completed: string;
  start_time: string;
  end_time: string;
  exercises: Exercise[];
}

export interface Exercise {
  e_id: number;
  name: string;
  sets: Set[];
}

export interface Set {
  reps: number;
  weight: number;
  notes: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
};

const InsertCard = () => {
  return(
    <Card className="overflow-hidden flex flex-col h-full">
      <CardHeader className="bg-blue-600 text-white">
        <CardTitle className="text-xl font-bold truncate">Add New Workout</CardTitle>
        <CardDescription className="mt-1 text-white ">hiii</CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <WorkoutForm />
      </CardContent>
    </Card>
  )
}

const WorkoutCard = ({
  title,
  description,
  date_completed,
  exercises
}: Workout) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <CardHeader className="bg-blue-600 text-white">
        <CardTitle className="text-xl font-bold truncate">{title}</CardTitle>
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
                      {set.notes && <span className="ml-2 text-gray-500">{'>'}{set.notes}</span>}
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
          <Button variant="destructive">
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const WorkoutHistoryPage = () => {
  // Mock data for workouts
  const workouts: Workout[] = [
    {
      id: 1,
      title: "Chest Day",
      description: "Focus on bench press progression",
      date_completed: "2024-10-09",
      start_time: "07:00:00",
      end_time: "08:30:00",
      exercises: [{
        e_id: 1,
        name: "Bench Press",
        sets: [
          { reps: 5, weight: 225, notes: "Felt strong" },
          { reps: 5, weight: 235, notes: "Good form" },
          { reps: 4, weight: 245, notes: "Struggled on last rep" },
          { reps: 3, weight: 245, notes: "Needed spotter" },
          { reps: 5, weight: 225, notes: "Finished strong" }
        ]
      }]
    },
    {
      id: 2,
      title: "Leg Day",
      description: "Squats and front squats for quad development",
      date_completed: "2024-10-10",
      start_time: "18:00:00",
      end_time: "19:45:00",
      exercises: [
        {
          e_id: 2,
          name: "Front Squat",
          sets: [
            { reps: 5, weight: 185, notes: "Warming up" },
            { reps: 5, weight: 205, notes: "Good depth" },
            { reps: 5, weight: 225, notes: "Maintaining form" }
          ]
        },
        {
          e_id: 3,
          name: "Back Squat",
          sets: [
            { reps: 5, weight: 275, notes: "Felt heavy" },
            { reps: 5, weight: 315, notes: "Personal best" },
            { reps: 3, weight: 365, notes: "New max!" }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Full Body Workout",
      description: "Mixed exercises for overall strength",
      date_completed: "2024-10-11",
      start_time: "12:00:00",
      end_time: "13:30:00",
      exercises: [
        {
          e_id: 4,
          name: "Deadlift",
          sets: [
            { reps: 5, weight: 315, notes: "Easy warm-up" },
            { reps: 5, weight: 365, notes: "Good form" },
            { reps: 3, weight: 405, notes: "Grip started to fail" }
          ]
        },
        {
          e_id: 5,
          name: "Pull-ups",
          sets: [
            { reps: 10, weight: 0, notes: "Bodyweight" },
            { reps: 8, weight: 25, notes: "Added weight" },
            { reps: 6, weight: 45, notes: "Challenging" }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="bg-white dark:bg-black shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Workout History
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <InsertCard/>
              {workouts.map(workout => (
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