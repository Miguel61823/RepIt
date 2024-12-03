import React from 'react';
import {render, screen} from '@testing-library/react';
import {EditSupplement} from '../EditSupplement';
import {Supplement} from '@/server/api/supplements';

jest.mock('@/components/forms/EditSupplementForm', () => ({
  EditSupplementForm: (props: Supplement) => (
    <div data-testid="edit-supplement-form" />
  ),
}));

jest.mock('@/components/ui/sheet', () => ({
  Sheet: ({children}: {children: React.ReactNode}) => <div>{children}</div>,
  SheetTrigger: ({children}: {children: React.ReactNode}) => (
    <div>{children}</div>
  ),
  SheetContent: ({children}: {children: React.ReactNode}) => (
    <div>{children}</div>
  ),
  SheetHeader: ({children}: {children: React.ReactNode}) => (
    <div>{children}</div>
  ),
  SheetTitle: ({children}: {children: React.ReactNode}) => (
    <div>{children}</div>
  ),
}));

describe('EditSupplement Component', () => {
  const mockSupplement: Supplement = {
    id: '1',
    name: 'Vitamin D',
    dosage: '1000 IU',
    frequency: 'Daily',
    instructions: 'Take with food',
    startDate: new Date('2024-01-01'),
    endDate: null,
    isActive: true,
  };

  test('renders edit supplement form', () => {
    render(<EditSupplement supplement={mockSupplement} />);
    const editForm = screen.getByTestId('edit-supplement-form');
    expect(editForm).toBeInTheDocument();
  });

  test('displays correct sheet header', () => {
    render(<EditSupplement supplement={mockSupplement} />);
    const header = screen.getByText('Edit Supplement');
    expect(header).toBeInTheDocument();
  });
});
