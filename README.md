# Automatic create Jest config for Angular projects

<p>
  <a href="https://travis-ci.org/github/Angular-RU/angular-jest-utils">
    <img src="https://travis-ci.org/Angular-RU/angular-jest-utils.svg?branch=master" />
  </a>
  <a href="https://badge.fury.io/js/%40angular-ru%2Fjest-utils">
    <img src="https://badge.fury.io/js/%40angular-ru%2Fjest-utils.svg" />
  </a>
  <a href="https://npm-stat.com/charts.html?package=%40angular-ru%2Fjest-utils&from=2019-09-01">
    <img src="https://img.shields.io/npm/dt/@angular-ru/jest-utils.svg" />
  </a>
</p>

It's very convenient to testing our applications with Angular and Jest now.

### Quick start

```bash
$ npm install @angular-ru/jest-utils -D
```

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

```bash
$ jest --config jest.config.js --coverage
```
