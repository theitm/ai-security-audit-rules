# Go Security Rules

## Database access

Check:

- Raw SQL query concatenation in `db.Query`, `db.Exec`, or `db.QueryRow`.
- Raw SQL query interpolation when using ORMs like GORM (e.g. `db.Where("name = " + input)`).
- Missing tenant/user ID checks in database operations.

Fix guidance:

- Use parameterized queries with placeholders (`?`, `$1`, etc.).
- GORM: Use structured query parameters (e.g. `db.Where("name = ?", input)`).

## Command execution

Flag:

- Executing user-controlled input in `exec.Command` or `exec.CommandContext`.
- Splitting user arguments using whitespace or executing via a shell wrapper like `/bin/sh -c`.

Fix guidance:

- Avoid shell execution entirely.
- Pass parameters as separate elements in the argument slice of `exec.Command(name, arg1, arg2...)`.

## Network requests (SSRF)

Check:

- `http.Get(url)` or `http.Client.Do(req)` where `url` is user-provided.
- Missing IP address verification (allowing connections to `localhost`, `127.0.0.1`, `169.254.169.254`, or private range CIDRs).

Fix guidance:

- Parse user URL with `url.Parse` and validate the scheme (only `http`/`https`).
- Resolve the hostname and verify the target IP is not within a private CIDR range before dispatching.

## Memory and unsafe code

Check:

- Direct usage of package `unsafe` (e.g. `unsafe.Pointer`) to bypass Go's type system.
- Risky casting or raw buffer manipulation that could lead to panic or memory disclosure.

## Dependency hygiene

- Ensure `go.mod` and `go.sum` are committed and updated.
- Verify if `govulncheck` is integrated into the CI/CD pipeline.

## Vietnamese notes

- Không thực hiện cộng chuỗi tạo câu lệnh SQL (`db.Query` hoặc `GORM`).
- Truyền đối số dạng mảng riêng biệt cho `exec.Command`, tránh dùng shell wrapper.
- Chặn các URL trỏ về mạng nội bộ (private IP, localhost, metadata IP) khi gọi HTTP Client.
- Hạn chế sử dụng thư viện `unsafe`.
