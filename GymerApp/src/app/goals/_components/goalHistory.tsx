import { getGoalHistory } from '@/server/api/goals';
import { GoalCard } from './goalCard';
import { NewGoal } from './newGoal';

const GoalHistoryPage = async () => {
  const goals = await getGoalHistory();

  const today = new Date();
  const pastDueGoals = goals.filter(goal => new Date(goal.dueDate) < today && !goal.completed);
  const dueThisWeekGoals = goals.filter(goal => {
    const dueDate = new Date(goal.dueDate);
    return dueDate >= today && dueDate <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  });
  const upcomingGoals = goals.filter(goal => new Date(goal.dueDate) > today);

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-gray-900">
      <header className="bg-neutral-100 dark:bg-gray-900">
        <div className="max-w-7xl bg-neutral-100 dark:bg-gray-900 mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
            Fitness Goals
          </h1>
          <NewGoal />
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Past Due</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {pastDueGoals.map(goal => (
                <GoalCard key={goal.goal_id} {...goal} />
              ))}
            </div>

            <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Due This Week</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {dueThisWeekGoals.map(goal => (
                <GoalCard key={goal.goal_id} {...goal} />
              ))}
            </div>

            <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Upcoming Goals</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingGoals.map(goal => (
                <GoalCard key={goal.goal_id} {...goal} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GoalHistoryPage;