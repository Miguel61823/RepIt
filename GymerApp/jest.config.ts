/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';
import nextJest from 'next/jest';
import dotenv from 'dotenv';

dotenv.config({path: '.env.test'});

const createJestConfig = nextJest({
  dir: './src',
});

const globalJestConfig: Config = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};

const customJestConfig: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/types.ts',
    '!src/middleware.ts',
    '!src/lib/utils.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/app/api/**/*.{js,ts}', // Exclude API routes from frontend coverage
    '!src/server/**/*.{js,ts}', // Exclude server code from frontend coverage
    '!src/drizzle/**/*.{js,ts}', // Exclude database code from frontend coverage
    '!src/server/api/sessions.ts', // Exclude sessions.ts specifically
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/components/ui/',
    'test-utils.tsx',
    'src/drizzle/', // Add this line
  ],

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Path to get modules from
  modulePaths: ['<rootDir>/src'],

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ['node_modules', 'utils'],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy', // Handle CSS imports (with CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js', // Handle CSS imports (without CSS modules)
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$':
      '<rootDir>/__mocks__/fileMock.js', // Handle image imports
    '^.+\\.(woff|woff2|eot|ttf|otf)$': '<rootDir>/__mocks__/fileMock.js', // Handle font imports
  },

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // The test environment that will be used for testing
  testEnvironment: 'jest-environment-jsdom',

  // The glob patterns Jest uses to detect test files
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/src/**/?(*.)+(spec|test).[tj]s?(x)',
  ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/src/drizzle/',
    '<rootDir>/src/server/',
    '<rootDir>/src/server/api/sessions.ts',
  ],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    '/node_modules/',
    '/node_modules/(?!my-package)(.*)',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};

const backendJestConfig: Config = {
  // Setup for backend is similar
  ...customJestConfig,
  testEnvironment: 'jest-environment-node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.backend.ts'],
  testMatch: [
    '<rootDir>/src/server/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/src/server/**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],

  collectCoverageFrom: [
    'src/server/**/*.{js,ts}',
    '!src/**/*.d.ts',
    '!src/**/types.ts',
    '!src/drizzle/**/*',
  ],
};

const jestConfig = async (): Promise<Config> => {
  const frontendConfig = await createJestConfig(customJestConfig)();
  const backendConfig = await createJestConfig(backendJestConfig)();

  return {
    ...globalJestConfig,
    projects: [
      {
        ...frontendConfig,
        displayName: 'frontend',
      },
      {
        ...backendConfig,
        displayName: 'backend',
      },
    ],
  };
};

export default jestConfig;
