# 하네스 엔지니어링 템플릿 (Next.js 풀스택)

> AI 에이전트(Claude Code)가 **안전하고 신뢰성 있게** 일하도록 설계된 프로젝트 골격.
> 앱 코드를 얹기 전에 **방어·기록·검증 메커니즘**부터 깔아두는 템플릿이다.
>
> **스택**: Next.js(프론트+백) · TypeScript · Tailwind v4 + shadcn/ui · Supabase(Auth+Postgres) · Prisma · Docker Compose · GitHub Actions → SSH 배포

---

## 1. 이게 뭔가

보통은 코드를 먼저 짜고 가드레일을 나중에 붙인다. 이 템플릿은 **반대**다 — 에이전트가 실수할 여지를
기계로 막는 **하네스(harness)** 를 먼저 깔고, 그 위에 스택을 스캐폴딩한다.

"하네스"는 에이전트를 감싸는 **작업 치구(jig)** 다. 사람이 말로 "비밀 파일 건드리지 마"라고 하는 대신,
훅·권한·린트·CI 가 **물리적으로** 막는다. 핵심 믿음 한 줄:

> **적어둔 방어 ≠ 동작하는 방어.** 금지는 말이 아니라 기계로 강제한다.

이 골격은 OpenAI Harness Engineering 개념을 Claude Code 의 훅/권한/명령/스킬 시스템 위에 구현한 것이다.
전체 설계 근거는 [docs/harness-spec.md](docs/harness-spec.md) 참고.

---

## 2. 6가지 메타 원칙

모든 작업에 적용되는 운영 철학. (전체: [CLAUDE.md](CLAUDE.md))

| # | 원칙 | 의미 |
|---|---|---|
| 1 | **맵, 매뉴얼 아님** | `CLAUDE.md` 는 짧은 라우팅 지도. 상세·결정은 `docs/` 로. 컨텍스트는 희소 자원. |
| 2 | **불변식은 기계 강제** | 금지는 훅·린트·권한으로. "말로만 금지" 금지. |
| 3 | **에이전트 가독성** | 컨텍스트에서 못 보면 없는 것. 암묵지는 마크다운으로 인코딩. |
| 4 | **검증은 컨텍스트 효율** | 성공은 침묵, 실패만 자세히. |
| 5 | **고위험엔 사람** | 배포·마이그레이션·파괴적 작업은 사람 게이트. |
| 6 | **반복 하드닝** | 막히면 메커니즘 하나 추가 + `docs/lessons.md` 에 기록. |

---

## 3. 핵심 용어

| 용어 | 뜻 |
|---|---|
| **하네스 (Harness)** | 에이전트를 감싸는 메커니즘 총체 — 훅·권한·문서·명령·스킬·CI. |
| **불변식 (Invariant)** | 반드시 지켜야 할 규칙. 코드로 승격해 기계가 강제한다. |
| **강제 메커니즘** | 불변식을 강제하는 실체 — 가드 훅, 경계 린트, 권한 deny 등. |
| **피드백 사다리** | 검증을 빠른 레이어부터: PostToolUse(ms) → pre-commit(s) → CI(min) → 사람(h). 빠를수록 컨텍스트가 깨끗. |
| **트립와이어 vs 1차 방어** | 권한 `deny` 는 우회 가능한 경보(트립와이어), 실제 차단은 **가드 훅**이 한다. |
| **ADR** | Architecture Decision Record — 주요 결정의 "왜" 를 남기는 문서. |
| **exec-plan** | 일급 아티팩트로서의 작업 계획. 큰 일은 먼저 계획을 적고 진행. |
| **HANDOFF** | 세션 연속성 진입점. 다음 세션이 이어받을 상태·TODO·진입점. |

---

## 4. 무엇이 들어 있나

