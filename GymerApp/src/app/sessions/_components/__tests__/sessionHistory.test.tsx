import React from 'react';
import {render, screen} from '@testing-library/react';
import SessionHistory from '../SessionHistory';

jest.mock('../newSession', () => ({
  NewSession: jest.fn(() => (
    <div data-testid="new-session-component">New Session</div>
  )),
}));

jest.mock('../sessionsList', () => ({
  SessionsList: jest.fn(() => (
    <div data-testid="sessions-list-component">Sessions List</div>
  )),
}));

describe('SessionHistory Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the page title correctly', async () => {
    render(await SessionHistory());

    const pageTitle = screen.getByText('Session History');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveClass('text-3xl', 'font-bold');
  });

  test('renders NewSession component', async () => {
    render(await SessionHistory());

    const newSessionComponent = screen.getByTestId('new-session-component');
    expect(newSessionComponent).toBeInTheDocument();
  });

  test('renders SessionsList component', async () => {
    render(await SessionHistory());

    const sessionsListComponent = screen.getByTestId('sessions-list-component');
    expect(sessionsListComponent).toBeInTheDocument();
  });

  test('page has correct base layout classes', async () => {
    const {container} = render(await SessionHistory());

    // Check main container classes for light/dark mode
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('min-h-screen');
    expect(mainContainer).toHaveClass('bg-neutral-100');
    expect(mainContainer).toHaveClass('dark:bg-gray-900');
  });

  test('header has correct styling and structure', async () => {
    render(await SessionHistory());

    const headerContainer = screen.getByText('Session History').closest('div');
    expect(headerContainer).toHaveClass('max-w-7xl');
    expect(headerContainer).toHaveClass('mx-auto');
    expect(headerContainer).toHaveClass('py-6');
    expect(headerContainer).toHaveClass('px-4');
  });

  test('main content area has correct layout', async () => {
    const {container} = render(await SessionHistory());

    const mainContentArea = container.querySelector('main > div > div');
    expect(mainContentArea).toHaveClass('px-4');
    expect(mainContentArea).toHaveClass('py-6');
  });

  test('components are rendered in the correct order', async () => {
    const {container} = render(await SessionHistory());

    // Get all child elements in order
    const children = Array.from(container.querySelectorAll('header > div > *'));

    // Check that title comes before NewSession
    const titleIndex = children.findIndex(
      el => el.textContent === 'Session History',
    );
    const newSessionIndex = children.findIndex(
      el => el.getAttribute('data-testid') === 'new-session-component',
    );

    expect(titleIndex).toBeLessThan(newSessionIndex);
  });
});
