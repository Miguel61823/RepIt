// "use client";

// import React from "react";

import { getSessionHistory } from "@/server/api/sessions";
import { SessionCard } from "./sessionCard";
import { NewSession } from "./newSession";

const SessionHistoryPage = async () => {

  const workouts = getSessionHistory();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="bg-white dark:bg-black shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
            Session History
          </h1>
          <NewSession />
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(await workouts).map(session => (
                <SessionCard key={session.session_id} {...session} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SessionHistoryPage;