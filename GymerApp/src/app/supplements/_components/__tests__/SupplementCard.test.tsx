import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {SupplementCard} from '../SupplementCard';
import {deleteSupplement} from '@/server/api/supplements';
import {formatDate} from '@/lib/utils';

jest.mock('@/server/api/supplements', () => ({
  deleteSupplement: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  cn: jest.fn((...classes) => classes.filter(Boolean).join(' ')),
  formatDate: jest.fn(),
}));

jest.mock('../EditSupplement', () => ({
  EditSupplement: () => <div data-testid="edit-supplement" />,
}));

describe('SupplementCard Component', () => {
  const mockSupplement = {
    id: '1',
    name: 'Vitamin D',
    dosage: '1000 IU',
    frequency: 'Daily',
    instructions: 'Take with food',
    startDate: new Date('2024-01-01'),
    endDate: null,
    isActive: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (formatDate as jest.Mock).mockReturnValue('January 1, 2024');
  });

  test('renders supplement card with correct information', () => {
    render(<SupplementCard {...mockSupplement} />);
    expect(screen.getByText('Vitamin D')).toBeInTheDocument();
    expect(screen.getByText('1000 IU')).toBeInTheDocument();
    expect(screen.getByText('Daily')).toBeInTheDocument();
    expect(screen.getByText('Take with food')).toBeInTheDocument();
    expect(screen.getByText('January 1, 2024')).toBeInTheDocument();
  });

  test('calls deleteSupplement when delete button is clicked', async () => {
    render(<SupplementCard {...mockSupplement} />);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(deleteSupplement).toHaveBeenCalledWith('1');
  });

  test('renders EditSupplement component', () => {
    render(<SupplementCard {...mockSupplement} />);
    expect(screen.getByTestId('edit-supplement')).toBeInTheDocument();
  });
});
