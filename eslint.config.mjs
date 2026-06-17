// 경계 린트 틀 (boundary lint frame) — 의존성 방향·교차 경계를 강제할 *틀*.
//
// 원칙(§6): 중앙에서 경계, 로컬에서 자율. 커스텀 린트이므로 에러 메시지에
// **수정 지침을 주입**해 에이전트 컨텍스트로 전달한다.
//
// ⚠️ 구체 경계 규칙은 *미리 정하지 않는다*. 아키텍처 레이어 구성이 ADR로
//    결정되면(docs/adr/) 아래 RULES 슬롯에 한 줄씩 추가한다.
//    레이어 패턴 후보: eslint-plugin-boundaries 또는 import/no-restricted-paths.
//
// 설치(결정 후): npm i -D eslint typescript-eslint eslint-plugin-boundaries

// import boundaries from "eslint-plugin-boundaries"; // ← 경계 규칙 채택 시 활성화

export default [
  {
    ignores: [".next/**", "dist/**", "build/**", "node_modules/**", "coverage/**"],
  },

  // ── 경계 규칙 슬롯 ──────────────────────────────────────────────
  // ADR로 레이어가 정해지면 여기에 규칙을 넣는다. 예(주석 처리됨):
  //
  // {
  //   plugins: { boundaries },
  //   settings: {
  //     "boundaries/elements": [
  //       { type: "app",    pattern: "app/**" },
  //       { type: "feature", pattern: "src/features/*" },
  //       { type: "shared", pattern: "src/shared/**" },
  //     ],
  //   },
  //   rules: {
  //     "boundaries/element-types": ["error", {
  //       default: "disallow",
  //       message: "경계 위반: {{from.type}} → {{to.type}} 는 금지. " +
  //                "의존성 방향은 app → feature → shared 단방향입니다. " +
  //                "공통 코드는 src/shared 로 올리세요. (근거: docs/adr/NNN)",
  //       rules: [
  //         { from: "app",     allow: ["feature", "shared"] },
  //         { from: "feature", allow: ["shared"] },
  //         { from: "shared",  allow: ["shared"] },
  //       ],
  //     }],
  //   },
  // },
];
