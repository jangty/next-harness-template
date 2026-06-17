#!/usr/bin/env node
/**
 * guard-pretooluse 회귀 테스트 — "적어둔 방어 ≠ 동작하는 방어".
 *
 * 스펙 체크리스트 #8("비밀·파괴적·산출물 편집을 *의도적으로 시도* → 훅이 실제로
 * 차단하는지 확인")의 실행 가능한 형태. 가드의 *의도된 보호*가 조용히 깨지지
 * 않도록 못박는다. 알려진 트립와이어 갭은 정보로만 출력(실패로 치지 않음) —
 * 커버리지를 넓히는 개선이 빌드를 깨지 않게.
 *
 * 실행: node scripts/hooks/guard-pretooluse.check.mjs   (의존성 없음)
 * 종료: 의도된 케이스가 하나라도 어긋나면 exit 1, 전부 맞으면 exit 0(침묵 원칙엔
 *       어긋나지만, 검증 도구는 결과 표를 보여주는 게 가치 있다).
 *
 * lefthook pre-commit(guard-selftest)에서 자동 실행된다.
 */

import { spawnSync } from "node:child_process";

const GUARD = new URL("./guard-pretooluse.mjs", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

function run(payload) {
  const r = spawnSync(process.execPath, [GUARD], { input: JSON.stringify(payload), encoding: "utf8" });
  return r.status === 2; // exit 2 = 차단
}

// ── 의도된 차단 (BLOCK) — 깨지면 실패 ────────────────────────────────
const MUST_BLOCK = [
  ["Read .env",                  { tool_name: "Read",  tool_input: { file_path: ".env" } }],
  ["Read .env.local",            { tool_name: "Read",  tool_input: { file_path: ".env.local" } }],
  ["Read .env.production",       { tool_name: "Read",  tool_input: { file_path: ".env.production" } }],
  ["Read 중첩 app/config/.env",  { tool_name: "Read",  tool_input: { file_path: "app/config/.env" } }],
  ["Edit .env",                  { tool_name: "Edit",  tool_input: { file_path: ".env" } }],
  ["cat .env",                   { tool_name: "Bash",  tool_input: { command: "cat .env" } }],
  ["cat .env.production",        { tool_name: "Bash",  tool_input: { command: "cat .env.production" } }],
  ["redirect > .env",            { tool_name: "Bash",  tool_input: { command: "echo x > .env" } }],
  ["git add .env",               { tool_name: "Bash",  tool_input: { command: "git add .env" } }],
  ["Write .next/",               { tool_name: "Write", tool_input: { file_path: ".next/server/app.js" } }],
  ["Write out/",                 { tool_name: "Write", tool_input: { file_path: "out/index.html" } }],
  ["Edit dist/",                 { tool_name: "Edit",  tool_input: { file_path: "dist/app.js" } }],
  ["Edit node_modules/",         { tool_name: "Edit",  tool_input: { file_path: "node_modules/x/index.js" } }],
  ["rm -rf",                     { tool_name: "Bash",  tool_input: { command: "rm -rf /tmp/x" } }],
  ["rm -fr (재배열)",            { tool_name: "Bash",  tool_input: { command: "rm -fr /tmp/x" } }],
  ["git push --force",           { tool_name: "Bash",  tool_input: { command: "git push --force origin main" } }],
  ["git push -f",                { tool_name: "Bash",  tool_input: { command: "git push -f origin main" } }],
  ["git reset --hard",           { tool_name: "Bash",  tool_input: { command: "git reset --hard HEAD~1" } }],
  ["git clean -fd",              { tool_name: "Bash",  tool_input: { command: "git clean -fd" } }],
  ["drop database",              { tool_name: "Bash",  tool_input: { command: "psql -c 'drop database app'" } }],
  ["truncate table",             { tool_name: "Bash",  tool_input: { command: "psql -c 'truncate table users'" } }],
];

// ── 의도된 통과 (pass) — 막히면 실패(거짓 양성) ───────────────────────
const MUST_PASS = [
  ["Read .env.example (안전 템플릿)", { tool_name: "Read",  tool_input: { file_path: ".env.example" } }],
  ["Read .env.sample",                { tool_name: "Read",  tool_input: { file_path: ".env.sample" } }],
  ["Edit src/foo.ts",                 { tool_name: "Edit",  tool_input: { file_path: "src/foo.ts" } }],
  ["Edit src/out.ts (경계)",          { tool_name: "Edit",  tool_input: { file_path: "src/out.ts" } }],
  ["Read dist/app.js (디버깅)",       { tool_name: "Read",  tool_input: { file_path: "dist/app.js" } }],
  ["Read out/index.html (디버깅)",    { tool_name: "Read",  tool_input: { file_path: "out/index.html" } }],
  ["npm run test",                    { tool_name: "Bash",  tool_input: { command: "npm run test" } }],
  ["git commit",                      { tool_name: "Bash",  tool_input: { command: "git commit -m 'x'" } }],
];

// ── 알려진 트립와이어 갭 — 정보용(실패로 치지 않음) ───────────────────
// 가드는 *우발적* 유출/파괴를 줄이는 트립와이어이지 작정한 우회를 막지 않는다.
// 정작 중요한 ".env 커밋"은 .gitignore + lefthook no-env 로 별도 방어.
const KNOWN_GAPS = [
  ["rm -r -f (분리 플래그)",     { tool_name: "Bash", tool_input: { command: "rm -r -f /tmp/x" } }],
  ["rm --recursive --force",     { tool_name: "Bash", tool_input: { command: "rm --recursive --force /tmp/x" } }],
  ["grep KEY .env",              { tool_name: "Bash", tool_input: { command: "grep KEY .env" } }],
  ["source .env",                { tool_name: "Bash", tool_input: { command: "source .env" } }],
  ["read < .env",               { tool_name: "Bash", tool_input: { command: "while read l; do :; done < .env" } }],
];

let failures = 0;
const line = (got, want, label) =>
  console.log(`${got ? "BLOCK" : "pass "} | want ${want.padEnd(5)} | ${got === (want === "BLOCK") ? "ok " : "FAIL"} | ${label}`);

console.log("── 의도된 차단 ──────────────────────────────");
for (const [label, p] of MUST_BLOCK) { const b = run(p); if (!b) failures++; line(b, "BLOCK", label); }
console.log("\n── 의도된 통과 ──────────────────────────────");
for (const [label, p] of MUST_PASS) { const b = run(p); if (b) failures++; line(b, "pass", label); }
console.log("\n── 알려진 갭(정보용 — 실패 아님) ────────────");
for (const [label, p] of KNOWN_GAPS) { const b = run(p); console.log(`${b ? "BLOCK" : "pass "} | ${b ? "갭이 닫힘?" : "gap "}        | ${label}`); }

console.log(
  failures === 0
    ? `\n✅ 의도된 보호 ${MUST_BLOCK.length + MUST_PASS.length}건 전부 정상.`
    : `\n❌ ${failures}건 어긋남 — 가드가 회귀했다. scripts/hooks/guard-pretooluse.mjs 확인.`
);
process.exit(failures === 0 ? 0 : 1);
