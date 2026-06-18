---
description: 프로젝트 시작 — 발견 인터뷰로 제품 명세(브리프·요구사항)를 확정
---

> 🧭 **프로젝트의 0→1.** 코드 한 줄 전에 *무엇을 · 누구를 위해 · 왜* 만드는지 확정한다.
> 바이브코딩이 혼란을 쌓는 지점이 바로 여기 — 명세 없이 시작하는 것. 이 명령이 그걸 막는다.
> 방법론·작성 컨벤션(유저스토리·수용기준·EARS·MoSCoW)은 `requirements-discovery` 스킬을 따른다.

산출물은 `docs/product/` 에 쓰고, 거기서 기존 기록 시스템(ADR·exec-plan·HANDOFF·CLAUDE.md)으로 흘려보낸다 — 별도 시스템을 만들지 않는다.

## 절차 (단계마다 사람과 확인 — 몰래 진행 금지)

1. **포착 (Capture)** — 사용자의 아이디어를 한 문단으로 받아 되비춘다.
   - "누구를 위해 / 어떤 문제를 / 어떻게 푸는가" 한 문장 요약을 만들고 사용자에게 확인받는다.
   - 이미 `docs/product/brief.md` 가 채워져 있으면(센티넬 `kickoff:pending` 없음) 새로 시작할지 갱신할지 묻는다.

2. **발견 인터뷰 (Discover)** — 질문을 **묶음으로** 던진다(한 번에 하나씩 묻지 말 것). 빈칸은 추측하지 말고 묻는다(§andrej-karpathy 1):
   - 문제 & 동기 — 어떤 고통인가, 왜 지금, 지금은 어떻게(현 대안)?
   - 사용자 & 페르소나 — 1차/2차 사용자는 누구?
   - 핵심 작업(JTBD) — 사용자가 이걸로 끝내려는 일 3가지?
   - 가치 & 차별점 — 기존 대안 대비 왜 더 나은가?
   - 성공 지표 — 무엇이 측정되면 성공인가?
   - 제약 — 기간·예산·규모·규정(개인정보·결제)·플랫폼?
   - 비목표(Non-goals) — 이번엔 명시적으로 안 할 것?

3. **명세 작성 (Synthesize)** — 답을 두 문서로 정리한다:
   - `docs/product/brief.md` — 문제·사용자·가치·성공지표·범위·비목표 (PRD-lite).
   - `docs/product/requirements.md` — 기능요건을 **유저스토리 + 수용기준(Given/When/Then)** 으로, 비기능요건(NFR)을 명시적으로. (스킬의 컨벤션을 따른다.)

4. **범위 & MVP (Scope)** — MoSCoW(Must/Should/Could/Won't)로 분류하고, 가치 있는 **가장 얇은 MVP**를 잘라낸다. `brief.md` 범위 절에 기록.

5. **결정 표면화 → ADR (Surface decisions)** — 명세가 함의하는 아키텍처 결정(인가 모델·데이터 경계·호스팅·핵심 연동)을 나열한다. **미리 정하지 말고** `docs/adr/NNNN-*.md` 스텁을 `상태: 제안됨` 으로 만든다(템플릿 규칙: 보안/아키텍처는 ADR로 — `docs/adr/0000-template.md` 복사).

6. **핸드오프 연결 (Handoff)** — 명세를 기록 시스템에 잇는다:
   - `docs/exec-plans/active/001-mvp-build.md` 생성 — MVP 범위에서 목표·단계·DoD·검증을 뽑아(`docs/exec-plans/README.md` 형식).
   - `docs/HANDOFF.md` 갱신 — 현재 상태=명세 정의됨, 다음 진입점=스캐폴딩.
   - `CLAUDE.md` 의 프로젝트명(제목)을 실제 이름으로 교체. 확정된 결정이 있으면 불변식 한 줄 추가.
   - `brief.md`·`requirements.md` 핵심 절이 다 차면 맨 위 센티넬 `<!-- kickoff:pending ... -->` 줄을 **제거**한다 → SessionStart 넛지가 꺼진다.

## 정의 완료 (Definition of Ready — 이게 충족돼야 코딩 시작)
- [ ] `brief.md`·`requirements.md` 핵심 절에 TODO 플레이스홀더가 남아있지 않다.
- [ ] 모든 Must-have 요건에 수용기준(Given/When/Then)이 붙어 있다.
- [ ] 성공 지표가 측정 가능하다(모호한 "잘 되게" 금지 — §andrej-karpathy 4).
- [ ] 비목표가 적혀 있다.
- [ ] MVP 슬라이스가 정의됐다.
- [ ] 함의된 아키텍처 결정이 ADR 스텁으로 잡혀 있다.

> 약한 기준은 끊임없는 재확인을 부른다. DoR 게이트를 통과한 뒤에야 스캐폴딩으로 넘어간다.
