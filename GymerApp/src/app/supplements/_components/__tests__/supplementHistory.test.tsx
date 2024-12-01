import React from 'react';
import { render, screen } from '@testing-library/react';
import SupplementHistory from '../supplementHistory';

jest.mock('../newSupplement', () => ({
  NewSupplement: jest.fn(() => <div data-testid="new-supplement-component" />),
}));

jest.mock('../supplementsList', () => ({
  SupplementsList: jest.fn(() => <div data-testid="supplements-list-component" />),
}));

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
    const newSupplementComponent = screen.getByTestId('new-supplement-component');
    expect(newSupplementComponent).toBeInTheDocument();
  });

  test('renders SupplementsList component', async () => {
    render(await SupplementHistory());
    const supplementsListComponent = screen.getByTestId('supplements-list-component');
    expect(supplementsListComponent).toBeInTheDocument();
  });

  test('page has correct base layout classes', async () => {
    const { container } = render(await SupplementHistory());
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-neutral-100', 'dark:bg-gray-900');
  });

  test('header has correct styling and structure', async () => {
    render(await SupplementHistory());
    const headerContainer = screen.getByText('Supplement History').closest('div');
    expect(headerContainer).toHaveClass('max-w-7xl', 'mx-auto', 'py-6', 'px-4');
  });
});