# JSON Output Template for Findings

Use this when a tool needs to parse the agent output (CI, dashboards, ticketing).

## Schema

```json
{
  "tool": "ai-security-audit-rules",
  "version": "1.0",
  "scanned_at": "2026-05-22T10:00:00Z",
  "scope": {
    "repo": "owner/name",
    "commit": "abc123...",
    "files_reviewed": 42
  },
  "summary": {
    "critical": 0,
    "high": 2,
    "medium": 5,
    "low": 3,
    "info": 1
  },
  "findings": [
    {
      "id": "F-001",
      "severity": "HIGH",
      "title": "IDOR in /api/orders/:id",
      "category": "A01_Broken_Access_Control",
      "file": "src/routes/orders.js",
      "line": 42,
      "evidence": "Route reads :id from req.params and queries Orders table without checking req.user.id == order.userId",
      "impact": "Any authenticated user can read any order including PII and payment metadata",
      "fix": "Add WHERE userId = req.user.id to query, OR fetch order then assert ownership before returning",
      "test": "Login as user A, GET /api/orders/<id-of-user-B>, expect 403 Forbidden",
      "confidence": "HIGH",
      "references": [
        "https://owasp.org/Top10/A01_2021-Broken_Access_Control/"
      ]
    }
  ],
  "positive_observations": [
    "Argon2id used for password hashing in src/auth/password.js",
    "Lockfile committed and dependencies scanned in CI"
  ],
  "assumptions": [
    "Did not review .env files (not in repo)",
    "Did not run dynamic tests"
  ]
}
```

## Prompt to request JSON output

```
Review this repository using the security audit rules in drop-in/CLAUDE.md.
Output your findings as a single valid JSON object matching the schema in
prompts/json-output-template.md. Do not include any text outside the JSON.
```
