# ADR-0001: 요구사항 발견을 깊이 우선·모호도 게이트로 격상

- **상태**: 채택됨
- **날짜**: 2026-06-19
- **결정자**: 템플릿 메인테이너

## 맥락 (Context)
템플릿으로 실제 서비스를 만들어 보니 **기획 컨센서스가 부족**했다. `/kickoff` 가 ① 질문을 묶음으로 던지고 ② 답을 템플릿에 채운 뒤 ③ 산문 DoR 체크리스트를 통과시키면 끝나는 *단일 패스* 구조였기 때문이다.

문제의 본질: 하네스의 다른 모든 게이트(가드 훅·lefthook·CI)는 기계가 강제하는데, **요구사항 단계만 "충분함"이 산문 체크리스트로 자가 채점**된다. LLM은 "충분히 정의됨"을 선언하고 코드로 직행하는 편향이 강하므로, 표면 답변 한 바퀴로 게이트가 통과된다. 정확히 템플릿이 다른 곳에서 배격하는 "말로만 금지" 안티패턴이 kickoff 에만 남아 있었다. 또한 요구사항(WHAT)과 디자인 토큰(HOW) 사이의 **화면 설계 층이 통째로 비어** 있었다 — 합의가 가장 가시적으로 형성되는 곳인데도.

## 결정 (Decision)
OMC `deep-interview` 의 *메커니즘*을 템플릿의 `/kickoff` + `requirements-discovery` 스킬에 **네이티브로 재구현**한다(플러그인 의존 없음). 산출물은 `docs/product/` 에 쓴다.
1. **모호도 게이트** — 명료도 3차원(목표 0.40 / 제약 0.30 / 성공기준 0.30) 자평, `모호도 ≤ 0.20` 까지 루프. DoR 체크리스트를 *수렴 신호가 있는 게이트*로 격상.
2. **한 번에 한 질문 + 최약 차원 타겟팅** — 기존 "묶음 질문"의 반전(깊이 우선).
3. **Round 0 토폴로지 게이트** — 컴포넌트 형상을 먼저 잠가 형제 컴포넌트의 모호함이 숨는 것을 방지.
4. **Ontology 수렴** — 엔티티를 라운드 간 추적, 데이터 모델의 씨앗으로.
5. **Challenge 모드** — R4 Contrarian / R6 Simplifier / R8 Ontologist + 레버리지 질문("스펙은 도전할 제약").
6. **화면 설계 다리 신설** — `docs/product/ux-spec.md`(화면 인벤토리·플로우·상태, FR 역추적).

## 대안 (Alternatives)
- **OMC `deep-interview` 에 위임** — 구현은 가볍지만 산출물이 gitignore 된 `.omc/specs/` 로 가고 OMC 플러그인에 런타임 결합. 템플릿의 *자기완결 하네스* 정체성과 충돌(`rm -rf .omc` 로 시작하는 셋업). **기각.**
- **하이브리드(OMC 있으면 위임, 없으면 네이티브)** — 가장 유연하나 가장 복잡. 템플릿의 단순성 가치와 상충. **기각.**
- **현행 유지** — 기획 컨센서스 부족이라는 관측된 통증이 그대로 남음. **기각.**

## 결과 (Consequences)
- (+) 요구사항 깊이가 측정 가능한 수렴 신호로 게이트된다. 화면 설계가 일급 산출물이 된다(requirement→screen→component 추적성).
- (+) OMC 미설치 환경에서도 이 템플릿으로 만든 모든 프로젝트가 동일하게 작동.
- (−) kickoff 가 무거워진다(라운드 수↑). 작은 프로젝트는 R3+ 조기 종료로 완화.
- (−) ⚠️ **모호도 점수는 결정론적 강제가 아니라 LLM 자기비평에 숫자를 붙인 것**이다. 가드 훅(regex) 같은 하드 게이트가 아니다 — 진짜 강제는 여전히 *사람의 명세 승인*. 점수의 가치는 채점 자체가 아니라 한질문·challenge 가 깊이를 강제하고 갭을 가시화하는 데 있다.

## 강제 (Enforcement)
- **세 문서 센티넬 게이트** — `scripts/hooks/session-start.mjs` 의 `productSpecNudge` 가 `brief.md`·`requirements.md`·`ux-spec.md` 중 하나라도 `kickoff:pending` 센티넬이 남아 있으면 매 세션 "/kickoff 먼저" 를 띄운다(화면 설계도 기계 강제 대상에 포함).
- **DoR 게이트** — `/kickoff` 와 `requirements-discovery` 스킬의 Definition of Ready(모호도 임계 포함). 소프트 게이트(에이전트·사람 협조 필요)임을 명시.
- 절차/컨벤션: [.claude/commands/kickoff.md](../../.claude/commands/kickoff.md) · [.claude/skills/requirements-discovery/SKILL.md](../../.claude/skills/requirements-discovery/SKILL.md).

## 불변식 반영
이 결정은 프로세스 결정이라 코드 불변식을 만들지 않는다(센티넬 게이트가 강제). `CLAUDE.md` 불변식 섹션에는 추가하지 않는다.
