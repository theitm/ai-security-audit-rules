# Python Security Rules

## Web frameworks

Check Django/FastAPI/Flask for:

- Missing auth dependencies/decorators.
- Unsafe template rendering or `|safe` filters.
- Debug mode enabled in production.
- Weak CORS settings.
- Missing CSRF protection for cookie-based sessions.

## Dangerous APIs

Flag:

- `eval`, `exec`, `compile` on untrusted input.
- `pickle.loads` or unsafe deserialization.
- `subprocess` with `shell=True` and user input.
- YAML load without `safe_load`.
- Path joins that allow traversal.

## Data access

Check:

- Raw SQL string interpolation.
- Tenant/user ownership missing in queries.
- Secrets in settings files.

## Dependency hygiene

- Use lockfiles: `requirements.txt` with hashes, `poetry.lock`, `uv.lock`, or `Pipfile.lock`.
- Check for abandoned packages and vulnerable versions.

## Vietnamese notes

- Không dùng `pickle` cho input không tin cậy.
- Không bật debug production.
- Query dữ liệu phải kiểm owner/tenant.
