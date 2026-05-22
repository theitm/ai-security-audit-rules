# JavaScript / TypeScript Security Rules

## Node.js backend

Check:

- Express/Fastify/Koa routes without auth middleware.
- `child_process.exec` or shell usage with user input.
- `eval`, `new Function`, unsafe dynamic imports.
- Prototype pollution via unsafe merge/deep assign.
- Insecure JWT verification: missing algorithm allowlist, accepting `none`, not checking issuer/audience.
- Missing validation at API boundaries.

Fix guidance:

- Use Zod, Valibot, Joi or framework validators.
- Prefer `execFile`/`spawn` with argument arrays over shell.
- Pin JWT algorithms and validate issuer/audience/expiry.

## Frontend

Check:

- XSS via `dangerouslySetInnerHTML`, unsafe markdown rendering, direct DOM writes.
- Tokens stored in localStorage when cookies/session would be safer.
- Secrets embedded in frontend bundles.
- Client-side role checks treated as authorization.

## Package ecosystem

Check:

- `package-lock.json`, `pnpm-lock.yaml` or `yarn.lock` exists.
- Suspicious postinstall scripts.
- Overbroad dependency updates.
- `npm audit`/SCA results if available.

## Vietnamese notes

- Frontend không được chứa secret.
- UI chỉ dùng để ẩn/hiện; quyền thật phải kiểm ở backend.
- Tránh shell command từ input người dùng.
