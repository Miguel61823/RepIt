import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import {NewGoal} from '../NewGoal';

jest.mock('@/components/forms/GoalForm', () => ({
  GoalForm: () => <div data-testid="goal-form">Mock Goal Form</div>,
}));

describe('NewGoal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the "Add Goal" button', () => {
    render(<NewGoal />);
    const addButton = screen.getByText('+ Add Goal');
    expect(addButton).toBeInTheDocument();
  });

  test('opens sheet when "Add Goal" button is clicked', () => {
    render(<NewGoal />);
    const addButton = screen.getByText('+ Add Goal');
    fireEvent.click(addButton);
    const sheetHeader = screen.getByText('New Goal');
    expect(sheetHeader).toBeInTheDocument();
  });

  test('renders goal form when sheet is opened', () => {
    render(<NewGoal />);
    const addButton = screen.getByText('+ Add Goal');
    fireEvent.click(addButton);
    const goalForm = screen.getByTestId('goal-form');
    expect(goalForm).toBeInTheDocument();
  });

  test('closes sheet when closeGoalSheet event is fired', async () => {
    render(<NewGoal />);

    // Open the sheet first
    fireEvent.click(screen.getByText('+ Add Goal'));
    expect(screen.getByText('New Goal')).toBeInTheDocument();

    // Dispatch the close event
    window.dispatchEvent(new Event('closeGoalSheet'));

    // Use waitForElementToBeRemoved or add a small delay
    await waitForElementToBeRemoved(() => screen.queryByText('New Goal'));
  });
});
