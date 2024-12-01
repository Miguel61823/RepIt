import {GoalCard} from './GoalCard';
import {getGoalHistory} from '@/server/api/goals';

export const GoalsList = async () => {
  const results = await getGoalHistory();
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {results.map(goal => (
        <GoalCard key={goal.goal_id} {...goal} />
      ))}
    </div>
  );
};
