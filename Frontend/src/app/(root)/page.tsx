"use client"
import React from 'react';
import Topbar from './_components/TopBar';
import Plans from './_components/plans';
import Features from './_components/Features';
import Footer from './_components/Footer';

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">

      <Topbar/>
      <main className="container mx-auto mt-8 px-4">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Transform Your Fitness Journey</h2>
          <p className="text-xl mb-6">Achieve your health goals with personalized workouts plans</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300">
            Get Started Free
          </button>
        </section>

        <Features/>
        <Plans/>
      </main>
      <Footer/>
    </div>
  );
}
