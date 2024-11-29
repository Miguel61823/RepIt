// components/SessionsList.tsx
import {SessionCard} from './sessionCard';
import {getSessionHistory} from '@/server/api/sessions';

/**
 * The `SessionsList` component fetches and displays a grid of session cards, representing the user's session history.
 *
 * @returns {Promise<JSX.Element>} A grid layout of `SessionCard` components populated with session data.
 *
 */
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