```
CLAUDE.md                  # 맵: 라우팅 + 메타 원칙 + 불변식(누적). ≤150줄.
.claude/
  settings.json            # 권한(allow/ask/deny) + 훅 등록
  commands/                # 사용자 호출 명령 (/kickoff /commit /review /deploy /cleanup)
  skills/                  # 자동 활성 스킬 (requirements-discovery, feature-slice, ui-component)
  agents/                  # 위임 서브에이전트 (code-reviewer, security-reviewer — 적대적 리뷰)
scripts/hooks/
  guard-pretooluse.mjs       # ① 비밀파일 ② 산출물 편집 ③ 파괴적 명령 차단
  guard-pretooluse.check.mjs # 가드 회귀 테스트 (의존성 없음)
  posttooluse-format.mjs     # 변경 파일만 포맷+lint (성공 침묵)
  session-start.mjs          # 제품명세 게이트 + git log + HANDOFF + exec-plan + lessons 주입 (컴팩션 후 재발화)
  session-end-handoff.mjs    # 세션 종료 시 HANDOFF Session log 스탬프 (세션별 1줄, 최근 12개)
.lefthook.yml              # pre-commit 게이트 (typecheck·lint·test·가드·no-env)
.github/workflows/ci.yml   # CI 게이트 (가드 self-test + 검증)
eslint.config.mjs          # 경계 린트 틀 (의존성 방향 강제 — ADR 후 활성화)
src/env.ts                 # 환경변수 검증 (loud fail — 스키마는 채울 슬롯)
.env.example               # 환경변수 예시 (실제 값은 .env, 커밋 금지)
.mcp.json                  # MCP 서버 (Context7 — 공식 문서 조회, 비밀 미포함)
docs/                      # 기록 시스템 (아래 표)
```

### docs/ — 기록 시스템

| 문서 | 내용 |
|---|---|
| [HANDOFF.md](docs/HANDOFF.md) | **새 세션의 진입점.** 현재 상태·남은 TODO·다음 진입점. |
| [product/](docs/product/) | **제품 명세(WHAT/WHY).** 브리프(PRD-lite)·요구사항(유저스토리+수용기준·NFR)·화면설계(인벤토리·플로우·상태). `/kickoff`(깊이 우선·모호도 게이트)로 채움. |
| [architecture.md](docs/architecture.md) | 아키텍처 맵·레이어·경계 |
| [design-system.md](docs/design-system.md) | UI 토큰·컴포넌트 컨벤션 |
| [data.md](docs/data.md) | 데이터 접근·마이그레이션 절차 |
| [security.md](docs/security.md) | 인증/인가 모델·비밀 취급 |
| [state.md](docs/state.md) | 상태 관리 범위 |
| [verification.md](docs/verification.md) | 검증 경로(단위·E2E·런타임)·피드백 사다리 |
| [deploy.md](docs/deploy.md) | 배포 흐름·롤백 |
| [adr/](docs/adr/) | 주요 결정의 "왜" (템플릿: `0000-template.md`) |
| [exec-plans/](docs/exec-plans/) | 진행 중/완료/기술부채 계획 |
| [lessons.md](docs/lessons.md) | 막혔던 지점·교훈(반복 하드닝 기록) |
| [harness-spec.md](docs/harness-spec.md) | 이 템플릿의 설계 근거("왜") |
| [andrej-karpathy-CLAUDE.md](docs/andrej-karpathy-CLAUDE.md) | 코딩 행동 수칙(LLM 실수 줄이기) |

> 대부분의 docs 는 **슬롯**이다 — 다뤄야 할 주제만 적혀 있고, 결정·상세는 개발하며 채운다.

---

## 5. 새 프로젝트 시작하기

### 5.1 복사

```bash
# 이 템플릿을 새 프로젝트로 복사 (런타임·산출물 제외)
cp -r harness-test my-project
cd my-project
rm -rf node_modules .next .omc .git   # 런타임/산출물/세션 상태 제거
git init
```

그 다음 [CLAUDE.md](CLAUDE.md) 제목의 `<프로젝트명>` 을 실제 이름으로 바꾼다.

### 5.2 부트스트랩 순서

[docs/HANDOFF.md](docs/HANDOFF.md) 의 TODO 가 곧 체크리스트다:

0. **제품 명세 확정 (선행)** — `/kickoff` 깊이 우선 발견 인터뷰(한질문·모호도 게이트·challenge)로 `docs/product/{brief,requirements,ux-spec}.md` 작성.
   *명세 없이 스캐폴딩 금지 — SessionStart 훅이 세 문서 센티넬로 게이트한다(DoR·모호도 임계 통과까지). 발견 깊이 격상 근거: ADR-0001.*
1. **베이스 스택 스캐폴딩** — `create-next-app` + Tailwind v4 + shadcn/ui + Supabase + Prisma.
   *(도구별 최신 문법은 추측 말고 공식 문서/Context7 확인 후.)*
2. **npm 스크립트 정의** — `typecheck` · `lint` · `test` · `build` (+ `test:related`).
   → 이 순간부터 훅·lefthook·CI 가 **실제로** 작동한다.
