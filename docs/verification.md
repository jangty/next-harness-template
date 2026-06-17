# Verification — 검증 경로

> **슬롯.** 원칙: 앱을 **에이전트가 읽을 수 있게**. 성공은 침묵, 실패만 자세히.

## 단위 테스트
_(러너 선택(vitest/jest 등)·위치·컨벤션 — 채울 것)_

## E2E 테스트
_(Playwright 등 — 핵심 사용자 흐름 — 채울 것)_

## 런타임 관찰
_(로그·헬스체크 — 에이전트가 앱 동작을 읽을 수 있는 경로 — 채울 것)_

## 가드 훅 검증 (자기 방어)
- "적어둔 방어 ≠ 동작하는 방어." 가드([guard-pretooluse.mjs](../scripts/hooks/guard-pretooluse.mjs))가
  비밀·산출물·파괴적 명령을 실제로 차단하는지 못박는 회귀 테스트:
  [guard-pretooluse.check.mjs](../scripts/hooks/guard-pretooluse.check.mjs) (`node scripts/hooks/guard-pretooluse.check.mjs`, 의존성 없음).
- pre-commit(`guard-selftest`)에서 자동 실행 → 가드가 회귀하면 커밋이 막힌다.
- 알려진 트립와이어 갭(예: `rm -r -f` 분리 플래그, `source .env`)은 테스트에 *정보용*으로 명시 —
  가드는 우발적 실수를 줄이는 트립와이어이지 작정한 우회를 막지 않는다. ".env 커밋"은 .gitignore + lefthook `no-env` 로 별도 방어.

## 피드백 사다리
PostToolUse(포맷+lint, ms) → pre-commit([.lefthook.yml](../.lefthook.yml), typecheck·lint·test·guard-selftest·no-env, s) → CI([.github/workflows/ci.yml](../.github/workflows/ci.yml), min) → 사람(h).
