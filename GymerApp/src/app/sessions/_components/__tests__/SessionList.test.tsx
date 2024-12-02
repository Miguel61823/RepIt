// src/app/sessions/_components/__tests__/sessionsList.test.tsx
import React from 'react';
import {render, screen} from '@testing-library/react';
import {SessionsList} from '../SessionsList';
import {getSessionHistory} from '@/server/api/sessions';

// Mock the sessions API
jest.mock('@/server/api/sessions', () => ({
  getSessionHistory: jest.fn(),
}));

jest.mock('../SessionCard', () => ({
  SessionCard: ({name}: {name: string}) => (
    <div data-testid="session-card">{name}</div>
  ),
}));

describe('SessionsList Component', () => {
  const mockSessions = [
    {
      session_id: '1',
      type: 'Strength',
      name: 'Leg Day',
      date: new Date('2023-06-15'),
      session_data: 'Squats: 4x10\nDeadlifts: 3x8',
    },
    {
      session_id: '2',
      type: 'Cardio',
      name: 'Running',
      date: new Date('2023-06-16'),
      session_data: '5k run',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders sessions when data is available', async () => {
    (getSessionHistory as jest.Mock).mockResolvedValue(mockSessions);

    render(await SessionsList());

    // Check that the correct number of session cards are rendered
    const sessionCards = await screen.findAllByTestId('session-card');
    expect(sessionCards).toHaveLength(2);

    // Check that session names are rendered
    expect(screen.getByText('Leg Day')).toBeInTheDocument();
    expect(screen.getByText('Running')).toBeInTheDocument();
  });

  test('renders with correct grid layout', async () => {
    (getSessionHistory as jest.Mock).mockResolvedValue(mockSessions);

    const {container} = render(await SessionsList());

    // Check for the grid layout classes
    const gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass('grid');
    expect(gridContainer).toHaveClass('gap-6');
    expect(gridContainer).toHaveClass('md:grid-cols-2');
    expect(gridContainer).toHaveClass('lg:grid-cols-3');
  });

  test('handles empty session list', async () => {
    (getSessionHistory as jest.Mock).mockResolvedValue([]);

    const {container} = render(await SessionsList());

    // Check that no session cards are rendered
    const sessionCards = screen.queryAllByTestId('session-card');
    expect(sessionCards).toHaveLength(0);

    // The container should still exist and maintain its grid structure
    const gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass('grid');
  });

  test('handles API error', async () => {
    (getSessionHistory as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch sessions'),
    );

    await expect(SessionsList()).rejects.toThrow('Failed to fetch sessions');
  });
});