3. **`npx lefthook install`** — pre-commit 게이트 활성화.
4. **첫 ADR 작성** — 아키텍처 레이어 구성, 인가 모델(RLS vs 앱 레이어). → [docs/adr/](docs/adr/)
5. **경계 린트 활성화** — ADR 결정 후 [eslint.config.mjs](eslint.config.mjs) 규칙 채움.
6. **`src/env.ts` 스키마 채우기** — 실제 환경변수 검증(zod 등).

> **중요**: 훅·권한은 **세션 시작 시 스냅샷**된다. 새로 만든/고친 가드는 **다음 세션부터** 작동한다.

---

## 6. 일상 사용법

### 6.1 명령 (사용자가 호출)

| 명령 | 목적 |
|---|---|
| `/kickoff` | **프로젝트 시작** — 깊이 우선 발견 인터뷰(모호도 게이트)로 제품 명세(브리프·요구사항·화면설계) 확정 (→ ADR·exec-plan·HANDOFF) |
| `/commit` | 검증(typecheck→lint→test) 통과 후 컨벤셔널 커밋 |
| `/review` | diff **적대적 리뷰** — fresh 서브에이전트(`code-reviewer`/`security-reviewer`) 위임 (타입·린트·불변식·정의완료·비밀/산출물) |
| `/deploy` | 배포 (**고위험 — 사람 게이트**) |
| `/cleanup` | 엔트로피 GC (죽은 코드·미사용 의존성·docs 신선도) |

### 6.2 스킬 (자동 활성)

- **requirements-discovery** — "새 프로젝트/뭐 만들지/요구사항 정의/화면 설계" 시 → 깊이 우선 발견 인터뷰(한질문·모호도·challenge)로 명세화.
- **feature-slice** — "기능 추가/새 페이지·엔드포인트" 요청 시 → 수직 슬라이스 스캐폴딩.
- **ui-component** — "컴포넌트/버튼/폼 만들어줘" 시 → Tailwind v4 + shadcn 컨벤션 적용.

**에이전트(위임·읽기전용)**: `code-reviewer`·`security-reviewer` — `/review` 가 **fresh 컨텍스트**에 위임하는 적대적 리뷰어(작성자 편향 제거). 수정은 메인 세션이 한다.

### 6.3 작업 흐름

1. 새 세션 → SessionStart 훅이 **HANDOFF + 진행 중 계획 + lessons + git log** 자동 주입 (+ 제품 명세 미정의 시 `/kickoff` 넛지).
2. 작업 → 편집할 때마다 PostToolUse 가 **변경 파일만 포맷+lint**(성공은 침묵).
3. 위험한 짓을 시도하면 → 가드 훅이 **차단 + 사유·대안 출력**.
4. 커밋 → pre-commit 이 typecheck·lint·test·가드 self-test·비밀 차단 재확인.
5. 새 결정 → **ADR 기록** + `CLAUDE.md` 불변식에 한 줄 추가.
6. 막히면 → 메커니즘 하나 추가 + `docs/lessons.md` 기록(반복 하드닝).
7. 세션 종료 → SessionEnd 훅이 HANDOFF Session log 갱신(세션별 1줄, 다음 세션 연속성).

---

## 7. 안전 장치

- **비밀 삼중 방어** — 가드 훅(`.env*` 읽기·cat·스테이징 차단) + 권한 `deny` + `.gitignore` + lefthook `no-env`.
  `.env.example` 같은 안전 템플릿은 예외 처리됨.
- **파괴적 명령 차단** — `rm -rf`, `git push --force`, `reset --hard`, `drop/truncate` 등(가드는 트립와이어 —
  우발적 실수를 막지 작정한 우회를 막진 않는다).
- **고위험엔 사람** — 배포·DB 마이그레이션·원격 명령은 권한 `ask` 로 사람 승인.
- **가드 자기검증** — 가드가 회귀하면 커밋/CI 가 막힌다:

```bash
node scripts/hooks/guard-pretooluse.check.mjs   # 의존성 없음, 즉시 실행 가능
```

---

## 8. 더 읽을 것

- 운영 철학·라우팅 전체: [CLAUDE.md](CLAUDE.md)
- 설계 근거(왜 이렇게 만들었나): [docs/harness-spec.md](docs/harness-spec.md)
- 검증 경로·피드백 사다리: [docs/verification.md](docs/verification.md)
- 막힘·교훈 누적: [docs/lessons.md](docs/lessons.md)
