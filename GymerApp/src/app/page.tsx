"use client"
import React from 'react';
import Topbar from './_components/TopBar';
import Plans from './_components/plans';
import Features from './_components/Features';
import Footer from './_components/Footer';
import { SignInButton } from '@clerk/nextjs';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="dark:bg-blue-900  bg-blue-200 min-h-screen  dark:text-blue-200 text-blue-950">

      <Topbar/>
      <main className="container mx-auto mt-8 px-4">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Transform Your Fitness Journey</h2>
          <p className="text-xl mb-6">Achieve your health goals with personalized workouts plans</p>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="landing">
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" passHref>
              <Button variant="landing">
                Go To Dashboard
              </Button>
            </Link>
          </SignedIn>
        </section>
        
        <Features/>
        <Plans/>
      <Footer/>
      </main>
      
    </div>
  );
}
