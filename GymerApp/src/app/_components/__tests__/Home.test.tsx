import React from 'react';
import '@testing-library/jest-dom';
import Home from '../Home';
import {render, screen, setupAuthMock} from '../../../../utils/test-utils';

const mockSignIn = jest.fn();

jest.mock('@clerk/nextjs', () => ({
  useAuth: jest.fn(() => ({isSignedIn: false})),
  ClerkProvider: ({children}: {children: React.ReactNode}) => (
    <div data-testid="clerk-provider">{children}</div>
  ),
  SignInButton: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      mockSignIn();
      onClick?.();
    };

    return React.cloneElement(children as React.ReactElement, {
      onClick: handleClick,
      'data-testid': 'sign-in-button',
    });
  },
}));

jest.mock('@clerk/clerk-react', () => ({
  SignedIn: ({children}: {children: React.ReactNode}) => (
    <div data-testid="signed-in">{children}</div>
  ),
  SignedOut: ({children}: {children: React.ReactNode}) => (
    <div data-testid="signed-out">{children}</div>
  ),
}));

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return <a href={href}>{children}</a>;
  };

  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('@/app/_components/Features', () => {
  return function MockFeatures() {
    return <div data-testid="features">Features Component</div>;
  };
});

describe('Home Component', () => {
  beforeEach(() => {
    setupAuthMock(false);
    mockSignIn.mockClear();
  });

  test('renders the main headings correctly', () => {
    render(<Home />);

    expect(
      screen.getByText('Transform Your Fitness Journey'),
    ).toBeInTheDocument();
    expect(screen.getByText('with RepIt')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Your ultimate companion in fitness tracking. Effortlessly log workouts, track progress, and stay motivated with intelligent insights that help you crush your health goals.',
      ),
    ).toBeInTheDocument();
  });

  test('renders the SignedOut section with sign-in button', async () => {
    const {user} = render(<Home />);

    const signInButton = screen.getByTestId('sign-in-button');
    expect(signInButton).toBeInTheDocument();
    await user.click(signInButton);

    expect(mockSignIn).toHaveBeenCalledTimes(1);
  });

  test('renders the SignedIn section with dashboard link', async () => {
    setupAuthMock(true);
    const {user} = render(<Home />);

    const dashboardLink = screen.getByText('Go To Dashboard');
    expect(dashboardLink).toBeInTheDocument();
    await user.click(dashboardLink);

    expect(dashboardLink.closest('a')).toHaveAttribute('href', '/dashboard');
  });

  test('renders the Features component', () => {
    render(<Home />);

    const featuresComponent = screen.getByTestId('features');
    expect(featuresComponent).toBeInTheDocument();
    expect(featuresComponent).toHaveTextContent('Features Component');
  });
});
