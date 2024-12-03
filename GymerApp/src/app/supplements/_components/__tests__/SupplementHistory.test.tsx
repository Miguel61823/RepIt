import React from 'react';
import {render, screen} from '@testing-library/react';
import SupplementHistory from '../SupplementHistory';

jest.mock('../NewSupplement', () => ({
  NewSupplement: jest.fn(() => <div data-testid="new-supplement-component" />),
}));

jest.mock('../EditSupplement', () => ({
  EditSupplement: jest.fn(() => <div data-testid="edit-supplement" />),
}));

jest.mock('../SupplementCard', () => ({
  SupplementCard: jest.fn(({name}) => (
    <div data-testid="supplement-card">{name}</div>
  )),
}));

jest.mock('@/server/api/supplements', () => ({
  getSupplements: jest.fn(() =>
    Promise.resolve([
      {
        id: '1',
        name: 'Active Supplement',
        isActive: true,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        dosage: '10mg',
        frequency: 'Daily',
        instructions: 'Take with food',
      },
      {
        id: '2',
        name: 'Inactive Supplement',
        isActive: false,
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-06-30'),
        dosage: '5mg',
        frequency: 'Weekly',
        instructions: 'Take before bed',
      },
    ]),
  ),
  deleteSupplement: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  formatDate: jest.fn((date: Date) => {
    if (!date) return 'No date';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }),
}));

// Mock Date constructor
beforeAll(() => {
  const constantDate = new Date('2024-01-01');

  global.Date = class extends Date {
    constructor(...args: [] | [string | number | Date]) {
      args.length === 0 ? super(constantDate) : super(...args);
    }

    static now() {
      return constantDate.getTime();
    }
  } as any;
});

describe('SupplementHistory Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the page title correctly', async () => {
    render(await SupplementHistory());
    const pageTitle = screen.getByText('Supplement History');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveClass('text-3xl', 'font-bold');
  });

  test('renders NewSupplement component', async () => {
    render(await SupplementHistory());
    const newSupplementComponent = screen.getByTestId(
      'new-supplement-component',
    );
    expect(newSupplementComponent).toBeInTheDocument();
  });

  test('renders active supplements section', async () => {
    render(await SupplementHistory());

    const activeHeader = screen.getByText('Active Supplements');
    expect(activeHeader).toBeInTheDocument();

    const activeSupplementName = screen.getByText('Active Supplement');
    expect(activeSupplementName).toBeInTheDocument();
  });

  test('renders inactive supplements section', async () => {
    render(await SupplementHistory());

    const inactiveHeader = screen.getByText('Inactive Supplements');
    expect(inactiveHeader).toBeInTheDocument();

    const inactiveSupplementName = screen.getByText('Inactive Supplement');
    expect(inactiveSupplementName).toBeInTheDocument();
  });

  test('displays correct number of supplement cards', async () => {
    render(await SupplementHistory());

    const supplementCards = screen.getAllByTestId('supplement-card');
    expect(supplementCards).toHaveLength(2);
  });

  test('page has correct base layout classes', async () => {
    const {container} = render(await SupplementHistory());
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass(
      'min-h-screen',
      'bg-neutral-100',
      'dark:bg-gray-900',
    );
  });

  test('header has correct styling and structure', async () => {
    render(await SupplementHistory());
    const headerContainer = screen
      .getByText('Supplement History')
      .closest('div');
    expect(headerContainer).toHaveClass('max-w-7xl', 'mx-auto', 'py-6', 'px-4');
  });
});
