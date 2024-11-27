import React, {act} from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {NewSession} from '../newSession';

jest.mock('@/components/forms/SessionForm', () => ({
  SessionForm: () => <div data-testid="session-form">Mocked Session Form</div>,
}));

describe('NewSession Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the "Add Session" button', () => {
    render(<NewSession />);

    const addSessionButton = screen.getByRole('button', {
      name: /\+ Add Session/i,
    });
    expect(addSessionButton).toBeInTheDocument();
  });

  test('opens the sheet when the button is clicked', () => {
    render(<NewSession />);

    const addSessionButton = screen.getByRole('button', {
      name: /\+ Add Session/i,
    });
    act(() => {
      fireEvent.click(addSessionButton);
    });

    const sheetTitle = screen.getByRole('heading', {name: /New Session/i});
    expect(sheetTitle).toBeInTheDocument();
  });

  test('renders the SessionForm component', () => {
    render(<NewSession />);

    const addSessionButton = screen.getByRole('button', {
      name: /\+ Add Session/i,
    });
    act(() => {
      fireEvent.click(addSessionButton);
    });

    const sessionForm = screen.getByTestId('session-form');
    expect(sessionForm).toBeInTheDocument();
  });

  test('adds and removes event listener for closeSessionSheet', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const {unmount} = render(<NewSession />);

    // Check that the event listener was added
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'closeSessionSheet',
      expect.any(Function),
    );

    // Check that the event listener was removed
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'closeSessionSheet',
      expect.any(Function),
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  test('closes the sheet when closeSessionSheet event is dispatched', () => {
    render(<NewSession />);

    // Open the sheet first
    const addSessionButton = screen.getByRole('button', {
      name: /\+ Add Session/i,
    });
    act(() => {
      fireEvent.click(addSessionButton);
    });

    // Verify sheet is open
    const sheetTitle = screen.getByRole('heading', {name: /New Session/i});
    expect(sheetTitle).toBeInTheDocument();

    // Dispatch the close event
    act(() => {
      const closeEvent = new Event('closeSessionSheet');
      window.dispatchEvent(closeEvent);
    });
  });
});
