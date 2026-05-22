# Claude Code Integration

## Quick start

1. Copy [`drop-in/CLAUDE.md`](../drop-in/CLAUDE.md) to your project root as `CLAUDE.md`.
2. Open the project in Claude Code. The agent reads `CLAUDE.md` automatically.
3. Ask: `Audit this codebase using CLAUDE.md. Output findings in JSON per prompts/json-output-template.md.`

## Example session

```
You: Review src/routes/ for security issues following the CLAUDE.md rules.
Claude: [reads files, applies OWASP checks, returns findings with severity]
You: Fix the HIGH and CRITICAL issues. Add tests.
Claude: [generates patches with ownership checks, parameterized queries, etc.]
```

## Tips

- Pin Claude Code to read-only mode for the first audit pass.
- For large repos, scope the audit: `Audit only src/api/ this round.`
- Request the JSON output format when feeding results to a dashboard.
