# EntityDB Development Guidelines

## Project Overview
EntityDB is an in-browser vector database that wraps IndexedDB and Transformers.js for storing and querying vector embeddings.

## Commands
- Build: `npm run build` (creates all bundle types in the dist folder)
- Build bundled only: `npm run build:bundled` (only builds fully bundled versions with dependencies)
- Watch mode during development: `npm run dev`
- Test: `npm test` or `npm run test`
- Run specific test: `npm test -- -t "test name"`
- Lint: `npm run lint`
- Format: `npm run format`

## Build Outputs
- Standard builds (dependencies as external):
  - dist/entity-db.cjs.js - CommonJS format
  - dist/entity-db.esm.js - ES modules format
  - dist/entity-db.umd.js - UMD format
- Fully bundled builds (dependencies included):
  - dist/entity-db.bundled.js - UMD with all dependencies
  - dist/entity-db.bundled.esm.js - ES modules with all dependencies

## Code Style
- **Formatting**: 2-space indentation, no trailing whitespace
- **Imports**: Sort imports alphabetically, group by external/internal
- **Types**: Use JSDoc for type annotations
- **Naming**: camelCase for variables/functions, PascalCase for classes
- **Error Handling**: Use try/catch blocks with specific error messages
- **Async/Await**: Prefer async/await over Promise chains
- **Error Messages**: Include error type in messages (e.g., `Error inserting data: ${error}`)
- **Comments**: Document complex algorithms and public API methods

## Architecture
- Use IndexedDB for persistent storage in browser
- Leverage Transformers.js for vector embedding generation
- Follow existing patterns for vector operations (cosine similarity, hamming distance)
- Maintain backward compatibility with existing API