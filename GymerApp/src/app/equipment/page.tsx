'use client'; // Add this at the top

import React, {useState} from 'react';

const GymMachineSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  return (
    <div>
      {/* Trigger Button */}
      <button
        onClick={openSidebar}
        className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200"
      >
        Add Machine
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-xl bg-black transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">New Machine</h1>
            <button
              onClick={closeSidebar}
              className="text-2xl text-white hover:text-gray-300"
            >
              &times;
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-lg block mb-2 text-white">
                Machine Name
              </label>
              <input
                type="text"
                placeholder="Enter machine name"
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-white text-white"
              />
            </div>

            <div>
              <label className="text-lg block mb-2 text-white">
                Description
              </label>
              <textarea
                placeholder="Describe the machine (optional)"
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-white text-white h-24"
              />
            </div>

            <div>
              <label className="text-lg block mb-2 text-white">Location</label>
              <input
                type="text"
                placeholder="Machine location in gym"
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-white text-white"
              />
            </div>

            <div>
              <label className="text-lg block mb-2 text-white">Note</label>
              <input
                type="text"
                placeholder="Add a note"
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-white text-white"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={closeSidebar}
                className="px-6 py-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 text-white"
              >
                Cancel
              </button>
              <button
                onClick={closeSidebar}
                className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200"
              >
                Submit Machine
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymMachineSidebar;
