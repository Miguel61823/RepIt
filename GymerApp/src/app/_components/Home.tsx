'use client';
import React from 'react';
import Features from './Features';
import {SignInButton} from '@clerk/nextjs';
// eslint-disable-next-line n/no-extraneous-import
import {SignedIn, SignedOut} from '@clerk/clerk-react';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import { Zap, CheckCircle, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <main className="container flex-grow mx-auto mt-8 px-4">
      <section className="text-center mb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Transform Your Fitness Journey
          </h1>
          <h2 className="text-5xl font-bold tracking-tight text-violet-600 mb-6">
            with RepIt
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Your ultimate companion in fitness tracking. Effortlessly log workouts, track progress, 
            and stay motivated with intelligent insights that help you crush your health goals.
          </p>
          <div className="flex justify-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button 
                  variant="landing" 
                  className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started for Free
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" passHref>
                <Button 
                  variant="landing" 
                  className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Go To Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      <section className="bg-neutral-100 dark:bg-gray-800 rounded-xl p-12 shadow-md">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            Why Choose RepIt?
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We've designed RepIt to make fitness tracking simple, insightful, and motivating.
          </p>
        </div>
        <Features />
      </section>

      <section className="mt-16 mb-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
            Your Fitness, Simplified
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
              <Zap className="mx-auto mb-4 text-violet-600" size={48} />
              <h4 className="text-xl font-semibold mb-2">Quick Logging</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Log workouts in seconds with our intuitive interface.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
              <CheckCircle className="mx-auto mb-4 text-violet-600" size={48} />
              <h4 className="text-xl font-semibold mb-2">Goal Tracking</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Set, monitor, and achieve your fitness milestones.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
              <TrendingUp className="mx-auto mb-4 text-violet-600" size={48} />
              <h4 className="text-xl font-semibold mb-2">Progress Insights</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Detailed analytics to understand your fitness journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;