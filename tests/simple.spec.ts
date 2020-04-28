import { createTsJestConfig } from '../src/create-ts-jest-config';
import { Hello } from '@mock/hello';

describe('[TEST]: Hello world', () => {
    it('should be', () => {
        expect(1 + 2).toEqual(3);
    });

    it('should be correct resolve paths', () => {
        expect(Hello.nameClass).toEqual('World');
    });

    it('should be correct create', () => {
        expect(
            createTsJestConfig({
                testMatch: [],
                collectCoverageFrom: [],
                displayName: 'Hello world',
                tsConfigRootPath: '../tsconfig.json'
            })
        ).toEqual({
            globals: {
                'ts-jest': {
                    diagnostics: {
                        warnOnly: true
                    },
                    tsConfig: '../tsconfig.json',
                    stringifyContentPathRegex: '\\.html$',
                    astTransformers: [
                        'jest-preset-angular/build/InlineFilesTransformer',
                        'jest-preset-angular/build/StripStylesTransformer'
                    ]
                }
            },
            moduleNameMapper: {
                '^@mock/(.*)$': '<rootDir>/src/../tests/$1'
            },
            bail: 1,
            verbose: true,
            watch: false,
            cache: true,
            projects: ['<rootDir>'],
            testMatch: [],
            preset: 'jest-preset-angular',
            displayName: 'Hello world',
            rootDir: expect.any(String),
            maxWorkers: '50%',
            setupFilesAfterEnv: [],
            maxConcurrency: 2,
            cacheDirectory: '<rootDir>/.cache',
            coverageReporters: ['html', 'lcov', 'json', 'text', 'lcov', 'clover'],
            collectCoverageFrom: []
        });
    });
});
