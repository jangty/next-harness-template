#!/usr/bin/env node
/**
 * PreToolUse 가드 — 기계 강제 1차 방어선.
 *
 * 차단 대상 (*동작*만 여기서 규정; 구체 패턴 목록은 아래 BINDINGS):
 *   ① 비밀 파일 접근 (.env*) — 읽기·편집·쓰기·스테이징, Bash의 cat/git add 포함
 *   ② 빌드 산출물 편집 (.next, out, dist, build, node_modules)
 *   ③ 파괴적 명령 (rm -rf, git push --force, drop database 등)
 *
 * 차단 시: 사유 + 대안을 stderr로 출력하고 exit 2.
 * (deny 권한은 트립와이어 — cat 같은 읽기전용 내장은 권한만으론 못 막으므로 훅이 1차 방어)
 */

import { readFileSync } from "node:fs";

// ── 대상 목록 (docs 바인딩 슬롯: 규칙이 늘면 여기만 수정) ─────────────
// .env, .env.local, .env.production 등은 비밀. 단 .env.example/.sample/.template 은
// 커밋되는 안전한 템플릿이므로 예외(읽기·쓰기 허용).
const SECRET_EXAMPLE = /\.env\.(example|sample|template)$/i;
const SECRET_FILE = /(^|[\\/])\.env(\.|$)/i;
const BUILD_ARTIFACT = /(^|[\\/])(\.next|out|dist|build|node_modules)([\\/]|$)/i;
const DESTRUCTIVE = [
  { re: /\brm\s+(-[a-z]*r[a-z]*f|-[a-z]*f[a-z]*r)\b/i, why: "rm -rf 는 복구 불가한 대량 삭제" },
  { re: /\bgit\s+push\s+.*(--force\b|-f\b)/i, why: "강제 푸시는 원격 히스토리를 파괴" },
  { re: /\bgit\s+reset\s+--hard\b/i, why: "reset --hard 는 작업 트리를 파괴" },
  { re: /\bgit\s+clean\s+-[a-z]*f/i, why: "git clean -f 는 추적되지 않은 파일을 삭제" },
  { re: /\bdrop\s+(database|table|schema)\b/i, why: "DROP 은 데이터를 파괴 — 마이그레이션을 거칠 것" },
  { re: /\btruncate\s+table\b/i, why: "TRUNCATE 는 데이터를 파괴" },
  { re: /:\s*\(\s*\)\s*\{.*\}\s*;\s*:/, why: "fork bomb 패턴" },
  { re: /\bmkfs\b|\bdd\s+if=/i, why: "디스크 파괴 명령" },
];

// 비밀 파일을 건드리는 셸 동작
const SECRET_IN_SHELL = /(^|[;&|]|\s)(cat|less|more|head|tail|bat|type|cp|mv|scp|git\s+add)\s+[^;&|]*\.env(?!\.(example|sample|template))(\.|\s|$|"|')/i;
const SECRET_REDIRECT = />\s*[^\s;&|]*\.env(?!\.(example|sample|template))(\.|\s|$)/i;

function block(reason, alternative) {
  console.error(`🚫 차단됨: ${reason}`);
  if (alternative) console.error(`→ 대안: ${alternative}`);
  process.exit(2);
}

function main() {
  let raw = "";
  try {
    raw = readFileSync(0, "utf8");
  } catch {
    process.exit(0); // stdin 없음 — 통과
  }
  if (!raw.trim()) process.exit(0);

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    process.exit(0);
  }

  const tool = payload.tool_name || "";
  const input = payload.tool_input || {};

  // ── 파일 경로 기반 도구 (Read/Edit/Write/MultiEdit/NotebookEdit) ──
  const path = input.file_path || input.notebook_path || input.path || "";
  if (path) {
    if (SECRET_FILE.test(path) && !SECRET_EXAMPLE.test(path)) {
      block(
        `비밀 파일 접근 (${path})`,
        "비밀은 .env 에 두고 코드에서 process.env 로 읽으세요. 예시 값이 필요하면 .env.example 를 사용."
      );
    }
    // 읽기는 산출물도 허용 (디버깅). 편집/쓰기만 차단.
    if (tool !== "Read" && BUILD_ARTIFACT.test(path)) {
      block(
        `빌드 산출물 편집 (${path})`,
        "산출물은 소스에서 생성됩니다. 소스(src/, app/, prisma/schema.prisma 등)를 수정하세요."
      );
    }
  }

  // ── Bash 명령 ────────────────────────────────────────────────
  if (tool === "Bash") {
    const cmd = input.command || "";
    if (SECRET_IN_SHELL.test(cmd) || SECRET_REDIRECT.test(cmd)) {
      block(
        `셸을 통한 비밀 파일 접근 (${cmd.slice(0, 80)})`,
        "비밀은 process.env 로 읽으세요. .env 내용을 출력/복사하지 마세요."
      );
    }
    for (const { re, why } of DESTRUCTIVE) {
      if (re.test(cmd)) {
        block(`파괴적 명령 (${why})`, "되돌릴 수 있는 방법을 쓰거나, 정말 필요하면 사람에게 확인을 요청하세요.");
      }
    }
  }

  process.exit(0); // 통과 (성공은 침묵)
}

main();
