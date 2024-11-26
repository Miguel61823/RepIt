// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import SessionHistoryPage from '../sessionHistory';
// import { getSessionHistory } from '@/server/api/sessions';

// // Mock the getSessionHistory function
// jest.mock('@/server/api/sessions', () => ({
//   getSessionHistory: jest.fn(),
// }));

// const mockSessions = [
//   {
//     session_id: '1',
//     type: 'Workout',
//     name: 'Morning Run',
//     date: new Date('2023-01-01'),
//     session_data: 'Ran 5 miles'
//   },
//   {
//     session_id: '2',
//     type: 'Workout',
//     name: 'Evening Swim',
//     date: new Date('2023-01-02'),
//     session_data: 'Swam 1 mile'
//   }
// ];

// describe('SessionHistoryPage Component', () => {
//   beforeEach(() => {
//     // Reset the mock implementation before each test
//     (getSessionHistory as jest.Mock).mockResolvedValue(mockSessions);
//   });

//   it('renders page title', async () => {
//     render(await SessionHistoryPage());
    
//     expect(screen.getByText('Session History')).toBeInTheDocument();
//   });

//   it('renders new session button', async () => {
//     render(await SessionHistoryPage());
    
//     expect(screen.getByText('+ Add Session')).toBeInTheDocument();
//   });

//   it('renders session cards', async () => {
//     render(await SessionHistoryPage());
    
//     expect(screen.getByText('Morning Run')).toBeInTheDocument();
//     expect(screen.getByText('Evening Swim')).toBeInTheDocument();
//   });

//   it('calls getSessionHistory', async () => {
//     await SessionHistoryPage();
    
//     expect(getSessionHistory).toHaveBeenCalled();
//   });
// });


test.todo('todo');
