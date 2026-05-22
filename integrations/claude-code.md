# Claude Code Integration

## Usage

1. Copy `prompts/agent-system-prompt.md` into the agent instruction.
2. Ask Claude Code to read `SECURITY_REVIEW_PROTOCOL.md` and relevant rules.
3. Run a read-only audit first.
4. If patching is desired, ask for small commits by severity.

## Suggested prompt

```text
Read SECURITY_REVIEW_PROTOCOL.md and all rules under rules/core. Then inspect this repository for security issues. Do not modify files yet. Produce a report using prompts/security-review-report-template.md.
```

## Vietnamese prompt

```text
Đọc SECURITY_REVIEW_PROTOCOL.md và toàn bộ rules/core. Sau đó kiểm tra repo này để tìm vấn đề bảo mật. Chưa sửa file. Xuất report theo prompts/security-review-report-template.md.
```
