import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GoalCard } from '../GoalCard';
import { deleteGoal, toggleGoalCompletion } from '@/server/api/goals';
import { formatDate } from '@/lib/utils';

jest.mock('@/server/api/goals', () => ({
  deleteGoal: jest.fn(),
  toggleGoalCompletion: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  formatDate: jest.fn(),
}));

jest.mock('../editGoal', () => ({
  EditGoal: () => <div data-testid="edit-goal" />,
}));

describe('GoalCard Component', () => {
  const mockGoal = {
    goal_id: '1',
    title: 'Test Goal',
    description: 'Test Description',
    dueDate: new Date('2024-12-31'),
    completed: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (formatDate as jest.Mock).mockReturnValue('December 31, 2024');
  });

  test('renders goal card with correct information', () => {
    render(<GoalCard {...mockGoal} />);
    expect(screen.getByText('Test Goal')).toBeInTheDocument();
    expect(screen.getByText('Due: December 31, 2024')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('calls toggleGoalCompletion when completion button is clicked', () => {
    render(<GoalCard {...mockGoal} />);
    const completeButton = screen.getByText('Mark as Complete');
    fireEvent.click(completeButton);
    expect(toggleGoalCompletion).toHaveBeenCalledWith('1');
  });

  test('renders "Completed" button when goal is completed', () => {
    render(<GoalCard {...mockGoal} completed={true} />);
    const completedButton = screen.getByText('Completed');
    expect(completedButton).toBeInTheDocument();
    expect(completedButton).toHaveClass('bg-green-500');
    expect(completedButton).toHaveClass('text-white');
  });

  test('renders EditGoal component', () => {
    render(<GoalCard {...mockGoal} />);
    expect(screen.getByTestId('edit-goal')).toBeInTheDocument();
  });

  test('opens delete confirmation dialog when delete button is clicked', () => {
    render(<GoalCard {...mockGoal} />);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(screen.getByText('Are you absolutely sure?')).toBeInTheDocument();
  });

  test('calls deleteGoal when delete confirmation is confirmed', () => {
    render(<GoalCard {...mockGoal} />);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    const confirmButton = screen.getByText('Yes, I am sure');
    fireEvent.click(confirmButton);
    expect(deleteGoal).toHaveBeenCalledWith('1');
  });
});
