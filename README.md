# AI Security Audit Rules

**Production-ready Markdown rules for AI agents to review source code security.**

**Tiếng Việt:** Bộ quy tắc Markdown giúp AI agent kiểm tra bảo mật source code một cách có hệ thống.

> Status: private draft. Public release after owner review.

## Why this repo exists

AI coding agents are fast, but security reviews are often inconsistent. This repo gives agents a reusable checklist and review protocol so they can inspect code for real-world security issues: access control, injection, secrets, auth, dependency risk, server hardening, logging, and incident readiness.

AI agent thường review code không đồng đều. Repo này cung cấp bộ rule/checklist để agent rà soát bảo mật có cấu trúc, dễ copy vào Claude Code, Codex, Cursor, Copilot Chat hoặc hệ thống agent nội bộ.

## Quick start for agents

Use this order:

1. Read [`SECURITY_REVIEW_PROTOCOL.md`](SECURITY_REVIEW_PROTOCOL.md)
2. Apply [`rules/core/00-principles.md`](rules/core/00-principles.md)
3. Apply [`rules/core/01-owasp-top-10.md`](rules/core/01-owasp-top-10.md)
4. Apply language/domain rules that match the project
5. Produce a report using [`prompts/security-review-report-template.md`](prompts/security-review-report-template.md)

## Repository map

- `SECURITY_REVIEW_PROTOCOL.md` — end-to-end review workflow for AI agents
- `rules/core/` — baseline rules for all codebases
- `rules/languages/` — language/runtime-specific checks
- `rules/domains/` — web/API/cloud/container/CI rules
- `prompts/` — reusable prompts and report templates
- `integrations/` — integration notes for agent tools

## Design goals

- **Actionable:** every finding should include impact, evidence, and fix.
- **Defensive:** this repo is for secure coding and hardening, not exploitation.
- **Agent-friendly:** rules are written in imperative Markdown for LLM context windows.
- **Bilingual:** English first for reach; Vietnamese explanations for local teams.
- **Star-worthy:** clean structure, practical checklists, reusable prompts.

## Non-goals

- No exploit walkthroughs.
- No phishing, malware, persistence, or offensive tradecraft.
- No automated scanning claims without human verification.

## License

MIT — see [`LICENSE`](LICENSE).
