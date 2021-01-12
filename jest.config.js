const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./test/tsconfig.json')

module.exports = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  transformIgnorePatterns: [
    'node_modules/(?!(lodash-es)/.*)'
  ],
  testMatch: [
    '<rootDir>/test/**/*.spec.ts'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\lodash-es\\\\.+\\.(j|t)sx?$': 'ts-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/test/tsconfig.json'
    }
  }
}
