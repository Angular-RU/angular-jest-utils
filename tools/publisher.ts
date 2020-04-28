/* eslint-disable no-console */
import { ExecException } from 'child_process';

// eslint-disable-next-line @typescript-eslint/tslint/config
const { exec } = require('child_process');
// eslint-disable-next-line @typescript-eslint/tslint/config
const { readFileSync, writeFileSync } = require('fs');
const token: string = process.env['NPM_TOKEN']!;

type Any = any;

console.log('NPM_TOKEN', !!token);

const pkg: Record<string, Any> = JSON.parse(readFileSync('package.json').toString());

exec(`npm show ${pkg.name} version`, (error: ExecException | null, stdout: string, stderr: string): void => {
    if (error) {
        console.error(`exec error: ${error}`);
        console.error(stderr);
    }

    const oldVersion: string = stdout;
    const version: string[] = stdout.split('.');
    const major: number = parseInt(version[0]);
    const minor: number = parseInt(version[1]) + 1;
    const newVersion: string = `${major}.${minor}.0`;

    pkg.version = newVersion;

    console.log(`\nPrev "${pkg.name}" version: ${oldVersion}`);
    console.log(`New "${pkg.name}" version: ${newVersion}\n`);

    // eslint-disable-next-line no-magic-numbers
    writeFileSync('package.json', JSON.stringify(pkg, null, 4));
});
