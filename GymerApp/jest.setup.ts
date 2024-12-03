import '@testing-library/jest-dom';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock database connection
jest.mock('@/drizzle/db', () => ({
  db: {
    query: jest.fn(),
    select: jest.fn(),
    insert: jest.fn(),
    delete: jest.fn(),
    update: jest.fn()
  }
}));

jest.mock('@clerk/nextjs', () => ({
  auth: () => new Promise((resolve) => resolve({ userId: 'test-user-id' })),
  clerkClient: {
    users: {
      getUser: jest.fn()
    }
  },
  currentUser: jest.fn(),
  redirectToSignIn: jest.fn()
}));