import React from 'react';
import {render, screen} from '@testing-library/react';
import {EditGoal} from '../EditGoal';
import {Goal} from '@/server/api/goals';

jest.mock('@/components/forms/EditGoalForm', () => ({
  EditGoalForm: (props: Goal) => <div data-testid="edit-goal-form" />,
}));

jest.mock('@/components/ui/sheet', () => ({
  Sheet: ({children}: {children: React.ReactNode}) => <div>{children}</div>,
  SheetContent: ({children}: {children: React.ReactNode}) => (
    <div>{children}</div>
  ),
  SheetTrigger: ({children}: {children: React.ReactNode}) => children,
  SheetHeader: ({children}: {children: React.ReactNode}) => (
    <div>{children}</div>
  ),
}));

describe('EditGoal Component', () => {
  const mockGoal: Goal = {
    goal_id: '1',
    title: 'Test Goal',
    description: 'Test Description',
    dueDate: new Date('2024-12-31'),
    completed: false,
  };

  test('renders edit goal button', () => {
    render(<EditGoal {...mockGoal} />);
    const editButton = screen.getByText('Edit');
    expect(editButton).toBeInTheDocument();
  });

  test('renders edit goal form', () => {
    render(<EditGoal {...mockGoal} />);
    const editForm = screen.getByTestId('edit-goal-form');
    expect(editForm).toBeInTheDocument();
  });

  test('displays correct sheet header', () => {
    render(<EditGoal {...mockGoal} />);
    const header = screen.getByText('Edit Goal');
    expect(header).toBeInTheDocument();
  });
});
