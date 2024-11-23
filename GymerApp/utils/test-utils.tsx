import React from 'react';
import {
  RenderOptions,
  RenderResult,
  render as rtlRender,
} from '@testing-library/react';
import userEvent, {UserEvent} from '@testing-library/user-event';
import {useRouter} from 'next/navigation';
import {useAuth} from '@clerk/nextjs';
import {ThemeProvider} from '@/components/theme-provider';

interface CustomRenderResult extends RenderResult {
  user: UserEvent;
}

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@clerk/nextjs', () => ({
  useAuth: jest.fn(() => ({isSignedIn: false})),
  ClerkProvider: ({children}: {children: React.ReactNode}) => (
    <div data-testid="clerk-provider">{children}</div>
  ),
  SignInButton: ({children}: {children: React.ReactNode}) => (
    <div data-testid="sign-in-button">{children}</div>
  ),
}));

jest.mock('@clerk/clerk-react', () => ({
  SignedIn: ({children}: {children: React.ReactNode}) => (
    <div data-testid="signed-in">{children}</div>
  ),
  SignedOut: ({children}: {children: React.ReactNode}) => (
    <div data-testid="signed-out">{children}</div>
  ),
}));

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

// Custom render function to handle user events
function render(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): CustomRenderResult {
  return {
    ...rtlRender(ui, {wrapper: AllTheProviders, ...options}),
    user: userEvent.setup(),
  };
}

// Helper to mock Clerk Auth
const setupAuthMock = (isSignedIn: boolean) => {
  (useAuth as jest.Mock).mockImplementation(() => ({
    isSignedIn,
  }));
};

// Helper to mock Next Router
const setupRouterMock = () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockImplementation(() => ({
    push: mockPush,
  }));
  return {mockPush};
};

export * from '@testing-library/react';
export {render, setupAuthMock, setupRouterMock};
