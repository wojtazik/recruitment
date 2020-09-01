// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  automock: false,
  clearMocks: true,
  collectCoverage: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '__tests__/helper/'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)': 'identity-obj-proxy'
  },
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  setupFiles: ['./setup-jest.js'],
  resetMocks: true,
  resetModules: true,
  roots: [
    "<rootDir>/__tests__/unit",
    "<rootDir>/__tests__/functional",
  ]
};
