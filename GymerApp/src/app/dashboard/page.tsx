// "use client"
import React from 'react';
import Topbar from '../_components/TopBar';
import Footer from '../_components/Footer';
import HistoryList from './_components/history';

export default function Dashboard() {
  return ( 
      <div className="container flex-grow mx-auto dark:bg-gray-900 bg-gray-50 mt-8 px-4">
        {/* <Metrics/ > */}
        <HistoryList />
        {/* <Goals /> */}
      </div>
   );
}
 