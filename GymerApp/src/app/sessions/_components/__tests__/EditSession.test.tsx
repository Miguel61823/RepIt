import React from 'react';
import {render, screen} from '@testing-library/react';
import {EditSession} from '../EditSession';
import {Session} from '@/server/api/sessions';

jest.mock('@/components/forms/EditSessionForm', () => ({
  EditSessionForm: (props: Session) => (
    <div data-testid="edit-session-form">{JSON.stringify(props)}</div>
  ),
}));

// Mock the Sheet and SheetContent components to always render children
jest.mock('@/components/ui/sheet', () => ({
  Sheet: ({children}: {children: React.ReactNode}) => (
    <div data-testid="sheet">{children}</div>
  ),
  SheetContent: ({children}: {children: React.ReactNode}) => (
    <div data-testid="sheet-content">{children}</div>
  ),
  SheetTrigger: ({children}: {children: React.ReactNode}) => children,
  SheetHeader: ({children}: {children: React.ReactNode}) => (
    <div>{children}</div>
  ),
  SheetTitle: ({children}: {children: React.ReactNode}) => (
    <div>{children}</div>
  ),
  SheetDescription: ({children}: {children: React.ReactNode}) => (
    <div>{children}</div>
  ),
}));

describe('EditSession Component', () => {
  const mockSession = {
    session_id: '1',
    name: 'Test Session',
    type: 'Training',
    date: new Date('2024-01-01'),
    session_data: 'Initial session data',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    window.removeEventListener = jest.fn();
  });

  test('renders edit button', () => {
    render(<EditSession {...mockSession} />);

    const editButton = screen.getByRole('button', {name: /edit/i});
    expect(editButton).toBeInTheDocument();
  });

  test('adds and removes window event listener for closeEditSessionSheet', () => {
    const addEventListener = jest.spyOn(window, 'addEventListener');
    const removeEventListener = jest.spyOn(window, 'removeEventListener');

    const {unmount} = render(<EditSession {...mockSession} />);

    // Check that event listener was added
    expect(addEventListener).toHaveBeenCalledWith(
      'closeEditSessionSheet',
      expect.any(Function),
    );

    // Unmount and check that event listener was removed
    unmount();
    expect(removeEventListener).toHaveBeenCalledWith(
      'closeEditSessionSheet',
      expect.any(Function),
    );
  });

  test('renders EditSessionForm with correct props', () => {
    // Use a spy to force isOpen to be true
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(() => [true, jest.fn()]);

    render(<EditSession {...mockSession} />);

    const editSessionForm = screen.getByTestId('edit-session-form');
    expect(editSessionForm).toBeInTheDocument();

    // Check that the form receives the correct session props
    expect(editSessionForm).toHaveTextContent(JSON.stringify(mockSession));

    useStateSpy.mockRestore();
  });

  test('sheet content contains correct title', () => {
    render(<EditSession {...mockSession} />);

    const sheetTitle = screen.getByText('Edit Session');
    expect(sheetTitle).toBeInTheDocument();
  });
});
