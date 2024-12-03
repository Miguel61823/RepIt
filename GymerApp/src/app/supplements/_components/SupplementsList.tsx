// components/SupplementsList.tsx
import {getSupplements} from '@/server/api/supplements';
import {SupplementCard} from './SupplementCard';

export const SupplementsList = async () => {
  const supplements = await getSupplements();
  
  const activeSupplements = supplements.filter(
    supplement => supplement.isActive,
  );
  
  const inactiveSupplements = supplements.filter(
    supplement => !supplement.isActive,
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="supplements-grid">
      {activeSupplements.length > 0 && (
        <>
          <h2 className="col-span-full text-xl font-bold">Active Supplements</h2>
          {activeSupplements.map((supplement) => (
            <SupplementCard
              key={supplement.id}
              {...supplement}
              data-testid="supplement-card"
            />
          ))}
        </>
      )}
      
      {inactiveSupplements.length > 0 && (
        <>
          <h2 className="col-span-full text-xl font-bold mt-6">Inactive Supplements</h2>
          {inactiveSupplements.map((supplement) => (
            <SupplementCard
              key={supplement.id}
              {...supplement}
              data-testid="supplement-card"
            />
          ))}
        </>
      )}
    </div>
  );
};
