import React from 'react';
import { render, screen } from '@testing-library/react';
import GoalHistoryPage from '../GoalHistory';
import { getGoalHistory } from '@/server/api/goals';

jest.mock('@/server/api/goals', () => ({
  getGoalHistory: jest.fn(),
}));

jest.mock('../goalCard', () => ({
  GoalCard: ({ title }: { title: string }) => <div data-testid="goal-card">{title}</div>,
}));

jest.mock('../newGoal', () => ({
  NewGoal: () => <div data-testid="new-goal-component" />,
}));

describe('GoalHistoryPage Component', () => {
  const mockGoals = [
    { id: '1', title: 'Past Due Goal', description: 'Test', dueDate: new Date('2023-01-01'), completed: false },
    { id: '2', title: 'This Week Goal', description: 'Test', dueDate: new Date(), completed: false },
    { id: '3', title: 'Upcoming Goal', description: 'Test', dueDate: new Date('2025-01-01'), completed: false },
    { id: '4', title: 'Completed Goal', description: 'Test', dueDate: new Date(), completed: true },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getGoalHistory as jest.Mock).mockResolvedValue(mockGoals);
  });

  test('renders the page title correctly', async () => {
    render(await GoalHistoryPage());
    const pageTitle = screen.getByText('Goal History');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveClass('text-3xl', 'font-bold');
  });

  test('renders NewGoal component', async () => {
    render(await GoalHistoryPage());
    const newGoalComponent = screen.getByTestId('new-goal-component');
    expect(newGoalComponent).toBeInTheDocument();
  });

  test('renders goal cards for each category', async () => {
    render(await GoalHistoryPage());
    const goalCards = screen.getAllByTestId('goal-card');
    expect(goalCards).toHaveLength(4);
  });

  test('displays correct headers for each goal category', async () => {
    render(await GoalHistoryPage());
    expect(screen.getByText('Past Due')).toBeInTheDocument();
    expect(screen.getByText('Due This Week')).toBeInTheDocument();
    expect(screen.getByText('Upcoming')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  test('handles empty goal list', async () => {
    (getGoalHistory as jest.Mock).mockResolvedValue([]);
    render(await GoalHistoryPage());
    expect(screen.getByText('No past due goals')).toBeInTheDocument();
    expect(screen.getByText('No goals due this week')).toBeInTheDocument();
    expect(screen.getByText('No upcoming goals')).toBeInTheDocument();
    expect(screen.getByText('No completed goals')).toBeInTheDocument();
  });

  test('page has correct base layout classes', async () => {
    const { container } = render(await GoalHistoryPage());
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-neutral-100', 'dark:bg-gray-900');
  });

  test('header has correct styling and structure', async () => {
    render(await GoalHistoryPage());
    const headerContainer = screen.getByText('Goal History').closest('div');
    expect(headerContainer).toHaveClass('max-w-7xl', 'mx-auto', 'py-6', 'px-4');
  });
});
