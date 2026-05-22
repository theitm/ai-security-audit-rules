# Contributing

Thanks for considering a contribution. This project hosts defensive security review rules for AI coding agents — that scope is strict and we keep it that way.

## What we accept

- New rules with concrete evidence patterns and safe fix guidance
- Coverage for additional languages, frameworks, or deployment targets
- Better drop-in templates for new agents (e.g. new IDE assistants)
- Sample reports on real OSS projects (with proper disclosure if you find real bugs)
- Bilingual additions or improvements (EN/VI primary; other languages welcome under `i18n/`)
- Test fixtures that exercise the rules (extend `examples/vulnerable-app/`)

## What we reject

- Exploit walkthroughs, payload chains, or attacker tradecraft
- Malware, phishing, credential theft, persistence techniques
- Vendor FUD or marketing without evidence
- Rules that recommend disabling security controls without a safer replacement
- AI-generated bulk PRs without review and verification

## Style

- One rule = one decision. Avoid bundling unrelated checks.
- Each rule must include: trigger, evidence pattern, impact, fix, optional verification test.
- Prefer concrete code shapes over abstract advice.
- Keep examples short and language-idiomatic.

## Bilingual

For core rules and drop-ins, English is primary. Vietnamese sections are encouraged but not required for every PR. Use clear, professional VI; do not machine-translate idioms.

## PR checklist

- [ ] Touches only the relevant rule file(s)
- [ ] Adds/updates a sample finding if behavior changed
- [ ] Markdown lints cleanly (`.github/workflows/markdown-lint.yml` will check)
- [ ] No real secrets, no real PII, no production hostnames
- [ ] No offensive payloads

## Questions

Open an issue with the `question` label.
