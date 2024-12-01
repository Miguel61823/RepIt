// "use client";

// import React from "react";

import {NewSession} from './NewSession';
import {SessionsList} from './SessionsList';

/**
 * The `SessionHistory` component serves as the main interface for managing and viewing session history.
 * It includes a header with options to create a new session and displays a list of all existing sessions.
 *
 * @returns {Promise<JSX.Element>} A layout comprising a header and session list section.
 *
 */
const SessionHistory = async () => {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-gray-900">
      <header className="bg-neutral-100 dark:bg-gray-900">
        <div className="max-w-7xl bg-neutral-100 dark:bg-gray-900 mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
            Session History
          </h1>
          <NewSession />
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <SessionsList />
            {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(await workouts).map(session => (
                <SessionCard key={session.session_id} {...session} />
              ))}
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SessionHistory;
