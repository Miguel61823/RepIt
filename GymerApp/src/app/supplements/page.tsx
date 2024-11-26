// src/app/supplements/page.tsx
import SupplementHistory from './_components/supplementHistory';

const SupplementsPage = () => {
  return (
    <div className="container flex-grow mx-auto dark:bg-gray-900 bg-neutral-200 mt-8 px-4">
      <SupplementHistory />
    </div>
  );
};

export default SupplementsPage;
