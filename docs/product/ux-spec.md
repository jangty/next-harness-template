<!-- kickoff:pending — /kickoff Phase 3 가 화면 인벤토리·핵심 플로우를 채우면 이 줄을 제거한다. brief.md·requirements.md 와 함께 관리(세 줄 다 제거돼야 SessionStart 넛지가 꺼진다). -->
# UX Spec — 화면 설계 (기획 컨센서스)

> **슬롯.** 요구사항(WHAT)과 디자인 시스템(HOW — 토큰) 사이의 다리 — *어떤 화면으로* 푸는가.
> 기획 합의는 화면에서 가장 가시적으로 형성된다(유저스토리는 추상적이라 합의한 척하기 쉽다 — 화면은 손가락으로 가리킬 수 있다).
> 작성 컨벤션은 `requirements-discovery` 스킬. 토큰·primitive 는 [docs/design-system.md](../design-system.md) + `ui-component` 스킬.

## 화면 인벤토리
> 각 화면을 FR 로 역추적한다(requirement→screen→component 추적성). FR 은 [requirements.md](requirements.md) 참조.

| ID | 화면 | 목적 | 역추적 FR |
|---|---|---|---|
| S-01 | _<로그인>_ | _<…>_ | FR-001 |
| S-02 | _<…>_ | _<…>_ | _<…>_ |

## 유저 플로우
> 핵심 경로를 `S-01→S-03→S-02` 표기로. 분기·되돌아오기 포함.

- _신규 가입_: _S-01 → S-03 → S-02_
- _핵심 작업(JTBD)_: _…_

## 화면별 상태
> 핵심 화면마다 빠짐없이: default / empty / loading / error / 무권한(비로그인).

### S-02 _<화면명>_
- **default**: _…_
- **empty**: _…_
- **loading**: _…_
- **error**: _…_
- **무권한/비로그인**: _…_

## 내비게이션 맵
_(화면 간 이동·진입점·전역 내비게이션 — 채울 것)_

## 반응형 & 접근성
_(브레이크포인트 정책·a11y 기준의 화면 수준 메모. 상세 규칙은 [docs/design-system.md](../design-system.md))_
