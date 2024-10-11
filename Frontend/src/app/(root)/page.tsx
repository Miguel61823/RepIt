"use client"
import React from 'react';
import Topbar from './_components/TopBar';
import Plans from './_components/plans';
import Features from './_components/Features';
import Footer from './_components/Footer';
import { SignInButton } from '@clerk/nextjs';
import { SignedOut } from '@clerk/clerk-react';

export default function Home() {
  return (
    <div className="dark:bg-blue-900  bg-blue-200 min-h-screen  dark:text-blue-200 text-blue-600">

      <Topbar/>
      <main className="container mx-auto mt-8 px-4 h-screen">
        <SignedOut>
          <section className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Transform Your Fitness Journey</h2>
            <p className="text-xl mb-6">Achieve your health goals with personalized workouts plans</p>
            
              <SignInButton mode="modal">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300">
                  Get Started
                </button>
              </SignInButton>
            
          </section>
          
          <Features/>
          <Plans/>
          <Footer/>
        </SignedOut>

      </main>
      
        {/* <Dashboard/> */}
    </div>
  );
}
