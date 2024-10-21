// "use client"
import React from 'react';
import Topbar from '../_components/TopBar';
import Footer from '../_components/Footer';
// import { Button } from '@/components/ui/button';
// import Features from '../_components/Features';
// import Link from 'next/link';

// import Board from './_components/fitness';
import HistoryList from './_components/history';



export default function Dashboard() {
  return ( 
    <div className="flex flex-col dark:bg-black  bg-white min-h-screen  dark:text-white text-black">
      <Topbar/>
      <div className="container flex-grow mx-auto mt-8 px-4">

        
        {/* <Metrics/ > */}
        <HistoryList />
      </div>
      <Footer/>
    </div>
   );
}
 