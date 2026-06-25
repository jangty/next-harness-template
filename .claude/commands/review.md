---
description: 변경(diff) 적대적 리뷰 — fresh 서브에이전트에 위임 (타입/린트/불변식/정의완료)
---

변경을 **분리된 컨텍스트의 서브에이전트**에 위임해 리뷰한다 — 작성한 세션이 스스로 채점하지 않게(공식 베스트프랙티스: adversarial review). 성공은 침묵, 문제만 자세히.

1. **범위 파악**: `git status` / `git diff` 로 무엇이 바뀌었는지.
2. **`code-reviewer` 서브에이전트에 위임**: diff를 주고 타입·린트(경계)·`CLAUDE.md` 불변식·정의완료(DoD)·비밀/산출물 누출·단순성을 검토하게 한다.
3. **보안 민감하면** `security-reviewer` 서브에이전트에도 위임: 인증·인가·데이터 접근·외부 입력·비밀을 건드리는 변경.
4. **종합 보고**: 서브에이전트가 돌려준 발견을 ✅/⚠️/❌ + `file:line` + 수정 지침으로 정리.
5. **수정 루프**: ❌·⚠️ 는 고친 뒤 재리뷰. 단순 취향은 "선택"으로 분리(과잉 엔지니어링 금지).

> 서브에이전트는 **읽기 전용**이다(수정 안 함). 수정은 메인 세션이 한다. 고위험(push·배포)은 사람 게이트.
> 서브에이전트 정의: [.claude/agents/code-reviewer.md](../agents/code-reviewer.md) · [.claude/agents/security-reviewer.md](../agents/security-reviewer.md)
