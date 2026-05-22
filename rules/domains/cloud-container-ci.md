# Cloud, Container and CI/CD Security Rules

## GitHub Actions / CI

Check:

- `permissions: write-all` or broad default permissions.
- Secrets used in workflows triggered by untrusted PRs.
- `pull_request_target` misuse.
- Unpinned third-party actions.
- Build scripts executing remote code without verification.

Fix guidance:

- Set minimal `permissions` per workflow/job.
- Pin actions by SHA for high-security projects.
- Use OIDC instead of long-lived cloud keys.

## Containers

Check:

- Running as root unnecessarily.
- `privileged: true` or broad capabilities.
- Secrets baked into image layers.
- Unpinned base images.
- No image scanning.

## Cloud/IaC

Check:

- Public S3/buckets/storage.
- Security groups allowing `0.0.0.0/0` to admin ports.
- Overbroad IAM policies: `*:*`.
- Public databases.
- Missing encryption and logging.

## Vietnamese notes

- CI token và cloud role phải tối thiểu quyền.
- Không để database/Redis/admin port public internet.
- Không bake secret vào Docker image.
