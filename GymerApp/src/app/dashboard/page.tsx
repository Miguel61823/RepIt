'use client';
import React, { useState } from 'react';
import { AIQuestionContainer } from './components/AIQuestionContainer';
import DataVisualization from './components/dataVisualization';
import { X } from 'lucide-react';

// Mock data for visualizations
const sessionsData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
];

const goalsData = [
  { month: "Weight", desktop: 75, mobile: 100 },
  { month: "Cardio", desktop: 60, mobile: 100 },
  { month: "Flexibility", desktop: 40, mobile: 100 },
];

const supplementData = [
  { month: "Protein", desktop: 90, mobile: 100 },
  { month: "Creatine", desktop: 70, mobile: 100 },
  { month: "BCAA", desktop: 85, mobile: 100 },
];

// Popup component with enhanced styling
const PopupDialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-11/12 max-w-2xl shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Stats card component
const StatsCard = ({ label, value, trend }) => (
  <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-sm">
    <div className="flex-grow">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
    {trend && (
      <span className={`text-sm px-2 py-1 rounded-full ${
        trend > 0 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        {trend > 0 ? '+' : ''}{trend}%
      </span>
    )}
  </div>
);

export default function DashboardPage() {
  const [activePopup, setActivePopup] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header with quick stats */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Fitness Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatsCard label="Total Sessions" value="24" trend={12} />
            <StatsCard label="Active Goals" value="7/10" trend={-5} />
            <StatsCard label="Supplement Adherence" value="85%" trend={3} />
            <StatsCard label="Weekly Progress" value="92%" trend={8} />
          </div>
        </div>

        {/* AI Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Ask RepIt
          </h2>
          <AIQuestionContainer />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sessions Card */}
          <div 
            onClick={() => setActivePopup('sessions')}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 cursor-pointer 
                     transition-all duration-300 shadow-lg hover:shadow-xl
                     border border-gray-100 dark:border-gray-700
                     hover:border-violet-200 dark:hover:border-violet-800"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Recent Sessions</h2>
            <div className="h-64">
              <DataVisualization 
                type="line" 
                data={sessionsData}
                config={{
                  desktop: { label: "Completed", color: "#7c3aed" },
                  mobile: { label: "Target", color: "#c4b5fd" }
                }}
              />
            </div>
          </div>

          {/* Goals Card */}
          <div 
            onClick={() => setActivePopup('goals')}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 cursor-pointer 
                     transition-all duration-300 shadow-lg hover:shadow-xl
                     border border-gray-100 dark:border-gray-700
                     hover:border-violet-200 dark:hover:border-violet-800"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Weekly Goals</h2>
            <div className="h-64">
              <DataVisualization 
                type="bar" 
                data={goalsData}
                config={{
                  desktop: { label: "Progress", color: "#7c3aed" },
                  mobile: { label: "Target", color: "#c4b5fd" }
                }}
              />
            </div>
          </div>

          {/* Supplements Card */}
          <div 
            onClick={() => setActivePopup('supplements')}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 cursor-pointer 
                     transition-all duration-300 shadow-lg hover:shadow-xl
                     border border-gray-100 dark:border-gray-700
                     hover:border-violet-200 dark:hover:border-violet-800"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Supplements</h2>
            <div className="h-64">
              <DataVisualization 
                type="bar" 
                data={supplementData}
                config={{
                  desktop: { label: "Taken", color: "#7c3aed" },
                  mobile: { label: "Required", color: "#c4b5fd" }
                }}
              />
            </div>
          </div>

          {/* Weekly Overview Card */}
          <div 
            onClick={() => setActivePopup('overview')}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 cursor-pointer 
                     transition-all duration-300 shadow-lg hover:shadow-xl
                     border border-gray-100 dark:border-gray-700
                     hover:border-violet-200 dark:hover:border-violet-800"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Weekly Overview</h2>
            <div className="h-64 space-y-4">
              <div className="space-y-4">
                <div className="relative pt-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Workouts Completed</span>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">80%</span>
                  </div>
                  <div className="flex h-2 overflow-hidden bg-gray-200 rounded-full">
                    <div className="bg-violet-600" style={{ width: '80%' }}></div>
                  </div>
                </div>

                <div className="relative pt-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Goals Progress</span>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">65%</span>
                  </div>
                  <div className="flex h-2 overflow-hidden bg-gray-200 rounded-full">
                    <div className="bg-violet-600" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div className="relative pt-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Supplement Compliance</span>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">90%</span>
                  </div>
                  <div className="flex h-2 overflow-hidden bg-gray-200 rounded-full">
                    <div className="bg-violet-600" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popups */}
        <PopupDialog
          isOpen={activePopup === 'sessions'}
          onClose={() => setActivePopup(null)}
          title="Sessions Details"
        >
          <div className="h-96">
            <DataVisualization 
              type="line" 
              data={sessionsData}
              config={{
                desktop: { label: "Completed", color: "#7c3aed" },
                mobile: { label: "Target", color: "#c4b5fd" }
              }}
            />
          </div>
        </PopupDialog>

        <PopupDialog
          isOpen={activePopup === 'goals'}
          onClose={() => setActivePopup(null)}
          title="Goals Details"
        >
          <div className="h-96">
            <DataVisualization 
              type="bar" 
              data={goalsData}
              config={{
                desktop: { label: "Progress", color: "#7c3aed" },
                mobile: { label: "Target", color: "#c4b5fd" }
              }}
            />
          </div>
        </PopupDialog>

        <PopupDialog
          isOpen={activePopup === 'supplements'}
          onClose={() => setActivePopup(null)}
          title="Supplements Details"
        >
          <div className="h-96">
            <DataVisualization 
              type="bar" 
              data={supplementData}
              config={{
                desktop: { label: "Taken", color: "#7c3aed" },
                mobile: { label: "Required", color: "#c4b5fd" }
              }}
            />
          </div>
        </PopupDialog>

        <PopupDialog
          isOpen={activePopup === 'overview'}
          onClose={() => setActivePopup(null)}
          title="Weekly Overview"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-bold mb-2">Sessions</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Weekly Average</span>
                    <span>4.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Total</span>
                    <span>16</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-bold mb-2">Goals</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Completion Rate</span>
                    <span>70%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Goals</span>
                    <span>10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PopupDialog>
      </div>
    </div>
  );
}