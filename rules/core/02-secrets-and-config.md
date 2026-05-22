# Secrets and Configuration Rules

## What to search for

- Hardcoded API keys, tokens, passwords, private keys.
- `.env` committed to repository.
- Secrets in Dockerfiles, CI logs, test fixtures or documentation.
- Production credentials used in development config.
- JWT signing keys in source code.

## Rules

- Commit `.env.example`, never real `.env`.
- Secrets must come from a secret manager, environment variables or CI secrets.
- Rotate secrets when leaked; removing from Git history is not enough.
- CI secrets must not be exposed to untrusted pull requests.
- Cloud credentials should use OIDC/workload identity when possible.

## Agent review checklist

- [ ] Check `.gitignore` covers `.env`, `.env.*`, key files and local config.
- [ ] Search for key-like patterns in source, docs, tests and CI files.
- [ ] Inspect GitHub Actions permissions and secret usage.
- [ ] Check Docker layers and build args for accidental secret bake-in.
- [ ] Recommend rotation if a real secret appears committed.

## Vietnamese notes

- Không commit secret thật vào Git, kể cả repo private.
- Nếu secret đã vào Git, phải rotate/revoke ngay; xoá commit không đủ.
- Không đưa production token vào máy local hoặc test fixture.
