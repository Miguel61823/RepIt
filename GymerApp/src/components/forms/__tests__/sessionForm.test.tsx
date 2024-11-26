import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SessionForm } from '../SessionForm';
import { createSession } from '@/server/api/sessions';

// Mock the createSession function
jest.mock('@/server/api/sessions', () => ({
  createSession: jest.fn(),
}));

// Mock the window.dispatchEvent
const mockDispatchEvent = jest.fn();
Object.defineProperty(window, 'dispatchEvent', {
  value: mockDispatchEvent,
});

describe('SessionForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all form fields', () => {
    render(<SessionForm />);

    expect(screen.getByLabelText(/Session Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Session Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Session Data/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save Session/i })).toBeInTheDocument();
  });

  test('handles tab key in textarea to insert spaces', () => {
    render(<SessionForm />);
    const textarea = screen.getByLabelText(/Session Data/i);

    fireEvent.keyDown(textarea, { key: 'Tab', preventDefault: jest.fn() });

    expect(textarea).toHaveValue('    ');
  });

  test('submits form with valid data', async () => {
    (createSession as jest.Mock).mockResolvedValue({ id: '123' });
    render(<SessionForm />);

    // Fills and submits form
    await userEvent.type(screen.getByLabelText(/Session Name/i), 'Test Session');
    await userEvent.type(screen.getByLabelText(/Session Type/i), 'Training');
    await userEvent.type(screen.getByLabelText(/Session Data/i), 'Some session data');
    fireEvent.click(screen.getByRole('button', { name: /Save Session/i }));

    // Wait for form submission
    await waitFor(() => {
      expect(createSession).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Test Session',
        type: 'Training',
        session_data: 'Some session data',
      }));

      expect(mockDispatchEvent).toHaveBeenCalledWith(expect.any(Event));

      const calledEvent = mockDispatchEvent.mock.calls[0][0];
      expect(calledEvent.type).toBe('closeSessionSheet');
    });
  });

  test('shows error when session creation fails', async () => {
    (createSession as jest.Mock).mockResolvedValue({ error: true });
    render(<SessionForm />);

    // Fills and submits form
    await userEvent.type(screen.getByLabelText(/Session Name/i), 'Test Session');
    await userEvent.type(screen.getByLabelText(/Session Type/i), 'Training');
    await userEvent.type(screen.getByLabelText(/Session Data/i), 'Some session data');
    fireEvent.click(screen.getByRole('button', { name: /Save Session/i }));

    // Wait and check for error
    await waitFor(() => {
      const errorElements = screen.getAllByText(/error/i);
      expect(errorElements.length).toBeGreaterThan(0);
    });
  });

  test('validates form fields', async () => {
    render(<SessionForm />);

    // Submits empty form
    fireEvent.click(screen.getByRole('button', { name: /Save Session/i }));

    // Check for validation messages
    await waitFor(() => {
      const nameError = screen.getByText(/Name is required/i);
      const typeError = screen.getByText(/Type is required/i);
      
      expect(nameError).toBeInTheDocument();
      expect(typeError).toBeInTheDocument();
    });
  });
});
