// Mock console.error and console.log
const originalConsoleError = console.error;
const originalConsoleLog = console.log;

beforeAll(() => {
  console.error = jest.fn();
  console.log = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.log = originalConsoleLog;
});

// Mock Clerk authentication
const mockRedirectToSignIn = jest.fn();
jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn().mockReturnValue({
    userId: 'test-user-id',
    redirectToSignIn: mockRedirectToSignIn,
  }),
}));

// Mock schema validation
jest.mock('@/schema/session', () => ({
  sessionFormSchema: {
    safeParse: jest.fn((data) => ({
      success: true,
      data,
    })),
  },
}));

// Mock database
jest.mock('@/drizzle/db', () => ({
  db: {
    query: {
      SessionsTable: {
        findMany: jest.fn(),
      },
    },
    insert: jest.fn(() => ({
      values: jest.fn(() => ({
        returning: jest.fn(),
      })),
    })),
    delete: jest.fn(() => ({
      where: jest.fn(),
    })),
    update: jest.fn(() => ({
      set: jest.fn(() => ({
        where: jest.fn().mockResolvedValue(undefined),
      })),
    })),
  },
}));

// Mock Anthropic with more detailed response structure
jest.mock('@anthropic-ai/sdk', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    messages: {
      create: jest.fn().mockResolvedValue({
        content: [{type: 'text', text: '{"test": "data"}'}],
      }),
    },
  })),
}));

// Mock UUID
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-session-id'),
}));

// Mock Next.js cache
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

// Global beforeEach to clear all mocks
beforeEach(() => {
  jest.clearAllMocks();
});
