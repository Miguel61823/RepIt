// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { SessionCard } from '../sessionCard';
// import { deleteSession } from '@/server/api/sessions';

// // Mock the deleteSession function
// jest.mock('@/server/api/sessions', () => ({
//   deleteSession: jest.fn(),
// }));

// const mockSession = {
//   session_id: '1',
//   type: 'Workout',
//   name: 'Morning Run',
//   date: new Date('2023-01-01'),
//   session_data: 'Ran 5 miles'
// };

// describe('SessionCard Component', () => {
//   it('renders session details correctly', () => {
//     render(<SessionCard {...mockSession} />);
    
//     expect(screen.getByText('Morning Run')).toBeInTheDocument();
//     expect(screen.getByText('Workout')).toBeInTheDocument();
//     expect(screen.getByText('Ran 5 miles')).toBeInTheDocument();
//   });

//   it('renders edit and delete buttons', () => {
//     render(<SessionCard {...mockSession} />);
    
//     const editButton = screen.getByText('Edit');
//     const deleteButton = screen.getByText('Delete');
    
//     expect(editButton).toBeInTheDocument();
//     expect(deleteButton).toBeInTheDocument();
//   });

//   it('opens delete confirmation dialog', () => {
//     render(<SessionCard {...mockSession} />);
    
//     const deleteButton = screen.getByText('Delete');
//     fireEvent.click(deleteButton);
    
//     expect(screen.getByText('Are you absolutely sure?')).toBeInTheDocument();
//   });

//   it('calls deleteSession when confirmation is clicked', () => {
//     render(<SessionCard {...mockSession} />);
    
//     const deleteButton = screen.getByText('Delete');
//     fireEvent.click(deleteButton);
    
//     const confirmButton = screen.getByText('Yes, I am sure');
//     fireEvent.click(confirmButton);
    
//     expect(deleteSession).toHaveBeenCalledWith(mockSession.session_id);
//   });
// });

test.todo('test');
