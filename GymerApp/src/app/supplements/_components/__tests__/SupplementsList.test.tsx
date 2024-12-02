import React from 'react';
import {render, screen} from '@testing-library/react';
import {SupplementsList} from '../SupplementsList';
import {getSupplements} from '@/server/api/supplements';

jest.mock('@/server/api/supplements', () => ({
  getSupplements: jest.fn(),
}));

jest.mock('../SupplementCard', () => ({
  SupplementCard: ({name}: {name: string}) => (
    <div data-testid="supplement-card">{name}</div>
  ),
}));

describe('SupplementsList Component', () => {
  const mockSupplements = [
    {
      id: '1',
      name: 'Vitamin D',
      dosage: '1000 IU',
      frequency: 'Daily',
      instructions: 'Take with food',
      startDate: new Date('2023-06-15'),
      endDate: null,
      isActive: true,
    },
    {
      id: '2',
      name: 'Protein Powder',
      dosage: '25g',
      frequency: 'Post-workout',
      instructions: 'Mix with water or milk',
      startDate: new Date('2023-06-16'),
      endDate: null,
      isActive: true,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders supplements when data is available', async () => {
    (getSupplements as jest.Mock).mockResolvedValue(mockSupplements);
    render(await SupplementsList());

    const supplementCards = await screen.findAllByTestId('supplement-card');
    expect(supplementCards).toHaveLength(2);

    expect(screen.getByText('Vitamin D')).toBeInTheDocument();
    expect(screen.getByText('Protein Powder')).toBeInTheDocument();
  });

  test('renders with correct grid layout', async () => {
    (getSupplements as jest.Mock).mockResolvedValue(mockSupplements);
    const {container} = render(await SupplementsList());

    const gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass('grid');
    expect(gridContainer).toHaveClass('gap-6');
    expect(gridContainer).toHaveClass('md:grid-cols-2');
    expect(gridContainer).toHaveClass('lg:grid-cols-3');
  });

  test('handles empty supplement list', async () => {
    (getSupplements as jest.Mock).mockResolvedValue([]);
    const {container} = render(await SupplementsList());

    const supplementCards = screen.queryAllByTestId('supplement-card');
    expect(supplementCards).toHaveLength(0);

    const gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass('grid');
  });

  test('handles API error', async () => {
    (getSupplements as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch supplements'),
    );
    await expect(SupplementsList()).rejects.toThrow(
      'Failed to fetch supplements',
    );
  });
});
