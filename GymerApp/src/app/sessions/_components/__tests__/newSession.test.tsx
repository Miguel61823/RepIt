// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { NewSession } from '../newSession';

// describe('NewSession Component', () => {
//   beforeEach(() => {
//     // Clear any existing event listeners
//     window.removeEventListener = jest.fn();
//   });

//   it('renders add session button', () => {
//     render(<NewSession />);
//     const addButton = screen.getByText('+ Add Session');
//     expect(addButton).toBeInTheDocument();
//   });

//   it('opens sheet when add session button is clicked', () => {
//     render(<NewSession />);
//     const addButton = screen.getByText('+ Add Session');
//     fireEvent.click(addButton);
    
//     const sheetTitle = screen.getByText('New Session');
//     expect(sheetTitle).toBeInTheDocument();
//   });

//   it('adds and removes event listener', () => {
//     const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
//     const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

//     const { unmount } = render(<NewSession />);
    
//     expect(addEventListenerSpy).toHaveBeenCalledWith(
//       'closeSessionSheet', 
//       expect.any(Function)
//     );

//     unmount();

//     expect(removeEventListenerSpy).toHaveBeenCalledWith(
//       'closeSessionSheet', 
//       expect.any(Function)
//     );
//   });
// });

test.todo('todo');
