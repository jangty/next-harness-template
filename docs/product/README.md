# Product — 무엇을 · 누구를 위해 · 왜 (명세)

> 이 폴더는 하네스의 **WHAT/WHY 슬롯**이다. 나머지 `docs/` 가 HOW(아키텍처·데이터·보안·배포)를 다룬다면, 여기는 제품 그 자체를 다룬다.
> 코드 전에 `/kickoff` 로 채운다. 비어 있으면 SessionStart 훅이 매 세션 "/kickoff 먼저"를 띄운다.

- `brief.md` — PRD-lite. 문제·사용자·가치 제안·성공 지표·범위·비목표.
- `requirements.md` — 기능요건(유저스토리 + 수용기준 Given/When/Then) + 비기능요건(NFR).

## 흐름
`/kickoff`(발견 인터뷰) → `brief.md`·`requirements.md` → 함의된 결정은 `docs/adr/`, MVP 계획은 `docs/exec-plans/active/`, 진입점은 `docs/HANDOFF.md` 로 흐른다.

작성 방법·컨벤션(유저스토리·EARS·MoSCoW·DoR)은 `requirements-discovery` 스킬에 있다.

## 센티넬
`brief.md`·`requirements.md` 맨 위의 `<!-- kickoff:pending -->` 주석은 "아직 미작성" 표식이다. `/kickoff` 가 핵심 절을 다 채우면 이 줄을 제거하고, 그때 SessionStart 넛지가 꺼진다.
