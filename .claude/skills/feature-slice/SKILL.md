---
name: feature-slice
description: 새 기능을 만들거나 추가할 때 — 기능 수직 슬라이스(UI→API/route→데이터 접근)를 일관된 구조로 스캐폴딩한다. 사용자가 "기능 추가", "새 페이지/엔드포인트", "feature 만들어줘" 류를 요청하면 활성화.
---

# 기능 수직 슬라이스 스캐폴딩

새 기능을 **수직 슬라이스**로 만든다 — 한 기능에 필요한 UI, route handler/server action, 데이터 접근이 한 묶음으로 응집되게.

> ⚠️ 구체 디렉토리 레이아웃·경계 규칙은 ADR(`docs/adr/`)로 결정된 것을 따른다. 아직 미결정이면
> 추측하지 말고 `docs/architecture.md` 를 확인하고, 없으면 먼저 결정을 기록한다.

절차:
1. `docs/architecture.md` 에서 현재 레이어 구성·경계 방향을 확인한다.
2. 슬라이스를 만든다(레이어가 정해진 경우): UI 컴포넌트 → route/server action → 데이터 접근. 의존성은 경계 린트가 강제하는 단방향을 지킨다.
3. 데이터가 필요하면 `docs/data.md` 의 접근·마이그레이션 절차를 따른다(마이그레이션 적용은 사람 게이트).
4. 인증/인가가 필요하면 `docs/security.md` 의 모델을 따른다.
5. 검증을 붙인다: `docs/verification.md` 의 경로(단위/E2E)에 맞춰 테스트 추가.
6. 새 설계 결정이 생기면 ADR로 기록하고 `CLAUDE.md` 불변식에 한 줄 추가.
