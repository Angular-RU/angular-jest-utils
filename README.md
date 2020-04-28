# Automatic create Jest config for Angular projects

<p>
  <a href="https://travis-ci.org/angular-ru/eslint-config">
    <img src="https://api.travis-ci.org/Angular-RU/angular-eslint-config.svg?branch=master" />
  </a>
  <a href="https://badge.fury.io/js/%40angular-ru%2Feslint-config">
    <img src="https://badge.fury.io/js/%40angular-ru%2Feslint-config.svg" />
  </a>
  <a href="https://npm-stat.com/charts.html?package=%40angular-ru%2Feslint-config&from=2019-09-01">
    <img src="https://img.shields.io/npm/dt/@angular-ru/eslint-config.svg" />
  </a>
</p>

It's very convenient to testing our applications with Angular and Jest now.

### Quick start

Create `jest.config.js`

```ts
const path = require('path');
const createTsJestConfig = require('@angular-ru/jest-utils').createTsJestConfig;

module.exports = createTsJestConfig({
    rootDir: path.resolve('.'),
    displayName: 'My Angular App',
    testMatch: ['<rootDir>/tests/**/*.spec.ts'],
    collectCoverageFrom: ['<rootDir>/src/app/**/*.ts'],
    tsConfigRootPath: path.resolve('./tsconfig.json')
});
```
