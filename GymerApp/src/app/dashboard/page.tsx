import React from 'react';
import {AIQuestionInputBar} from './components/AIQuestionInputBar';
import {AIQuestionContainer} from './components/AIQuestionContainer';

export default function DashboardPage() {
  return (
    <div className="container flex-grow max-w-4xl mx-auto mt-8 px-4 mb-8 dark:bg-gray-900 bg-neutral-100">
      <h1 className="text-3xl font-bold">Ask RepIt</h1>
      <AIQuestionContainer />
    </div>
  );
}
