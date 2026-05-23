# Agent Behavioral Rules for Security Reviews

Apply these execution principles to prevent AI hallucination, over-engineering, and collateral damage during security audits and patching.

## Think Before Fixing (Explicit Assumptions)

AI agents often make incorrect assumptions about authentication context, session models, or trust boundaries.

Check:

- Fixing a vulnerability without mapping the existing middleware or auth flow.
- Generating security patches based on silent assumptions.

Fix guidance:

- The agent must explicitly state its assumptions about the application's auth design before writing any code.
- If the routing model or middleware stack is ambiguous, the agent must ask the user for clarification.
- Identify the exact trust boundaries before implementing access checks.

## Simplicity First (Avoid Speculative Security)

Over-engineering security controls creates a larger attack surface and increases the risk of logical bypasses.

Check:

- Creating complex, custom validation wrapper functions instead of using standard schemas.
- Implementing redundant layers of encryption or custom sanitizers where standard libraries suffice.

Fix guidance:

- Write the minimum amount of code necessary to resolve the vulnerability.
- Prioritize native framework controls and standard, well-vetted libraries (e.g. `helmet`, standard validator packages).
- Keep the security patch easy to read and audit by humans.

## Surgical Changes (No Collateral Edits)

Unnecessary code refactoring, styling changes, or package updates can introduce new security bugs or break existing assumptions.

Check:

- Modifying formatting, comments, or structure of files unrelated to the vulnerability.
- Upgrading unrelated dependencies during a hotfix.

Fix guidance:

- Limit edits strictly to the lines of code required to resolve the identified vulnerability.
- Do not perform styling or unrelated refactoring inside a security patch.
- Keep security commits isolated and focused.

## Goal-Driven Verification (Failing and Passing Tests)

A security fix is not complete because it "looks right". It must be verified programmatically.

Check:

- Marking a vulnerability as "fixed" without writeable verification steps or test assertions.

Fix guidance:

- Define a clear test case that reproduces the vulnerability and verify it fails on the unfixed code (exploit verification).
- Write a test case verifying the patched code successfully blocks the attack (remediation verification).
- Ensure existing integration tests still pass to prevent regressions.

## Vietnamese notes

- **Suy nghĩ trước khi sửa**: Bắt buộc phát biểu rõ giả định về hệ thống phân quyền của dự án trước khi sửa code. Nếu chưa rõ middleware chạy ra sao, phải hỏi người dùng.
- **Ưu tiên sự đơn giản**: Viết mã sửa lỗi tối giản nhất. Không tự chế các bộ mã hóa/khử trùng phức tạp khi đã có thư viện chuẩn. Code bảo mật phức tạp là kẻ thù của an toàn.
- **Sửa đổi chính xác**: Chỉ sửa đúng những dòng code gây ra lỗi bảo mật. Không refactor code xung quanh hoặc thay đổi định dạng file không liên quan để tránh phá hỏng logic sẵn có.
- **Kiểm thử định hướng mục tiêu**: Sửa lỗi phải đi kèm kiểm thử. Viết cả test case tái hiện lỗi bị chặn (negative test) và test case đảm bảo hệ thống chạy bình thường (positive test).
