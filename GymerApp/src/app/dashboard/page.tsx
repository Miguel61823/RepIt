import React from 'react';
import {AIQuestionContainer} from './components/AIQuestionContainer';
import {Suspense} from 'react';
import {SessionsList} from '../sessions/_components/sessionsList';
import {SupplementsList} from '../supplements/_components/SupplementsList';
import {GoalsList} from '../goals/_components/GoalsList';

// import DataVisualization from './components/dataVisualization';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* AI Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Ask RepIt
          </h2>
          <AIQuestionContainer />
        </div>

        {/* Sessions Section*/}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Sessions
          </h2>
          <Suspense fallback={<div>Loading sessions...</div>}>
            <SessionsList />
          </Suspense>
        </div>

        {/* Supplements Section*/}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Supplements
          </h2>
          <Suspense fallback={<div>Loading sessions...</div>}>
            <SupplementsList />
          </Suspense>
        </div>
        {/* Goals Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Goals
          </h2>
          <Suspense fallback={<div>Loading goals...</div>}>
            <GoalsList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
