// components/SessionsList.tsx
import {SessionCard} from './sessionCard';
import {getSessionHistory} from '@/server/api/sessions';

export const SessionsList = async () => {
  const results = await getSessionHistory();
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {results.map(session => (
        <SessionCard key={session.session_id} {...session} />
      ))}
    </div>
  );
};
