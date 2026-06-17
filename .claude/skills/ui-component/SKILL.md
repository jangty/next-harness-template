---
name: ui-component
description: UI 컴포넌트를 추가하거나 수정할 때 — Tailwind v4 + shadcn/ui 컨벤션과 디자인 토큰을 따르도록 규칙을 적용한다. 사용자가 "컴포넌트 추가", "버튼/폼/모달 만들어줘", UI 스타일 작업을 요청하면 활성화.
---

# UI 컴포넌트 추가 규칙

Tailwind v4 + shadcn/ui 환경에서 컴포넌트를 일관되게 추가한다.

> ⚠️ 구체 토큰·컴포넌트 컨벤션은 `docs/design-system.md` 에 결정·기록된 것을 따른다. 비어 있으면
> 추측하지 말고 먼저 컨벤션을 정해 그 문서에 기록한 뒤 진행한다.

절차:
1. `docs/design-system.md` 에서 디자인 토큰(색·간격·타이포)과 컴포넌트 컨벤션을 확인한다.
2. shadcn/ui 패턴을 따른다 — 기존 primitive를 재사용하고, 임의 값(magic number) 대신 토큰을 쓴다.
3. 하드코딩된 색·px 대신 Tailwind 토큰/CSS 변수를 쓴다(디자인 시스템 일관성).
4. 접근성: 시맨틱 마크업, 키보드 접근, 적절한 aria. 상태(hover/focus/disabled/loading)를 빠짐없이.
5. 상태 관리가 필요하면 `docs/state.md` 의 범위 규칙을 따른다.
6. 새 컨벤션이 생기면 `docs/design-system.md` 에 추가한다(드리프트 방지).

도구별 최신 문법(Tailwind v4, shadcn CLI)은 추측하지 말고 공식 문서/Context7로 확인.
