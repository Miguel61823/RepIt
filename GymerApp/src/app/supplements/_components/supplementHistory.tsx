// src/app/supplements/_components/supplementHistory.tsx
import {NewSupplement} from './newSupplement';
import {SupplementsList} from './SupplementsList';

const SupplementHistory = async () => {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-gray-900">
      <header className="bg-neutral-100 dark:bg-gray-900">
        <div className="max-w-7xl bg-neutral-100 dark:bg-gray-900 mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
            Supplement History
          </h1>
          <NewSupplement />
        </div>
      </header>
      <main className="mt-6">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <SupplementsList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupplementHistory;
