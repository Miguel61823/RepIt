import {render, screen} from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  test('renders the footer', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
  
  test('renders the correct footer text', () => {
    render(<Footer />);
    
    const footerText = screen.getByText(/© 2024 RepIt. All rights reserved./i);
    expect(footerText).toBeInTheDocument();
  });
});
