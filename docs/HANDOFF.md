# HANDOFF

> 새 세션의 진입점. SessionStart 훅이 이 파일을 자동 주입한다.
> 산문(요약/남은 TODO/다음 진입점)은 사람·에이전트가 작성하고, 하단 Session log 는 Stop 훅이 기계적으로 채운다.

## 현재 상태
하네스 골격 셋업 완료(템플릿 기준선). 아직 앱 코드/의존성은 없음(베이스 스택 미설치).

## 남은 TODO (다음 진입점 후보)
- [ ] 베이스 스택 스캐폴딩: `create-next-app` + Tailwind v4 + shadcn/ui + Supabase + Prisma (공식 문서/Context7로 최신 문법 확인 후).
- [ ] 의존성 설치 후 `npm run typecheck|lint|test|build` 스크립트 정의 → 훅/lefthook 가 실제 작동.
- [ ] `npx lefthook install` 로 pre-commit 활성화.
- [ ] 첫 ADR 작성: 아키텍처 레이어 구성, 인가 모델(RLS vs 앱 레이어).
- [ ] 경계 린트 규칙([eslint.config.mjs](../eslint.config.mjs)) ADR 결정 후 활성화.
- [ ] `src/env.ts` 환경변수 스키마 채우기.

## 다음 진입점
위 TODO 중 "베이스 스택 스캐폴딩"부터. 스택을 얹은 뒤 docs 슬롯을 채우며 불변식을 인코딩한다.

## Session log
> Stop 훅이 세션 종료마다 기계적 스탬프를 추가합니다. 산문 요약은 위 섹션들에 직접 작성하세요.

<!-- session-stamp -->
- **2026-06-17T22:17:00.875Z** · branch `(no git)` · last `(no commits)`
  - 미커밋 변경:
```
?? .claude/
?? .env.example
?? .gitignore
?? .lefthook.yml
?? .omc/
?? CLAUDE.md
?? docs/
?? eslint.config.mjs
?? scripts/
?? src/
```

<!-- session-stamp -->
- **2026-06-17T22:27:02.510Z** · branch `(no git)` · last `(no commits)`
  - 미커밋 변경:
```
?? .claude/
?? .env.example
?? .github/
?? .gitignore
?? .lefthook.yml
?? .omc/
?? CLAUDE.md
?? docs/
?? eslint.config.mjs
?? scripts/
?? src/
```

<!-- session-stamp -->
- **2026-06-17T22:38:53.165Z** · branch `(no git)` · last `(no commits)`
  - 미커밋 변경:
```
?? .claude/
?? .env.example
?? .github/
?? .gitignore
?? .lefthook.yml
?? .omc/
?? CLAUDE.md
?? README.md
?? docs/
?? eslint.config.mjs
?? scripts/
?? src/
```

<!-- session-stamp -->
- **2026-06-17T22:51:21.249Z** · branch `(no git)` · last `(no commits)`
  - 미커밋 변경:
```
?? .claude/
?? .env.example
?? .github/
?? .gitignore
?? .lefthook.yml
?? .omc/
?? CLAUDE.md
?? README.md
?? docs/
?? eslint.config.mjs
?? scripts/
?? src/
```

<!-- session-stamp -->
- **2026-06-17T22:59:08.400Z** · branch `(no git)` · last `(no commits)`
  - 미커밋 변경:
```
?? .claude/
?? .env.example
?? .github/
?? .gitignore
?? .lefthook.yml
?? CLAUDE.md
?? README.md
?? docs/
?? eslint.config.mjs
?? scripts/
?? src/
```
