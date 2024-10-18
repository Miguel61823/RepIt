import React from "react";

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

export const WorkoutCard = ({
  title,
  description,
  date_completed,
  exercises
}: Workout) => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:shadow-gray-900/40 dark:hover:shadow-gray-900/60 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200 transform">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h3 className="text-xl font-bold truncate">{title}</h3>
        <p className="text-sm text-white mt-1">{formatDate(date_completed)}</p>
      </div>
      <div className="p-4">
        <p className="text-black dark:text-white text-sm mb-3 italic">{description}</p>
        <div className="space-y-2">
          <ul className="space-y-2">
            {exercises.map((exercise) => (
              <li key={exercise.e_id} className="text-sm text-black dark:text-white">
                <span className="font-semibold">{exercise.name}</span>
                <ul className="pl-4 mt-1 space-y-1">
                  {exercise.sets.map((set, index) => (
                    <li key={index} className="text-xs">
                      Set {index + 1}: {set.reps} reps @ {set.weight}lbs
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const HistoryList = () => {
  // Updated mock data
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
    <section id="history" className="p-6 bg-white dark:bg-black">
      <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">Workout History</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workouts.map(workout => (
          <WorkoutCard key={workout.id} {...workout} />
        ))}
      </div>
    </section>
  );
};

export default HistoryList;