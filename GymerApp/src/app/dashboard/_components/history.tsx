// "use client";

// import React from "react";

import {getWorkoutHistory} from '@/server/api/workouts';
import {WorkoutCard} from './workoutCard';
import {SheetWrapper} from './newWorkoutSheet';

const WorkoutHistoryPage = async () => {
  const workouts = getWorkoutHistory();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl bg-gray-50 dark:bg-gray-900 mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
            Workout History
          </h1>
          <SheetWrapper />
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
