import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Topbar from '../TopBar';
import {useAuth} from '@clerk/nextjs';
import {useRouter} from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock @clerk/nextjs
jest.mock('@clerk/nextjs', () => ({
  useAuth: jest.fn(),
  SignedIn: ({children}: {children: React.ReactNode}) => <div>{children}</div>,
  SignedOut: ({children}: {children: React.ReactNode}) => <div>{children}</div>,
  SignInButton: ({children}: {children: React.ReactNode}) => (
    <div>{children}</div>
  ),
  UserButton: () => <div data-testid="user-button">User Button</div>,
}));

// Mock components and stylings
jest.mock('lucide-react', () => ({
  Menu: () => <div data-testid="mobile-menu-button">Menu</div>,
}));

jest.mock('@/components/mode-toggle', () => ({
  ModeToggle: () => <div data-testid="mode-toggle">Mode Toggle</div>,
}));

jest.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({children}: {children: React.ReactNode}) => (
    <div className="dropdown-mock">{children}</div>
  ),
  DropdownMenuContent: ({children}: {children: React.ReactNode}) => (
    <div className="dropdown-content-mock">{children}</div>
  ),
  DropdownMenuTrigger: ({children}: {children: React.ReactNode}) => (
    <div className="dropdown-trigger-mock">{children}</div>
  ),
  DropdownMenuItem: ({children}: {children: React.ReactNode}) => (
    <div className="dropdown-item-mock">{children}</div>
  ),
  DropdownMenuGroup: ({children}: {children: React.ReactNode}) => (
    <div className="dropdown-group-mock">{children}</div>
  ),
  DropdownMenuSeparator: () => <div className="dropdown-separator-mock" />,
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <div className="button-mock" onClick={onClick}>
      {children}
    </div>
  ),
}));

describe('Topbar Component', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useAuth as jest.Mock).mockReturnValue({isSignedIn: true});
  });

  test('renders the logo', () => {
    render(<Topbar />);

    const logo = screen.getByText('RepIt');
    expect(logo).toBeInTheDocument();
  });

  test('renders all navigation links in desktop view', () => {
    render(<Topbar />);

    const navLinks = ['Dashboard', 'Facilities', 'Sessions', 'Goals'];

    navLinks.forEach(link => {
      const linkElement = screen.getAllByText(link)[0]; // Get first instance for desktop view
      expect(linkElement).toBeInTheDocument();
    });
  });

  test('renders user authentication elements', () => {
    render(<Topbar />);

    // For signed-in state
    const userButton = screen.getAllByTestId('user-button');
    expect(userButton[0]).toBeInTheDocument();

    // For signed-out state
    (useAuth as jest.Mock).mockReturnValue({isSignedIn: false});
    render(<Topbar />);
    const signInButton = screen.getAllByText('Sign In');
    expect(signInButton[0]).toBeInTheDocument();
  });

  test('handles navigation when user is signed in', async () => {
    const user = userEvent.setup();
    (useAuth as jest.Mock).mockReturnValue({isSignedIn: true});
    render(<Topbar />);

    const navigationTests = [
      {button: 'Dashboard', path: '/dashboard'},
      {button: 'Facilities', path: '/facilities'},
      {button: 'Sessions', path: '/sessions'},
      {button: 'Goals', path: '/goals'},
    ];

    for (const {button, path} of navigationTests) {
      const linkButton = screen.getAllByText(button)[0];
      await user.click(linkButton);
      expect(mockRouter.push).toHaveBeenCalledWith(path);
    }
  });

  test('redirects to home when user is signed out', async () => {
    const user = userEvent.setup();
    (useAuth as jest.Mock).mockReturnValue({isSignedIn: false});
    render(<Topbar />);

    const navigationButtons = ['Dashboard', 'Facilities', 'Sessions', 'Goals'];

    for (const button of navigationButtons) {
      const linkButton = screen.getAllByText(button)[0];
      await user.click(linkButton);
      expect(mockRouter.push).toHaveBeenCalledWith('/');
    }
  });

  test('renders mobile menu in small viewport', () => {
    render(<Topbar />);

    const mobileMenuButton = screen.getByTestId('mobile-menu-button');
    expect(mobileMenuButton).toBeInTheDocument();
  });

  test('renders correct background and text colors', () => {
    render(<Topbar />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass(
      'bg-neutral-100',
      'dark:bg-gray-800',
      'dark:text-white',
      'text-black',
    );
  });
});
