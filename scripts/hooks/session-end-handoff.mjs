#!/usr/bin/env node
/**
 * SessionEnd — 연속성 앵커 갱신.
 *
 * 세션이 끝날 때(SessionEnd 훅) HANDOFF.md 의 "Session log" 섹션에 기계적 연속성
 * 스탬프(시각·브랜치·마지막 커밋·짧은 git status)를 1회 기록한다.
 *
 * ⚠️ 왜 Stop 이 아니라 SessionEnd 인가: Stop 훅은 *매 턴 종료마다* 발화한다
 *    (공식: "once per user prompt"). 그래서 Stop 에 걸면 한 세션에 스탬프가
 *    수십 개씩 쌓인다. SessionEnd 는 세션이 실제로 끝날 때 1회만 발화하므로
 *    "Session log = 세션별 한 줄"이 되어 의미가 맞는다. (강제 → .claude/settings.json)
 *
 * 주의: 산문 요약(요약/남은 TODO/다음 진입점)은 에이전트가 작성하는 부분이다.
 * 훅은 스스로 대화를 요약할 수 없으므로, 다음 세션이 이어받을 수 있는
 * 기계적 사실(어떤 브랜치·어디까지 커밋됐는지)만 남긴다.
 *
 * GC: Session log 가 무한히 자라지 않도록 최근 MAX_STAMPS 개(세션)만 유지한다.
 *     (테스트용으로 HANDOFF_PATH 환경변수로 대상 파일을 바꿀 수 있다.)
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

function safe(fn, fallback = "") {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

const branch = safe(
  () => execSync("git rev-parse --abbrev-ref HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(),
  "(no git)"
);
const lastCommit = safe(
  () => execSync("git log --oneline -1", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(),
  "(no commits)"
);
const status = safe(
  () => execSync("git status --short", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(),
  ""
);

const MAX_STAMPS = 12; // 최근 N개 세션만 유지 — Session log 무한 증가 방지(GC).
const DELIM = "<!-- session-stamp -->";

const now = new Date().toISOString();
const stamp = [
  `- **${now}** · branch \`${branch}\` · last \`${lastCommit}\``,
  status ? `  - 미커밋 변경:\n\`\`\`\n${status}\n\`\`\`` : `  - 작업 트리 깨끗함`,
].join("\n");

const path = process.env.HANDOFF_PATH || "docs/HANDOFF.md";
const marker = "## Session log";

let body = existsSync(path) ? safe(() => readFileSync(path, "utf8"), "") : "";
if (!body.includes(marker)) {
  body = (body.trim() ? body.trim() + "\n\n" : "") + `${marker}\n> SessionEnd 훅이 세션 종료 시 기계적 스탬프를 추가합니다. 산문 요약은 위 섹션들에 직접 작성하세요.\n`;
}

// 마커 이후의 기존 스탬프를 떼어내 새 스탬프를 더하고, 최근 MAX_STAMPS개만 남긴다.
const segments = body.split(DELIM);
const head = segments[0].trimEnd(); // 산문 + Session log 헤더/노트
const stamps = segments.slice(1).map((s) => s.trim()).filter(Boolean);
stamps.push(stamp);
const kept = stamps.slice(-MAX_STAMPS);

body = head + "\n\n" + kept.map((s) => `${DELIM}\n${s}`).join("\n\n") + "\n";

safe(() => writeFileSync(path, body));
process.exit(0);
