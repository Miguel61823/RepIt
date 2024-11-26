import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditSessionForm } from '../EditSessionForm';
import * as sessionsApi from '@/server/api/sessions';

// Mock the updateSession function
jest.mock('@/server/api/sessions', () => ({
  updateSession: jest.fn(),
}));

// Mock window.dispatchEvent
const mockDispatchEvent = jest.fn();
Object.defineProperty(window, 'dispatchEvent', {
  value: mockDispatchEvent,
});

describe('EditSessionForm', () => {
  const mockSession = {
    session_id: '1',
    name: 'Test Session',
    type: 'Training',
    date: new Date('2024-01-01'),
    session_data: 'Initial session data',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with initial values', () => {
    render(<EditSessionForm {...mockSession} />);

    // Check if form fields are populated with initial values
    expect(screen.getByLabelText('Session Name')).toHaveValue('Test Session');
    expect(screen.getByLabelText('Session Type')).toHaveValue('Training');
    expect(screen.getByText('December 31st, 2023')).toBeInTheDocument(); // local timezone of Date
    expect(screen.getByLabelText('Session Data')).toHaveValue('Initial session data');
  });


  test('handles tab key in textarea', () => {
    render(<EditSessionForm {...mockSession} />);

    const textarea = screen.getByLabelText('Session Data');
    
    // Simulate tab key press
    fireEvent.keyDown(textarea, { key: 'Tab', preventDefault: () => {} });

    // Check if 4 spaces were added
    expect(textarea).toHaveValue('    Initial session data');
  });

  test('handles form submission successfully', async () => {
    (sessionsApi.updateSession as jest.Mock).mockResolvedValue({});

    render(<EditSessionForm {...mockSession} />);

    // Update some fields
    await userEvent.clear(screen.getByLabelText('Session Name'));
    await userEvent.type(screen.getByLabelText('Session Name'), 'Updated Session');

    // Submit the form
    const submitButton = screen.getByText('Save Session');
    fireEvent.click(submitButton);

    // Wait for update session to be called
    await waitFor(() => {
      expect(sessionsApi.updateSession).toHaveBeenCalledWith('1', {
        name: 'Updated Session',
        type: 'Training',
        date: mockSession.date,
        session_data: 'Initial session data',
      });
    });

    // Check if close event was dispatched
    expect(mockDispatchEvent).toHaveBeenCalledWith(expect.any(Event));
  });

  test('handles form submission error', async () => {
    (sessionsApi.updateSession as jest.Mock).mockResolvedValue({ error: true });
    render(<EditSessionForm {...mockSession} />);

    // Submits form
    const submitButton = screen.getByText('Save Session');
    fireEvent.click(submitButton);

    // Wait for error to be set
    await waitFor(() => {
      const errorElement = screen.getByText(/Edit Session Error\. :\(/i);
      expect(errorElement).toBeInTheDocument();
    });
  });
  test('validates form inputs', async () => {
    render(<EditSessionForm {...mockSession} />);

    // Clear required fields
    await userEvent.clear(screen.getByLabelText('Session Name'));

    // Submit the form
    const submitButton = screen.getByText('Save Session');
    fireEvent.click(submitButton);

    // Check for validation error
    await waitFor(() => {
      const errorMessages = screen.queryAllByText(/name is required/i);
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });
});
