// src/app/supplements/_components/supplementHistory.tsx
import { getSupplements } from '@/server/api/supplements';
import { SupplementCard } from './supplementCard';
import { NewSupplement } from './newSupplement';

const SupplementHistory = async () => {
  const supplements = await getSupplements();

  const activeSupplements = supplements.filter(supplement => supplement.isActive);
  const inactiveSupplements = supplements.filter(supplement => !supplement.isActive);

  return (
    <div>
      <header>
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
          Supplement History
        </h1>
        <NewSupplement />
      </header>
      <main className="mt-6">
        <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Active Supplements</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {activeSupplements.map(supplement => (
            <SupplementCard key={supplement.id} {...supplement} />
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Inactive Supplements</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {inactiveSupplements.map(supplement => (
            <SupplementCard key={supplement.id} {...supplement} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default SupplementHistory;
