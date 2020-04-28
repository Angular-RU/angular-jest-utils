const createTsJestConfig = require('./lib/index').createTsJestConfig;
const path = require('path');

module.exports = createTsJestConfig({
    displayName: 'MyApp',
    rootDir: path.resolve('.'),
    testMatch: ['<rootDir>/tests/**/*.spec.ts'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    tsConfigRootPath: path.resolve('./tsconfig.json')
});
