// Mock Clerk authentication
jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(() => ({
    userId: 'test-user-id',
    redirectToSignIn: jest.fn(),
  })),
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
        where: jest.fn(),
      })),
    })),
  },
}));

// Mock Anthropic
jest.mock('@anthropic-ai/sdk', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    messages: {
      create: jest.fn(),
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
