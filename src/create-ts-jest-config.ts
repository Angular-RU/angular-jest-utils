import type { Config } from '@jest/types';

import { validateOptions } from './internal';
import { Any, JestConfigOptions, ModuleMapper } from './jest-config.interface';

// eslint-disable-next-line complexity,max-lines-per-function
export function createTsJestConfig(options: JestConfigOptions): Config.InitialOptions {
    const maxConcurrency: number = 2;
    const rootDir: string = options?.rootDir ?? __dirname;

    if (options.debug) {
        // eslint-disable-next-line no-console
        console.log(
            `[DEBUG]: rootDir = ${rootDir}\nIf the address is not defined correctly, you can specify it:\n module.exports = createJestConfig({ rootDir: path.resolve('.') }); \n`
        );
    }

    validateOptions(options);

    if (!options?.tsConfigSpecPath && options.debug) {
        // eslint-disable-next-line no-console
        console.log(`[DEBUG]: tsConfigSpecPath not initialized, use tsConfig by: ${options.tsConfigRootPath}`);
    }

    const tsconfig: Record<string, Any> = require(options.tsConfigRootPath);
    const { pathsToModuleNameMapper: resolver }: Any = require('ts-jest/utils');
    const rootModuleNameMapper: { [key: string]: string | string[] } = resolver(
        tsconfig?.compilerOptions?.paths ?? {},
        {
            prefix: `<rootDir>/${tsconfig?.baseUrl ?? ''}`
        }
    );

    const moduleNameMapper: ModuleMapper = options.moduleNameMapper ?? rootModuleNameMapper;

    if (options.debug) {
        // eslint-disable-next-line no-console,no-magic-numbers
        console.log('[DEBUG]: ', JSON.stringify(moduleNameMapper, null, 4));
    }

    return {
        globals: {
            'ts-jest': {
                diagnostics: { warnOnly: true },
                tsConfig: options?.tsConfigSpecPath ?? options.tsConfigRootPath,
                stringifyContentPathRegex: '\\.html$',
                astTransformers: [
                    'jest-preset-angular/build/InlineFilesTransformer',
                    'jest-preset-angular/build/StripStylesTransformer'
                ]
            }
        },
        bail: 1,
        verbose: true,
        watch: false,
        cache: true,
        moduleNameMapper,
        projects: ['<rootDir>'],
        testMatch: options.testMatch,
        preset: 'jest-preset-angular',
        displayName: options.displayName,
        rootDir: options.rootDir ?? __dirname,
        maxWorkers: options?.maxWorkers ?? '50%',
        collectCoverageFrom: options.collectCoverageFrom,
        setupFilesAfterEnv: options?.setupFilesAfterEnv ?? [],
        maxConcurrency: options?.maxConcurrency ?? maxConcurrency,
        cacheDirectory: options?.cacheDirectory ?? '<rootDir>/.cache',
        coverageReporters: options?.coverageReporters ?? ['html', 'lcov', 'json', 'text', 'lcov', 'clover']
    };
}
