# <프로젝트명> — 맵 (Map, not Manual)
<!-- 템플릿: 복사 후 <프로젝트명> 을 실제 이름으로 교체하세요. -->

> 이 파일은 **짧은 지도**다. 상세·결정은 `docs/`에 있다. 컨텍스트는 희소 자원이므로 여기엔 라우팅만 둔다.
> 스택: Next.js(프론트+백) · TypeScript · Tailwind v4 + shadcn/ui · Supabase(Auth+Postgres) · Prisma · Docker Compose · GitHub Actions → SSH 배포

## 세션 진입점
새 세션은 `docs/HANDOFF.md`에서 시작한다. 진행 중 계획은 `docs/exec-plans/active/`에 있다. (둘 다 SessionStart 훅이 자동 주입)

## 무엇이 어디 있는지 (라우팅)
| 찾는 것 | 위치 |
|---|---|
| 아키텍처 맵·경계 | [docs/architecture.md](docs/architecture.md) |
| UI 토큰·컴포넌트 컨벤션 | [docs/design-system.md](docs/design-system.md) |
| 데이터 접근·마이그레이션 | [docs/data.md](docs/data.md) |
| 인증/인가·비밀 취급 모델 | [docs/security.md](docs/security.md) |
| 상태 관리 범위 | [docs/state.md](docs/state.md) |
| 검증 경로(단위·E2E·런타임) | [docs/verification.md](docs/verification.md) |
| 배포 흐름·롤백 | [docs/deploy.md](docs/deploy.md) |
| 주요 결정의 "왜" | [docs/adr/](docs/adr/) |
| 진행 중/완료/기술부채 계획 | [docs/exec-plans/](docs/exec-plans/) |
| 막혔던 지점·교훈 | [docs/lessons.md](docs/lessons.md) |
| 코딩 행동 수칙 (생각·단순·수술적·목표) | [docs/andrej-karpathy-CLAUDE.md](docs/andrej-karpathy-CLAUDE.md) |
| 하네스 골격 스펙 (이 템플릿의 "왜") | [docs/harness-spec.md](docs/harness-spec.md) |

## 강제 메커니즘 (말이 아닌 기계)
| 무엇 | 어디서 |
|---|---|
| 권한 (allow/ask/deny) | [.claude/settings.json](.claude/settings.json) |
| 가드 훅 (비밀파일·산출물·파괴적 명령 차단) | [scripts/hooks/guard-pretooluse.mjs](scripts/hooks/guard-pretooluse.mjs) |
| 포맷+린트 (변경 파일만) | [scripts/hooks/posttooluse-format.mjs](scripts/hooks/posttooluse-format.mjs) |
| pre-commit (typecheck·lint·test·가드 self-test·no-env) | [.lefthook.yml](.lefthook.yml) |
| CI (원격 게이트 — 동일 검증 재확인) | [.github/workflows/ci.yml](.github/workflows/ci.yml) |
| 경계 린트 틀 | [eslint.config.mjs](eslint.config.mjs) |
| env 검증 (loud fail) | [src/env.ts](src/env.ts) |

## 명령 & 스킬
- 명령(사용자 호출): `/commit` · `/review` · `/deploy`(고위험) · `/cleanup` — [.claude/commands/](.claude/commands/)
- 스킬(자동): 기능 수직 슬라이스 · UI 컴포넌트 추가 — [.claude/skills/](.claude/skills/)

## 작업 방식 (메타 원칙)
1. **맵, 매뉴얼 아님** — 상세는 docs로. 여긴 라우팅만.
2. **불변식은 기계 강제** — 금지는 훅·린트·권한으로. "말로만 금지" 금지.
3. **에이전트 가독성** — 컨텍스트에서 못 보면 없는 것. 암묵지는 마크다운으로 인코딩.
4. **검증은 컨텍스트 효율** — 성공은 침묵, 실패만 자세히.
5. **고위험엔 사람** — 배포·마이그레이션·파괴적 작업은 사람 게이트.
6. **반복 하드닝** — 막히면 메커니즘 하나 추가 + `docs/lessons.md`에 기록.

도구별 최신 설정은 추측 금지 — 공식 문서/Context7 확인 후 적용. 설계 결정은 미리 못박지 말고 ADR로 기록.

## 코딩 행동 수칙 (LLM 흔한 실수 줄이기 — 전체: [docs/andrej-karpathy-CLAUDE.md](docs/andrej-karpathy-CLAUDE.md))
> 신중함을 속도보다 우선. 사소한 작업엔 판단으로.
1. **생각 먼저** — 가정은 명시하고 불확실하면 묻는다. 해석이 갈리면 몰래 고르지 말고 제시. 더 단순한 길이 보이면 말한다.
2. **단순함 우선** — 문제를 푸는 최소 코드. 요청 안 한 기능·추상화·"유연성"·불가능 시나리오 처리 금지. 200줄이 50줄로 되면 다시 쓴다.
3. **수술적 변경** — 건드릴 것만. 인접 코드 "개선"·무관한 리팩터 금지, 기존 스타일을 따른다. 내 변경이 만든 고아만 정리. 모든 변경 줄은 요청으로 추적된다.
4. **목표 주도** — 작업을 검증 가능한 목표로 바꾸고("검증: <체크>" 명시) 통과까지 루프. 약한 기준("동작하게")은 끊임없는 재확인을 부른다.

## 불변식 (Invariants)
> 초기엔 비어 있다. 결정이 내려질 때마다 한 줄씩 추가한다.
> 형식: `- <규칙> (왜 → docs/adr/NNN) (강제 → 린트 규칙명 / 훅 파일)`

_(아직 없음)_
