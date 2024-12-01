import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NewGoal } from '../newGoal';

jest.mock('@/components/forms/GoalForm', () => ({
  GoalForm: () => <div data-testid="goal-form" />,
}));

describe('NewGoal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the "Add Goal" button', () => {
    render(<NewGoal />);
    const addButton = screen.getByText('Add Goal');
    expect(addButton).toBeInTheDocument();
  });

  test('opens sheet when "Add Goal" button is clicked', () => {
    render(<NewGoal />);
    const addButton = screen.getByText('Add Goal');
    fireEvent.click(addButton);
    const sheetHeader = screen.getByText('New Goal');
    expect(sheetHeader).toBeInTheDocument();
  });

  test('renders goal form when sheet is opened', () => {
    render(<NewGoal />);
    const addButton = screen.getByText('Add Goal');
    fireEvent.click(addButton);
    const goalForm = screen.getByTestId('goal-form');
    expect(goalForm).toBeInTheDocument();
  });

  test('closes sheet when closeGoalSheet event is fired', () => {
    render(<NewGoal />);
    const addButton = screen.getByText('Add Goal');
    fireEvent.click(addButton);
    
    let sheetHeader = screen.getByText('New Goal');
    expect(sheetHeader).toBeInTheDocument();

    window.dispatchEvent(new Event('closeGoalSheet'));

    sheetHeader = screen.queryByText('New Goal')!;
    expect(sheetHeader).not.toBeInTheDocument();
  });
});
