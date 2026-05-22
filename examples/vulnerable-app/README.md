# Vulnerable Demo App

A deliberately broken Express app for testing the AI Security Audit Rules.

## Planted bugs (7)

1. **A01 IDOR** — `GET /orders/:id` returns any order without ownership check
2. **A03 SQL Injection** — `GET /search` uses string concatenation
3. **A03 Command Injection** — `POST /ping` shells out with user input
4. **Secrets** — JWT secret hardcoded in `app.js`
5. **A07 Auth** — Password stored in plaintext
6. **A02 Crypto** — JWT verification accepts `alg: none`
7. **A10 SSRF** — `GET /fetch?url=` follows arbitrary URLs

## How to test the rules

```bash
# In any AI coding agent (Claude Code, Cursor, Codex):
# 1. Open this directory
# 2. Add ../../drop-in/CLAUDE.md (or .cursorrules) to project root
# 3. Ask: "Audit this codebase using the security rules. Find all vulnerabilities."
# 4. Compare findings to ../sample-report.md
```

A good agent should find all 7 bugs at HIGH or CRITICAL severity.

## DO NOT DEPLOY

This code is intentionally vulnerable for educational and rule-validation purposes.
Do not run it on a public network.
