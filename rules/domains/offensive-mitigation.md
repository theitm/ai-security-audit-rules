# Mitigation of Offensive Tooling and Scanners

Apply these defensive rules to build systems that actively resist penetration testing tools, automated scanners, and exploitation frameworks.

## Defending against Information Gathering and Reconnaissance

Hacking tools automate subdomain discovery, port scanning, directory fuzzing, and banner grabbing to map targets.

Check:

- Server signature headers exposed (e.g., `X-Powered-By`, `Server: Apache/2.4.41`).
- Enabled directory listing / directory indexing on server folders.
- Stack traces or verbose system paths returned in public error responses (assisting in exploit mapping).
- Exposed administrative panels or default debug paths (e.g., `/admin`, `/wp-admin`, `/debug`, `/.git`, `/.env`).

Fix guidance:

- Disable or strip server signatures from response headers.
- Return generic error messages (e.g., `An internal error occurred`) to public users.
- Configure web servers (Nginx, Apache, or framework routers) to block directory listing.
- Restrict admin paths behind an IP allowlist, VPN, or require Multi-Factor Authentication (MFA).

## Defending against Automated Vulnerability Scanners (SQLi/XSS/SSRF/LFI)

Tools like `sqlmap` or `OWASP ZAP` automate payload injection to find inputs that execute SQL, JavaScript, shell commands, or make local requests.

Check:

- Dynamic queries built with string interpolation.
- Inputs processed without strict type validation or schema checking.
- System functions executing parameters in a shell environment.

Fix guidance:

- Validate every input parameter (type, format, length) at the entry point using a schema parser (e.g. Zod, Pydantic, Joi). Reject unexpected characters early.
- Always use parameterized queries or trusted ORM functions to prevent SQL injection.
- Avoid passing user inputs directly into system executors.

## Defending against Phishing and Domain Spoofing

Attackers use phishing frameworks to capture credentials, using similar-looking domains (IDN Homograph attacks).

Check:

- Missing or misconfigured mail server security headers (SPF, DKIM, DMARC) on the domain.
- Acceptance of raw Unicode domains in user inputs without conversion to ASCII Punycode.

Fix guidance:

- Verify SPF, DKIM, and DMARC DNS records are active and set to strict policies (`v=spf1 -all`, `p=reject`).
- Convert user-supplied domain inputs to ASCII Punycode before processing or storing them, to prevent homograph confusion.

## Defending against Denial of Service (DDoS) and Resource Exhaustion

Scanners and stress-testing tools flood endpoints to crash memory, CPU, or database connections.

Check:

- Unconstrained API requests (e.g. lack of rate limits).
- Request body parsers accepting unlimited payload sizes.
- Missing database query timeouts (allowing slow queries to pool and exhaust connections).
- Infinite pagination or excessively large page sizes.

Fix guidance:

- Implement rate limiting (e.g. token bucket or leaky bucket algorithm) on all endpoints, especially authentication and CPU-intensive operations.
- Enforce strict size limits on incoming request payloads (e.g. limit JSON body parser to `10kb` or `1mb` maximum).
- Set explicit database query execution timeouts.
- Enforce strict limits on pagination parameters (e.g. maximum page size of 100).

## Defending against Post-Exploitation and Backdoors (RATs)

After getting initial access, attackers deploy shells, remote access trojans (RATs), and maintain persistence.

Check:

- Uploaded files stored inside directories where code execution is enabled.
- Application process running as a superuser (`root` or `Administrator`).
- Write permissions enabled on application code files in production.

Fix guidance:

- Store uploaded files on separate static storage providers (e.g. AWS S3) with execution disabled, or in a directory configured with `noexec` flags.
- Run application containers as non-root users.
- Enforce a read-only filesystem for the application directory in production, preventing attackers from writing backdoors or modifying files.

## Vietnamese notes

- Ẩn Server Header và vô hiệu hóa Directory Listing để chống do thám (reconnaissance).
- Bắt buộc kiểm tra kiểu dữ liệu và giới hạn độ dài ở cổng API bằng Zod/Pydantic để chặn đứng scanner tự động.
- Cấu hình đầy đủ SPF, DKIM, DMARC để chống giả mạo email thương hiệu.
- Đặt giới hạn kích thước request body (request size limits) và rate limit để chống DDoS làm sập bộ nhớ.
- Chạy container dưới quyền non-root và thiết lập hệ thống tập tin chỉ đọc (readonly filesystem) ở production để ngăn chặn RATs/backdoors ghi tệp độc hại.
