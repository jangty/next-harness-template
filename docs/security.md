# Security — 인증/인가 경계·비밀 취급 모델

> **슬롯.** ⚠️ 구체 인가 모델(RLS냐 앱 레이어 인가냐 등)은 **미리 정하지 않는다**. ADR로 결정·기록한다.

## 인증 (Authentication)
_(Supabase Auth 흐름 — 세션·토큰 처리 — 채울 것)_

## 인가 (Authorization)
- ⚠️ **결정 대기**: Postgres RLS vs 앱 레이어 인가 vs 혼합. → `docs/adr/NNN` 으로 결정.
- 경계가 정해지면 그 강제 지점(미들웨어/정책/RLS 정책)을 여기 명시.

## 비밀 취급
- 비밀은 `.env`(커밋 금지). 코드에서는 `process.env`(검증은 [src/env.ts](../src/env.ts)).
- 삼중 방어: 가드 훅([guard-pretooluse.mjs](../scripts/hooks/guard-pretooluse.mjs)) + 권한 deny([.claude/settings.json](../.claude/settings.json)) + [.gitignore](../.gitignore).
- 서비스 롤 키 등 민감 키는 서버 전용(클라이언트 노출 금지, `NEXT_PUBLIC_` 접두사 주의).
