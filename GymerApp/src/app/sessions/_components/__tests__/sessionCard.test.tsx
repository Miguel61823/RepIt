import React, {act} from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {SessionCard} from '../sessionCard';
import {deleteSession} from '@/server/api/sessions';
import {formatDate} from '@/lib/utils';

// Mock the dependencies
jest.mock('@/server/api/sessions', () => ({
  deleteSession: jest.fn(),
}));
jest.mock('@/lib/utils', () => ({
  cn: jest.fn((...classes) => classes.filter(Boolean).join(' ')),
  formatDate: jest.fn(),
}));

jest.mock('../editSession', () => ({
  EditSession: () => <div data-testid="edit-session">Edit Session</div>,
}));

describe('SessionCard Component', () => {
  const mockSession = {
    session_id: '1',
    type: 'Strength',
    name: 'Leg Day',
    date: new Date('2023-06-15'),
    session_data: 'Squats: 4x10\nDeadlifts: 3x8',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (formatDate as jest.Mock).mockReturnValue('June 15, 2023');
  });

  test('renders session card with correct information', () => {
    render(<SessionCard {...mockSession} />);

    expect(screen.getByText(mockSession.name)).toBeInTheDocument();
    expect(screen.getByText(mockSession.type)).toBeInTheDocument();
    expect(screen.getByText('June 15, 2023')).toBeInTheDocument();

    expect(
      screen.getByText(/Squats: 4x10\s*Deadlifts: 3x8/),
    ).toBeInTheDocument();
  });

  test('renders edit session component', () => {
    render(<SessionCard {...mockSession} />);

    const editSessionComponent = screen.getByTestId('edit-session');
    expect(editSessionComponent).toBeInTheDocument();
  });

  test('opens delete confirmation dialog', () => {
    render(<SessionCard {...mockSession} />);

    // Find and click the delete button
    const deleteButton = screen.getByRole('button', {name: /delete/i});
    fireEvent.click(deleteButton);

    // Check if alert dialog elements are present
    expect(screen.getByText(/are you absolutely sure\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(/this action cannot be undone/i),
    ).toBeInTheDocument();
  });

  test('calls deleteSession when confirmation is clicked', () => {
    render(<SessionCard {...mockSession} />);

    // Open delete confirmation
    const deleteButton = screen.getByRole('button', {name: /delete/i});
    fireEvent.click(deleteButton);

    // Find and click the confirmation button
    const confirmButton = screen.getByRole('button', {name: /yes, i am sure/i});

    act(() => {
      fireEvent.click(confirmButton);
    });

    // Check if deleteSession was called with correct session_id
    expect(deleteSession).toHaveBeenCalledWith(mockSession.session_id);
  });

  test('allows canceling the delete action', () => {
    render(<SessionCard {...mockSession} />);

    // Open delete confirmation
    const deleteButton = screen.getByRole('button', {name: /delete/i});
    fireEvent.click(deleteButton);

    // Find and click the cancel button
    const cancelButton = screen.getByRole('button', {name: /cancel/i});

    act(() => {
      fireEvent.click(cancelButton);
    });

    // Ensure deleteSession was not called
    expect(deleteSession).not.toHaveBeenCalled();
  });

  test('formats date correctly', () => {
    render(<SessionCard {...mockSession} />);

    // Verify formatDate was called with the correct date
    expect(formatDate).toHaveBeenCalledWith(mockSession.date);
    expect(screen.getByText('June 15, 2023')).toBeInTheDocument();
  });
});
