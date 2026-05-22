# Core Security Principles

## English

Apply these principles to every codebase:

1. **Deny by default** — access is denied unless explicitly allowed.
2. **Least privilege** — users, services, CI tokens and API keys get only required permissions.
3. **Server-side enforcement** — UI checks are not security controls.
4. **Defense in depth** — one failed control should not lead to total compromise.
5. **Secure defaults** — production config must be safe without manual remembering.
6. **Fail closed** — when auth, config or validation fails, block the operation.
7. **Auditability** — security-relevant actions must be logged without leaking secrets.
8. **Assume breach** — design for containment, rotation, revocation and recovery.

## Tiếng Việt

Áp dụng cho mọi codebase:

1. **Mặc định từ chối** — chỉ cho phép khi có rule rõ ràng.
2. **Quyền tối thiểu** — user, service, CI token, API key chỉ có quyền cần thiết.
3. **Enforce ở server** — kiểm tra ở UI không phải biện pháp bảo mật.
4. **Phòng thủ nhiều lớp** — một lớp lỗi không được dẫn tới sập toàn bộ.
5. **Mặc định an toàn** — production config phải an toàn ngay cả khi người vận hành quên chỉnh.
6. **Fail closed** — auth/config/validation lỗi thì chặn thao tác.
7. **Có thể audit** — hành động nhạy cảm phải có log nhưng không leak secret.
8. **Giả định đã bị xâm nhập** — cần containment, rotate, revoke và recovery.

## Agent checklist

- [ ] Does the code enforce access server-side?
- [ ] Are risky operations fail-closed?
- [ ] Are secrets and tokens scoped and revocable?
- [ ] Can security incidents be reconstructed from logs?
- [ ] Are production defaults safer than development defaults?
