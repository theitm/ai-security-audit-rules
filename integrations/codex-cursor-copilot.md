# Codex / Cursor / Copilot Integration

## General usage

- Add this repo as context or paste selected Markdown files into the agent rules.
- Start with read-only review.
- Request evidence-backed findings.
- Ask the agent to produce patch plan before editing.

## Minimal rule set

Use these files for smaller context windows:

1. `SECURITY_REVIEW_PROTOCOL.md`
2. `rules/core/00-principles.md`
3. `rules/core/01-owasp-top-10.md`
4. `rules/core/02-secrets-and-config.md`
5. Relevant language/domain file

## Prompt

```text
Act as a defensive security reviewer. Use the attached AI Security Audit Rules. Review the repository and produce a prioritized security report with evidence, impact, fix and tests. Do not provide offensive exploitation steps.
```
