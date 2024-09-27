export default {
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/*.test.ts'],
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    // isolatedModules: true speeds up jest
    '^.+\\.m?[jt]sx?$': ['ts-jest', { isolatedModules: true, useESM: true } ]
  },
  moduleNameMapper: {
    // Remove the .mjs extension from relative imports
    '^(\\.{1,2}/.*)\\.m?js$': '$1',
  },
}
