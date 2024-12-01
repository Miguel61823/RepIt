import React from 'react';
import { render, screen } from '@testing-library/react';
import { GoalsList } from '../GoalsList';
import { getGoalHistory } from '@/server/api/goals';

jest.mock('@/server/api/goals', () => ({
  getGoalHistory: jest.fn(),
}));

jest.mock('../goalCard', () => ({
  GoalCard: ({ title }: { title: string }) => <div data-testid="goal-card">{title}</div>,
}));

describe('GoalsList Component', () => {
  const mockGoals = [
    { id: '1', title: 'Goal 1', description: 'Description 1', dueDate: new Date('2023-06-15'), completed: false },
    { id: '2', title: 'Goal 2', description: 'Description 2', dueDate: new Date('2023-06-16'), completed: true },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders goals when data is available', async () => {
    (getGoalHistory as jest.Mock).mockResolvedValue(mockGoals);
    render(await GoalsList());

    const goalCards = await screen.findAllByTestId('goal-card');
    expect(goalCards).toHaveLength(2);

    expect(screen.getByText('Goal 1')).toBeInTheDocument();
    expect(screen.getByText('Goal 2')).toBeInTheDocument();
  });

  test('renders with correct grid layout', async () => {
    (getGoalHistory as jest.Mock).mockResolvedValue(mockGoals);
    const { container } = render(await GoalsList());

    const gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass('grid');
    expect(gridContainer).toHaveClass('gap-6');
    expect(gridContainer).toHaveClass('md:grid-cols-2');
    expect(gridContainer).toHaveClass('lg:grid-cols-3');
  });

  test('handles empty goal list', async () => {
    (getGoalHistory as jest.Mock).mockResolvedValue([]);
    const { container } = render(await GoalsList());

    const goalCards = screen.queryAllByTestId('goal-card');
    expect(goalCards).toHaveLength(0);

    const gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass('grid');
  });

  test('handles API error', async () => {
    (getGoalHistory as jest.Mock).mockRejectedValue(new Error('Failed to fetch goals'));
    await expect(GoalsList()).rejects.toThrow('Failed to fetch goals');
  });
});
