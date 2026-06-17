#!/usr/bin/env node
/**
 * PostToolUse — 변경된 파일만 포맷 + lint.
 *
 * 원칙: 성공은 침묵, 실패만 출력. 무거운 검사(전체 typecheck/test)는 여기 두지 않는다
 * (그건 pre-commit/CI 의 일). 피드백 사다리의 가장 빠른 레이어(ms).
 *
 * 골격 단계에서는 prettier/eslint 가 아직 설치되지 않았을 수 있다.
 * 그 경우 조용히 통과한다 (도구가 생기면 자동으로 작동).
 */

import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { extname, resolve } from "node:path";

const FORMATTABLE = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".css", ".md"]);
const LINTABLE = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);

// node_modules/.bin 을 PATH 앞에 붙여 로컬 바이너리를 직접 호출 → npx 스폰 오버헤드 제거.
const BIN_PATH = `${resolve("node_modules/.bin")}${process.platform === "win32" ? ";" : ":"}${process.env.PATH || ""}`;

function hasBin(bin) {
  // node_modules/.bin 에 설치돼 있는지 확인
  return existsSync(`node_modules/.bin/${bin}`) || existsSync(`node_modules/.bin/${bin}.cmd`);
}

function run(cmd) {
  try {
    execSync(cmd, { stdio: "pipe", env: { ...process.env, PATH: BIN_PATH } });
    return null;
  } catch (e) {
    return (e.stdout?.toString() || "") + (e.stderr?.toString() || "");
  }
}

function main() {
  let raw = "";
  try {
    raw = readFileSync(0, "utf8");
  } catch {
    process.exit(0);
  }
  if (!raw.trim()) process.exit(0);

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    process.exit(0);
  }

  const file = payload.tool_input?.file_path;
  if (!file || !existsSync(file)) process.exit(0);

  const ext = extname(file).toLowerCase();
  const errors = [];

  if (FORMATTABLE.has(ext) && hasBin("prettier")) {
    const out = run(`prettier --write "${file}"`);
    if (out) errors.push(`[prettier]\n${out}`);
  }
  if (LINTABLE.has(ext) && hasBin("eslint")) {
    const out = run(`eslint --fix "${file}"`);
    if (out) errors.push(`[eslint]\n${out}`);
  }

  if (errors.length) {
    // exit 2 → 출력을 에이전트 컨텍스트로 전달 (수정 지침 포함)
    console.error(errors.join("\n\n"));
    console.error("\n→ 위 lint/format 문제를 고친 뒤 계속하세요.");
    process.exit(2);
  }
  process.exit(0); // 성공은 침묵
}

main();
