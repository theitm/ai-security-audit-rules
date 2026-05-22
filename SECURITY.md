# Security Policy

This repository contains defensive security review rules for AI agents. It does not host application code that processes data.

## Reporting an issue with the rules

If you find a rule that:

- Recommends an unsafe practice
- Misses a common vulnerability class
- Generates false confidence
- Could be misused for offensive purposes

Open a GitHub issue with the `security` label, or for sensitive cases email the maintainer (see GitHub profile).

## Scope

In scope:
- Rule correctness
- Drop-in template safety
- Sample report accuracy
- Demo `vulnerable-app/` containment (must not be runnable as a network service in CI)

Out of scope:
- Vulnerabilities in your project that you discovered using these rules — open issues there.
- Issues in external AI agents (Claude Code, Cursor, etc.) — report to those vendors.

## Disclosure

We follow coordinated disclosure. Allow 30 days for fixes before public disclosure of any rule defect.
