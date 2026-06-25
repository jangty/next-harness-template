# HANDOFF

> 새 세션의 진입점. SessionStart 훅이 이 파일을 자동 주입한다.
> 산문(요약/남은 TODO/다음 진입점)은 사람·에이전트가 작성하고, 하단 Session log 는 SessionEnd 훅이 기계적으로 채운다.

## 현재 상태
하네스 골격 셋업 완료(템플릿 기준선). **제품 명세 미정의**(`docs/product/` 슬롯 비어 있음) · 앱 코드/의존성 없음(베이스 스택 미설치).
- **하네스 하드닝(2026-06-25)**: 공식 베스트프랙티스 감사 후 4건 적용 — ① 적대적 리뷰 서브에이전트(`.claude/agents/code-reviewer·security-reviewer`, `/review` 가 위임) ② Context7 MCP 연결(`.mcp.json` — "공식 문서 확인" 지시를 실행 가능하게) ③ 핸드오프 훅 `Stop`→`SessionEnd`(매 턴→세션별 1회) ④ 컴팩션 보존(SessionStart 가 `compact` 소스로 재주입 + CLAUDE.md 지시).

## 남은 TODO (다음 진입점 후보)
- [ ] **제품 명세 확정 (선행)**: `/kickoff` 깊이 우선 발견 인터뷰(모호도 게이트) → `docs/product/{brief,requirements,ux-spec}.md`. 함의된 결정은 ADR 스텁, MVP는 exec-plan 으로. 스캐폴딩보다 먼저. (발견 깊이 격상 근거: ADR-0001)
- [ ] 베이스 스택 스캐폴딩: `create-next-app` + Tailwind v4 + shadcn/ui + Supabase + Prisma (공식 문서/Context7로 최신 문법 확인 후).
- [ ] 의존성 설치 후 `npm run typecheck|lint|test|build` 스크립트 정의 → 훅/lefthook 가 실제 작동.
- [ ] `npx lefthook install` 로 pre-commit 활성화.
- [ ] 첫 ADR 작성: 아키텍처 레이어 구성, 인가 모델(RLS vs 앱 레이어).
- [ ] 경계 린트 규칙([eslint.config.mjs](../eslint.config.mjs)) ADR 결정 후 활성화.
- [ ] `src/env.ts` 환경변수 스키마 채우기.

## 다음 진입점
제품 명세가 아직 없다 → **`/kickoff` 먼저.** 명세(DoR 게이트 통과) 확정 후 "베이스 스택 스캐폴딩"으로. 스택을 얹은 뒤 docs 슬롯을 채우며 불변식을 인코딩한다.

## Session log
> SessionEnd 훅이 세션 종료 시 기계적 스탬프를 추가합니다. 산문 요약은 위 섹션들에 직접 작성하세요.

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

<!-- session-stamp -->
- **2026-06-18T00:04:56.438Z** · branch `main` · last `864ffdc first commit`
  - 미커밋 변경:
```
M CLAUDE.md
 M README.md
 M docs/HANDOFF.md
 M docs/harness-spec.md
 M scripts/hooks/session-start.mjs
?? .claude/commands/kickoff.md
?? .claude/skills/requirements-discovery/
?? docs/product/
```

<!-- session-stamp -->
- **2026-06-18T02:19:17.399Z** · branch `main` · last `f953077 feat(kickoff): 프로젝트 시작 요구사항 발견 절차 추가`
  - 작업 트리 깨끗함

<!-- session-stamp -->
- **2026-06-18T21:35:21.734Z** · branch `main` · last `f953077 feat(kickoff): 프로젝트 시작 요구사항 발견 절차 추가`
  - 미커밋 변경:
```
M docs/HANDOFF.md
```

<!-- session-stamp -->
- **2026-06-18T22:15:52.312Z** · branch `main` · last `f953077 feat(kickoff): 프로젝트 시작 요구사항 발견 절차 추가`
  - 미커밋 변경:
```
M .claude/commands/kickoff.md
 M .claude/skills/requirements-discovery/SKILL.md
 M CLAUDE.md
 M README.md
 M docs/HANDOFF.md
 M docs/harness-spec.md
 M docs/product/README.md
 M docs/product/requirements.md
 M scripts/hooks/session-start.mjs
?? docs/adr/0001-requirements-discovery-depth.md
?? docs/product/ux-spec.md
```

<!-- session-stamp -->
- **2026-06-18T22:29:39.027Z** · branch `main` · last `1418955 feat(kickoff): 발견 인터뷰를 깊이 우선·모호도 게이트로 격상 + 화면설계 다리 신설`
  - 작업 트리 깨끗함

<!-- session-stamp -->
- **2026-06-25T03:52:08.672Z** · branch `main` · last `1418955 feat(kickoff): 발견 인터뷰를 깊이 우선·모호도 게이트로 격상 + 화면설계 다리 신설`
  - 미커밋 변경:
```
M docs/HANDOFF.md
```

<!-- session-stamp -->
- **2026-06-25T04:07:16.978Z** · branch `main` · last `1418955 feat(kickoff): 발견 인터뷰를 깊이 우선·모호도 게이트로 격상 + 화면설계 다리 신설`
  - 미커밋 변경:
```
M docs/HANDOFF.md
```

<!-- session-stamp -->
- **2026-06-25T04:08:32.850Z** · branch `main` · last `1418955 feat(kickoff): 발견 인터뷰를 깊이 우선·모호도 게이트로 격상 + 화면설계 다리 신설`
  - 미커밋 변경:
```
M docs/HANDOFF.md
```
