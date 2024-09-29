# monorepo-cdk-ts starter kit

This repo is an example and starting point for a monorepo setup with AWS CDK in TypeScript.

# Organisation

Individual packages are located in /packages directory. Each package is a separate npm package.  Some are private,
and some are public (i.e. published to NPM).

Each package is separately documented with a README.md file.

# Files

## package.json

This is the root package.json file. It contains the dependencies for the monorepo setup.

### private: true

This root package.json file is marked as private. This is because it is not intended to be published to npm.

### workspaces

This is a list of directories that contain packages. In this case, there is only one package entry,
which acts as a wildcard for all directories in the packages directory.

### devDependencies

These are the dependencies that are required for the monorepo setup. 
They are not included in the individual packages and relate to development of the 
monorepo itself, such as for unit testing

### scripts

These are the scripts that are available to run in the monorepo.

- app:deploy - Deploys the CDK app
- app:synth - Synthesizes the CDK app
- test - Runs the unit tests

## jest.config.mjs

Configures jest to use ESM modules, and load the jest.setup.ts file before running tests.

## jest.setup.ts

Includes custom matchers (a sub-package of the monorepo)

## tsconfig.json

Root tsconfig used for unit testing, and establishing references for all of the 
packages in the monorepo.

## tsconfig.package.json

This is a package-specific tsconfig file. It is used to establish a baseline for
each package in the monorepo.