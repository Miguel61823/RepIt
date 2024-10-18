import { db } from "@/drizzle/db";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export interface Workout {
  id: number,
  title: string,
  description: string,
  date_completed: string,
  exercises: Exercise[]
};
export interface Exercise {
  e_id: number,
  name: string,
  sets: number,
  reps: number,
  weight: number
}

const WorkoutCard: React.FC<Workout> = ({
  id,
  title,
  description,
  date_completed,
  exercises
}) => {
  return (
    <section id="workout-card"
             className="hover:bg-blue-700 bg-blue-600 text-white p-6 rounded-lg shadow-md"
    >
      <h3 className="text-xl font-bold mb-2">
        {title} - 
        <span className="text-sm italic">
          {description}
        </span>
      </h3>
      <div className="text-sm">{date_completed}</div>
      <div className="">
        {exercises.reduce((prev, curr) => prev + ", " + curr.name, "").substring(2)}
      </div>
    </section>
  );
};

export default async function HistoryList() {
  const { userId } = auth();

  // ----- data from db, default order by most recent date
  // const { workouts } = await db.query.WorkoutTable.findMany({
  //   where: ({ id }, { eq } => eq(clerk_user_id, userId))
  //   orderby: ()
  // });

  // testing cards
  const workouts: Workout[] = [
    {id: 1,
      title: "Chest",
      description: "bench press only",
      date_completed: "08/09/2024",
      exercises: [{
        e_id: 1,
        name: "Bench Press",
        sets: 5,
        reps: 5,
        weight: 225
      }]
    },
    {id: 2,
      title: "Legs",
      description: "squats only",
      date_completed: "08/10/2024",
      exercises: [{
        e_id: 2,
        name: "Front Squat",
        sets: 3,
        reps: 5,
        weight: 320
      },
      {
        e_id: 3,
        name: "Squat",
        sets: 3,
        reps: 5,
        weight: 495
      }]
    },
    {id: 3,
      title: "title",
      description: "description",
      date_completed: "date here",
      exercises: [{
        e_id: 4,
        name: "exercise (only names shown)",
        sets: 3,
        reps: 5,
        weight: 320
      }]
    }
  ];

  return (
    <section id="history">
      <h3 className="text-2xl font-bold mb-6">Workout History</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {workouts.map(workout => (
          <WorkoutCard key={workout.id}
          id={workout.id}
          title={workout.title}
          description={workout.description}
          date_completed={workout.date_completed}
          exercises={workout.exercises}
          />
        ))}
      </div>
    </section>
  );
};
