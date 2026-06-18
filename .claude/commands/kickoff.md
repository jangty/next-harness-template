---
description: 프로젝트 시작 — 깊이 우선 발견 인터뷰로 제품 명세(브리프·요구사항·화면설계)를 확정
---

> 🧭 **프로젝트의 0→1.** 코드 한 줄 전에 *무엇을 · 누구를 위해 · 왜 · 어떤 화면으로* 만드는지 확정한다.
> 바이브코딩이 혼란을 쌓는 지점이 바로 여기 — 명세 없이 시작하는 것. **계획이 곧 작업이다.**
> 방법론·점수·작성 컨벤션(한질문·모호도·topology·ontology·challenge·유저스토리·EARS·MoSCoW·ux-spec)은 `requirements-discovery` 스킬을 따른다. 이 파일은 *오케스트레이션*이다.

산출물은 `docs/product/` 에 쓰고, 거기서 기존 기록 시스템(ADR·exec-plan·HANDOFF·CLAUDE.md)으로 흘려보낸다 — 별도 시스템을 만들지 않는다.

## 절차 (단계마다 사람과 확인 — 몰래 진행 금지)

**Phase 0 — 토폴로지 게이트 (Capture & lock).**
사용자의 아이디어를 한 문단으로 받아 되비추고, "누구를 위해 / 어떤 문제를 / 어떻게" 한 문장으로 확인받는다. 제품의 top-level 컴포넌트를 **1~6개로 열거·확정·잠근다**("이렇게 N개로 읽었는데 맞나? 추가/삭제/병합/연기?"). 이미 `brief.md` 가 채워져 있으면(센티넬 `kickoff:pending` 없음) 새로 시작할지 갱신할지 묻는다.

**Phase 1 — 발견 인터뷰 (Discover, 깊이 우선).**
`requirements-discovery` 스킬대로: **한 번에 한 질문**, 최약 차원 타겟팅, 매 라운드 모호도 표 표시. 빈칸은 추측 말고 묻는다(§andrej-karpathy 1). 가정을 깬다 — **R4 Contrarian / R6 Simplifier / R8 Ontologist**. **모호도 ≤ 0.20** 까지 루프한다. (R3+ 사용자가 "그만/짓자" 하면 잔여 갭을 경고하고 조기 종료 허용.)
다룰 주제: 문제·동기 / 사용자·페르소나 / 핵심 작업(JTBD) / 가치·차별점 / 성공 지표 / 제약 / 비목표.

**Phase 2 — Ontology 수렴 (Domain model seed).**
인터뷰 중 거론된 핵심 엔티티(명사)를 추적하고 안정화를 확인한다. 이 도메인 모델이 데이터 설계(`prisma/schema.prisma` · `docs/data.md`)의 씨앗이 된다.

**Phase 3 — 화면 설계 (Screen design).**
확정된 FR에서 화면을 뽑는다: 화면 인벤토리(ID·목적·**역추적 FR**) → 핵심 유저 플로우 → 화면별 상태(default/empty/loading/error/무권한). `docs/product/ux-spec.md` 에 작성. (화면은 기획 컨센서스가 손가락으로 가리켜지는 곳 — 합의가 여기서 굳는다.)

**Phase 4 — 명세 결정화 (Synthesize).**
답을 세 문서로 정리한다:
- `docs/product/brief.md` — 문제·사용자·가치·성공지표·범위·비목표 (PRD-lite).
- `docs/product/requirements.md` — 기능요건(유저스토리 + 수용기준 Given/When/Then) + 비기능요건(NFR).
- `docs/product/ux-spec.md` — 화면 인벤토리·유저 플로우·화면별 상태.
범위는 MoSCoW + **레버리지 질문**("뭘 잘 풀면 다른 5개가 사라지나")으로 가장 얇은 MVP를 잘라 `brief.md` 범위 절에 기록.

**Phase 5 — 결정 표면화 & 핸드오프 (Surface & handoff).**
- **ADR 스텁**: 명세가 함의하는 아키텍처 결정(인가 모델·데이터 경계·호스팅·핵심 연동)을 `docs/adr/NNNN-*.md` `상태: 제안됨` 으로(미리 정하지 말 것 — `0000-template.md` 복사).
- **exec-plan**: `docs/exec-plans/active/001-mvp-build.md` 생성 — MVP 범위에서 목표·단계·DoD·검증을 뽑아(`docs/exec-plans/README.md` 형식).
- **HANDOFF**: `docs/HANDOFF.md` 갱신 — 현재 상태=명세 정의됨, 다음 진입점=스캐폴딩.
- **CLAUDE.md**: 제목의 프로젝트명을 실제 이름으로 교체. 확정된 결정이 있으면 불변식 한 줄 추가.
- **센티넬 제거**: `brief.md`·`requirements.md`·`ux-spec.md` 핵심 절이 다 차면 각 맨 위 `<!-- kickoff:pending ... -->` 줄을 **제거**한다 → SessionStart 넛지가 꺼진다(세 줄 다 제거돼야).

## 정의 완료 (Definition of Ready — 이게 충족돼야 코딩 시작)
- [ ] **모호도 ≤ 0.20** (자평 수렴 신호 — 모호한 "잘 되게" 금지, §andrej-karpathy 4).
- [ ] `brief.md`·`requirements.md`·`ux-spec.md` 핵심 절에 TODO 플레이스홀더가 없다.
- [ ] 모든 Must-have 요건에 수용기준(Given/When/Then)이 붙어 있다.
- [ ] 성공 지표가 측정 가능하다.
- [ ] 비목표가 적혀 있다.
- [ ] MVP 슬라이스가 정의됐고 레버리지를 검토했다.
- [ ] **화면 인벤토리 + 핵심 플로우가 정의됐고**, 각 화면이 FR로 역추적된다.
- [ ] Round 0 토폴로지의 모든 컴포넌트가 커버됐다(빠진 형제 없음).
- [ ] 함의된 아키텍처 결정이 ADR 스텁으로 잡혀 있다.

> 약한 기준은 끊임없는 재확인을 부른다. DoR 게이트(특히 모호도 임계)를 통과한 뒤에야 스캐폴딩으로 넘어간다.
