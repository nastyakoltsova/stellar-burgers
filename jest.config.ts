import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'jest-css-modules-transform',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@ui(.*)$': '<rootDir>/src/components/ui$1',
    '^@ui-pages(.*)$': '<rootDir>/src/components/ui/pages$1',
    '^@utils-types$': '<rootDir>/src/utils/types',
    '^@utils-types/(.*)$': '<rootDir>/src/utils/types/$1',
    '^@api$': '<rootDir>/src/utils/burger-api',
    '^@slices(.*)$': '<rootDir>/src/services/slices$1',
    '^@selectors(.*)$': '<rootDir>/src/services/selectors$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
};

export default config;
