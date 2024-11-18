// "use client"
import React from 'react';
import HistoryList from './_components/history';

export default function Dashboard() {
  return (
    <div className="container flex-grow mx-auto dark:bg-gray-900 bg-neutral-100 mt-8 px-4">
      {/* <Metrics/ > */}
      <HistoryList />
      {/* <Goals /> */}
    </div>
  );
}
