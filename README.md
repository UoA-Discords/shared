# UoA-Discords/Shared [![CodeQL](https://github.com/UoA-Discords/shared/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/UoA-Discords/shared/actions/workflows/codeql-analysis.yml)[![Node.js CI](https://github.com/UoA-Discords/shared/actions/workflows/node.js.yml/badge.svg)](https://github.com/UoA-Discords/shared/actions/workflows/node.js.yml)

Shared interfaces and functions for the UoA Discords project.

Normally you'll only want to be editing this from inside our [website](https://github.com/UoA-Discords/website) or [server](https://github.com/UoA-Discords/api) repositories.

# Installation

If you insist on setting this repository up by itself.

```sh
# using pnpm (recommended)
pnpm install

# using yarn
yarn

# using npm
npm install
```

# Script

Run using `pnpm run <script name>` / `yarn <script name>` / `npm run <script name>`.

E.g. `pnpm run test`

-   `test` - Runs unit tests using Jest.
-   `typecheck` - Runs type checking using Typescript compiler.
-   `lint` - Runs linting using ESLint and Prettier.
-   `check-all` - Runs `test`, `typecheck` and `lint` scripts.

# Dependencies

-   [Axios](https://www.axios.com/) for making HTTP requests, such as getting Discord user information and invite code data.
-   [Discord API Types](https://www.npmjs.com/package/discord-api-types) for Discord user and invite data typing.

Dev Dependencies:

`eslint` and `prettier` are the main linters.

`typescript-eslint/eslint-plugin` and `typescript-eslint/parser` help with linting Typescript files.

`eslint-config-prettier` provides cross-compatibility between `eslint` and `prettier`.

`typescript`, `types/node`, and `ts-node` are used for Typescript support.

`jest` is used for unit testing.

`ts-jest` and `types/jest` are used to allow writing tests in Typescript.
