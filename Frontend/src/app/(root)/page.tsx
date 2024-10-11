"use client"
import React from 'react';

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">RepIt App</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#pricing" className="hover:underline">Pricing</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
              <li><a href="#contact" className="hover:underline">Login</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-8 px-4">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Transform Your Fitness Journey</h2>
          <p className="text-xl mb-6">Achieve your health goals with personalized workouts plans</p>
          <button className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300">
            Get Started Free
          </button>
        </section>

        <section id="features" className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-600 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Personalized Workouts</h4>
              <p>Tailored exercise plans based on your fitness level and goals</p>
            </div>
            <div className="bg-blue-600 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Nutrition Tracking</h4>
              <p>Log your meals and track your calorie intake effortlessly</p>
            </div>
            <div className="bg-blue-600 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Progress Analytics</h4>
              <p>Visualize your fitness journey with detailed progress reports</p>
            </div>
          </div>
        </section>

        <section id="pricing" className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Pricing Plans</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-600 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Basic</h4>
              <p className="text-3xl font-bold mb-4">$9.99<span className="text-sm font-normal">/month</span></p>
              <ul className="mb-6">
                <li>✓ Personalized workouts</li>
                <li>✓ Basic nutrition tracking</li>
                <li>✓ Limited progress analytics</li>
              </ul>
              <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
                Choose Plan
              </button>
            </div>
            <div className="bg-blue-600 p-6 rounded-lg shadow-md border-2 border-blue-500">
              <h4 className="text-xl font-semibold mb-2">Pro</h4>
              <p className="text-3xl font-bold mb-4">$19.99<span className="text-sm font-normal">/month</span></p>
              <ul className="mb-6">
                <li>✓ Advanced personalized workouts</li>
                <li>✓ Comprehensive nutrition tracking</li>
                <li>✓ Full progress analytics</li>
                <li>✓ Coach support</li>
              </ul>
              <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
                Choose Plan
              </button>
            </div>
            <div className="bg-blue-600 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Elite</h4>
              <p className="text-3xl font-bold mb-4">$29.99<span className="text-sm font-normal">/month</span></p>
              <ul className="mb-6">
                <li>✓ All Pro features</li>
                <li>✓ Personalized meal plans</li>
                <li>✓ 1-on-1 coaching sessions</li>
                <li>✓ Premium content access</li>
              </ul>
              <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
                Choose Plan
              </button>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 RepIt App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
