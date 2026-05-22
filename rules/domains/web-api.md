# Web/API Security Rules

## Authentication

- Every protected route must require authentication.
- Session rotation after login and privilege changes.
- Password reset tokens must be one-time and short-lived.
- Admin routes require stronger controls and audit logs.

## Authorization

- Check role, ownership and tenant on every object access.
- Never trust client-provided role, tenant or user id.
- Test horizontal and vertical privilege escalation.

## Input/output

- Validate body, query, params, headers and file uploads.
- Encode output by context.
- Return generic errors for auth flows.
- Do not expose stack traces in production.

## API abuse

- Rate limit login, reset, signup, OTP, search and expensive endpoints.
- Add pagination and maximum page size.
- Add request body size limits.
- Protect file uploads with type validation, scanning and safe storage.

## Vietnamese notes

- API public phải có rate limit và validation.
- File upload là vùng rủi ro cao: kiểm MIME, extension, size, storage path.
