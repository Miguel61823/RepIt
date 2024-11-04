'use client';
import React from 'react';
import Features from './Features';
import {SignInButton} from '@clerk/nextjs';
// eslint-disable-next-line n/no-extraneous-import
import {SignedIn, SignedOut} from '@clerk/clerk-react';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

const Home = () => {
  return (
    <main className="container flex-grow mx-auto mt-8 px-4">
      <section className="text-center mb-12">
        <h2 className="text-4xl font-semibold tracking-tight ">
          Transform Your Fitness Journey
        </h2>
        <h3 className="text-violet-600 text-4xl font-semibold tracking-tight mb-4">
          with RepIt
        </h3>
        <p className="text-xl mb-6">
          Achieve your health goals with an easy-to-use workout tracker
        </p>
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="landing">Get Started</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard" passHref>
            <Button variant="landing">Go To Dashboard</Button>
          </Link>
        </SignedIn>
      </section>
      <div className=" dark:bg-gray-800 bg-neutral-200 m-4 p-8">
        <Features />
        {/*<Plans/>*/}
      </div>
    </main>
  );
};

export default Home;
