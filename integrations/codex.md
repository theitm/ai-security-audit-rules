# OpenAI Codex / Codex CLI Integration

## Quick start

1. Copy [`drop-in/AGENTS.md`](../drop-in/AGENTS.md) to your project root as `AGENTS.md`.
2. Codex CLI and OpenAI Codex pick it up automatically.
3. Run: `codex "Audit this repo using AGENTS.md. Produce a JSON report."`

## Tips

- For long audits, scope by directory: `codex "Audit src/auth/ only."`
- Use `--quiet` mode in CI to capture clean JSON output.
