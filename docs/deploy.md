# Deploy — 배포 흐름·롤백

> **슬롯.** Docker Compose(OCI Ubuntu) + GitHub Actions → SSH 배포 기준. ⚠️ 고위험 — 사람 게이트.

## 배포 흐름
_(GitHub Actions 워크플로 → SSH → Docker Compose 기동 순서 — 채울 것)_
- 각 원격·컨테이너 명령은 권한 `ask` 로 사람 승인([.claude/settings.json](../.claude/settings.json)).

## 마이그레이션 게이트
_(배포 시 DB 마이그레이션 적용 시점·승인 절차 — 채울 것)_

## 롤백
_(실패 시 되돌리는 절차·롤백 지점 — 채울 것)_

> 관련 명령: [/deploy](../.claude/commands/deploy.md)
