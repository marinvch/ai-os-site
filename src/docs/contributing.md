# Contributing

AI OS is open source and contributions are welcome. This guide covers how to set up the development environment, run tests, and submit changes.

## Development Setup

**Prerequisites:** Node.js 20+, npm

```bash
# Clone the repo
git clone https://github.com/marinvch/ai-os.git
cd ai-os

# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test
```

## Project Structure

```text
src/
  actions/        # CLI action handlers (apply, doctor, dry-run, etc.)
  cli/            # Argument parsing and dispatch
  detectors/      # Stack detection (language, framework, patterns)
  generators/     # File generation (instructions, context, MCP, skills)
  mcp-server/     # MCP server and tool definitions
  recommendations/ # Stack-specific recommendation registry
  templates/      # Markdown templates for generated files
  tests/          # Vitest test suite
  validation/     # Smoke tests and regression suite
bundle/           # Built CLI bundle (esbuild output)
scripts/          # Build scripts
```

## Development Commands

```bash
npm run build          # Compile TypeScript
npm test               # Run Vitest test suite (376 tests)
npm run lint           # ESLint with security rules
npm run validate:fast  # build + lint + test
npm run bundle         # Rebuild CLI bundle (esbuild)
npm run gen-mcp-docs   # Regenerate docs/mcp-tools.md from source
npm run doctor         # Health check against current repo
npm run generate:dry   # Dry-run against current repo
```

## Coding Conventions

- **TypeScript** with strict mode — no `any`, no `!` non-null assertions without justification
- **ESM modules** — `"type": "module"` in package.json, `.js` extensions in imports
- **Early returns** over nested `if` blocks
- **No `console.log`** in library code — use the `--json` output path or stderr
- **Vitest** for tests — `describe` / `it` / `expect`, no `test.only` committed

## Adding a New MCP Tool

1. Add the tool definition to `src/mcp-server/tool-definitions.ts` in `MCP_TOOL_DEFINITIONS`
2. Implement the handler function (pure function, no side effects)
3. Add it to the appropriate partition in `src/mcp-tools.ts`
4. Regenerate the docs: `npm run gen-mcp-docs`
5. Add a test in `src/tests/`

## Adding a New Generator

1. Create `src/generators/my-generator.ts`
2. Export a function that returns `{ filePath: string; content: string }[]`
3. Import and call it from `src/actions/apply.ts`
4. Guard all disk writes with the `dryRun` check pattern
5. Add tests in `src/tests/`

## Submitting a Pull Request

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make changes and add tests
4. Run `npm run validate:fast` — must pass cleanly
5. Commit with a descriptive message
6. Open a PR against the `dev` branch (not `master`)

## Reporting Issues

Open an issue at [github.com/marinvch/ai-os/issues](https://github.com/marinvch/ai-os/issues) with:

- AI OS version (`npx github:marinvch/ai-os --version`)
- Node.js version (`node --version`)
- Operating system
- Reproduction steps
- Expected vs. actual behavior
