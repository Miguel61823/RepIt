import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {NewSupplement} from '../NewSupplement';

// Mock the SupplementForm component
jest.mock('@/components/forms/SupplementForm', () => ({
  SupplementForm: () => <div data-testid="supplement-form">Mocked Form</div>
}));

// Mock the Sheet components
jest.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('NewSupplement Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the "Add Supplement" button', () => {
    render(<NewSupplement />);
    const addButton = screen.getByText('+ Add Supplement');
    expect(addButton).toBeInTheDocument();
  });

  test('opens sheet when "Add Supplement" button is clicked', () => {
    render(<NewSupplement />);
    const addButton = screen.getByText('+ Add Supplement');
    fireEvent.click(addButton);
    const sheetHeader = screen.getByText('New Supplement');
    expect(sheetHeader).toBeInTheDocument();
  });

  test('renders supplement form when sheet is opened', () => {
    render(<NewSupplement />);
    const addButton = screen.getByText('+ Add Supplement');
    fireEvent.click(addButton);
    const supplementForm = screen.getByTestId('supplement-form');
    expect(supplementForm).toBeInTheDocument();
  });
});
