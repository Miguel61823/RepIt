// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { EditSession } from '../editSession';
// import { Session } from '@/server/api/sessions';

// const mockSession: Session = {
//   session_id: '1',
//   type: 'Test Type',
//   name: 'Test Session',
//   date: new Date(),
//   session_data: 'Test data'
// };

// describe('EditSession Component', () => {
//   beforeEach(() => {
//     // Clear any existing event listeners
//     window.removeEventListener = jest.fn();
//   });

//   it('renders edit button', () => {
//     render(<EditSession {...mockSession} />);
//     const editButton = screen.getByText('Edit');
//     expect(editButton).toBeInTheDocument();
//   });

//   it('opens sheet when edit button is clicked', () => {
//     render(<EditSession {...mockSession} />);
//     const editButton = screen.getByText('Edit');
//     fireEvent.click(editButton);
    
//     const sheetTitle = screen.getByText('Edit Session');
//     expect(sheetTitle).toBeInTheDocument();
//   });

//   it('adds and removes event listener', () => {
//     const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
//     const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

//     const { unmount } = render(<EditSession {...mockSession} />);
    
//     expect(addEventListenerSpy).toHaveBeenCalledWith(
//       'closeEditSessionSheet', 
//       expect.any(Function)
//     );

//     unmount();

//     expect(removeEventListenerSpy).toHaveBeenCalledWith(
//       'closeEditSessionSheet', 
//       expect.any(Function)
//     );
//   });
// });

test.todo('test');
