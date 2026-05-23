<div align="center">

# 🛡️ AI Security Audit Rules

**Drop-in security review rules for AI coding agents.**
Stop shipping vulnerabilities your AI agent missed.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Works with Claude Code](https://img.shields.io/badge/Claude%20Code-ready-7c3aed)](integrations/claude-code.md)
[![Works with Cursor](https://img.shields.io/badge/Cursor-ready-000000)](integrations/cursor.md)
[![Works with Copilot](https://img.shields.io/badge/GitHub%20Copilot-ready-24292e)](integrations/github-copilot.md)
[![Works with Codex](https://img.shields.io/badge/Codex-ready-10a37f)](integrations/codex.md)
[![Bilingual](https://img.shields.io/badge/Docs-EN%20%2B%20VI-blue)](#language)

</div>

---

## 🚀 30-second setup

Pick your agent, drop the file in your project root, done.

| Agent | File to copy | Where it goes |
|-------|--------------|---------------|
| Claude Code | [`drop-in/CLAUDE.md`](drop-in/CLAUDE.md) | `<your-repo>/CLAUDE.md` |
| Cursor | [`drop-in/.cursorrules`](drop-in/.cursorrules) | `<your-repo>/.cursorrules` |
| GitHub Copilot | [`drop-in/copilot-instructions.md`](drop-in/copilot-instructions.md) | `<your-repo>/.github/copilot-instructions.md` |
| OpenAI Codex / Codex CLI | [`drop-in/AGENTS.md`](drop-in/AGENTS.md) | `<your-repo>/AGENTS.md` |
| Windsurf | [`drop-in/.windsurfrules`](drop-in/.windsurfrules) | `<your-repo>/.windsurfrules` |
| Aider | [`drop-in/CONVENTIONS.md`](drop-in/CONVENTIONS.md) | `<your-repo>/CONVENTIONS.md` |

Then ask your agent:

```text
Review this codebase using the security audit rules. Output a report following the severity matrix.
```

---

## 🎯 What this gives you

- **Server-side enforcement first** — agent stops trusting UI checks
- **OWASP Top 10 coverage** with real evidence patterns
- **Per-language rules** — JS/TS, Python, Go
- **Domain rules** — Web/API, Cloud/CI-CD, LLM Apps, Offensive Mitigation
- **Structured output** — JSON severity matrix tools can parse
- **Defensive only** — no exploit walkthroughs, no offensive content
- **Bilingual** — English first, Vietnamese explanations

## 📊 Sample finding output

What your agent will produce:

```json
{
  "severity": "HIGH",
  "title": "IDOR in /api/orders/:id",
  "file": "src/routes/orders.js",
  "line": 42,
  "category": "A01_Broken_Access_Control",
  "evidence": "Route reads :id from params and queries DB without checking req.user.id == order.userId",
  "impact": "Any authenticated user can read any order",
  "fix": "Add ownership check before returning order; add tenant id to WHERE clause",
  "test": "Login as user A, request order belonging to user B, expect 403",
  "confidence": "HIGH"
}
```

See [`examples/sample-report.md`](examples/sample-report.md) for a full audit report.

## 🧪 Try it on a real vulnerable app

We ship a deliberately-broken Express app at [`examples/vulnerable-app/`](examples/vulnerable-app/) with **7 planted bugs**. Point your agent at it and verify the rules catch all of them.

```bash
git clone https://github.com/theitm/ai-security-audit-rules
cd ai-security-audit-rules/examples/vulnerable-app
# Open in Cursor / Claude Code / your agent
# Ask: "Audit this code using ../../drop-in/CLAUDE.md and produce a report"
```

## 📚 Repository map

```text
ai-security-audit-rules/
├── drop-in/                    # Copy these into your project
│   ├── CLAUDE.md
│   ├── .cursorrules
│   ├── AGENTS.md
│   ├── copilot-instructions.md
│   ├── .windsurfrules
│   └── CONVENTIONS.md
├── rules/
│   ├── core/                   # Apply to every codebase
│   │   ├── 00-principles.md
│   │   ├── 01-owasp-top-10.md
│   │   ├── 02-secrets-and-config.md
│   │   ├── 03-agent-behavior.md
│   │   └── severity.yaml       # Machine-readable severity matrix
│   ├── languages/              # Per-language deep dives
│   │   ├── javascript-typescript.md
│   │   ├── python.md
│   │   └── go.md
│   └── domains/                # Topic-specific security rules
│       ├── web-api.md
│       ├── cloud-container-ci.md
│       ├── llm-application.md
│       └── offensive-mitigation.md
├── prompts/                    # System prompts + report templates
├── examples/
│   ├── vulnerable-app/         # Demo target with planted bugs
│   └── sample-report.md        # Reference output
├── integrations/               # How-to per agent
└── SECURITY_REVIEW_PROTOCOL.md # End-to-end workflow
```

## 🆚 Why use this instead of just SAST?

| | SAST (Semgrep, CodeQL) | This repo + AI agent |
|---|---|---|
| Setup | CI config, rule tuning, false-positive triage | Copy 1 file |
| Context awareness | Pattern match | Reads your business logic |
| Custom rules | Write in DSL | Write in plain English |
| Offline | Yes | Yes (any local LLM) |
| Cost | Free / paid | LLM tokens |
| Replaces SAST? | — | No, complements it |

Use both. SAST catches known-pattern bugs. AI agents catch logic bugs SAST misses (IDOR, broken business rules, missing tenant checks).

## 🌐 Language

This repo is bilingual:
- **English** — primary, for international reach
- **Tiếng Việt** — for Vietnamese teams (`Bộ rule kiểm bảo mật code cho AI agent`)

## 🤝 Contributing

PRs welcome. We accept:
- New rules with evidence patterns
- New language/domain coverage
- Better drop-in templates
- Sample reports on real OSS projects

We do NOT accept:
- Exploit walkthroughs
- Offensive tooling
- Vendor FUD without evidence

See [CONTRIBUTING.md](CONTRIBUTING.md).

## ⭐ Star history

If this saved you from shipping a vulnerability, drop a star. It helps other devs find it.

## 📜 License

MIT — see [LICENSE](LICENSE). Use freely in commercial projects.

---

<div align="center">

**Built for the era of AI-generated code.**
Made with ☕ + 🇻🇳

</div>
