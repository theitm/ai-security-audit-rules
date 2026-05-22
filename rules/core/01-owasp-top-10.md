# OWASP Top 10 Review Rules

## A01 Broken Access Control

Check:

- Missing auth middleware on routes/API handlers.
- Object-level authorization bugs: user A can access user B data.
- Tenant isolation missing in database queries.
- Admin-only actions protected only by frontend checks.
- IDOR patterns: `/users/:id`, `/orders/:id`, `/files/:id` without ownership checks.

Fix guidance:

- Add server-side policy checks.
- Centralize authorization helpers.
- Add tests for wrong owner, wrong tenant and wrong role.

## A02 Cryptographic Failures

Check:

- Passwords stored without Argon2id/bcrypt/scrypt.
- Sensitive data logged or returned in API responses.
- Cookies missing `Secure`, `HttpOnly`, `SameSite`.
- TLS disabled or optional in production.
- Custom crypto implementations.

Fix guidance:

- Use vetted libraries and modern algorithms.
- Remove sensitive data from logs.
- Enforce secure cookie flags.

## A03 Injection

Check:

- Raw SQL/NoSQL built from string concatenation.
- Shell commands with user input.
- Template rendering with untrusted HTML.
- Path traversal into file read/write.
- LDAP/XPath/GraphQL injection patterns.

Fix guidance:

- Use parameterized queries.
- Avoid shell; pass args arrays when possible.
- Validate input with schemas and allowlists.

## A04 Insecure Design

Check:

- No rate limit on abuse-prone endpoints.
- Missing business logic constraints.
- No lockout/quota for expensive operations.
- Missing rollback/kill switch for risky features.

Fix guidance:

- Add abuse cases to tests.
- Add throttling and server-side state checks.

## A05 Security Misconfiguration

Check:

- Debug mode enabled in production.
- Overbroad CORS.
- Public admin endpoints.
- Default credentials.
- Missing security headers.

## A06 Vulnerable and Outdated Components

Check:

- Missing lockfiles.
- Deprecated packages.
- Known vulnerable dependencies.
- Unpinned container images.

## A07 Identification and Authentication Failures

Check:

- Weak password hashing.
- Long-lived reset tokens.
- Missing MFA for admin paths.
- Session fixation.
- User enumeration in login/reset flows.

## A08 Software and Data Integrity Failures

Check:

- CI workflows with excessive permissions.
- Untrusted PRs accessing secrets.
- Webhooks without signature verification.
- Remote scripts executed without integrity checks.

## A09 Logging and Monitoring Failures

Check:

- Missing audit log for admin actions.
- No logging for auth failures and privilege changes.
- Logs contain secrets or excessive PII.
- No alerting for security signals.

## A10 SSRF

Check:

- User-provided URLs fetched server-side.
- No allowlist for protocols/domains.
- Private IP ranges and metadata endpoints reachable.
- Redirects followed without validation.

Fix guidance:

- Allowlist domains/protocols.
- Block localhost, private CIDRs and cloud metadata IPs.
- Add timeouts and response size limits.
