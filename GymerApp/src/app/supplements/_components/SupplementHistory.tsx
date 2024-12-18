// src/app/supplements/_components/supplementHistory.tsx
import {getSupplements} from '@/server/api/supplements';
import {SupplementCard} from './SupplementCard';
import {NewSupplement} from './NewSupplement';

const SupplementHistory = async () => {
  const supplements = await getSupplements();

  const activeSupplements = supplements.filter(
    supplement => supplement.isActive,
  );
  const inactiveSupplements = supplements.filter(
    supplement => !supplement.isActive,
  );

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
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
              Active Supplements
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {activeSupplements.map(supplement => (
                <SupplementCard key={supplement.id} {...supplement} />
              ))}
            </div>

            <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
              Inactive Supplements
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {inactiveSupplements.map(supplement => (
                <SupplementCard key={supplement.id} {...supplement} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupplementHistory;
