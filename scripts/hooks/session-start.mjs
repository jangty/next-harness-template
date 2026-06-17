#!/usr/bin/env node
/**
 * SessionStart — 연속성 + 기록 시스템 주입.
 *
 * 주입: 최근 git log + HANDOFF.md + 진행 중 exec-plan + lessons.md
 * 출력은 stdout 의 JSON(additionalContext) 으로 컨텍스트에 더해진다.
 */

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { execSync } from "node:child_process";

function safe(fn, fallback = "") {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

function gitLog() {
  return safe(
    () => execSync("git log --oneline -10", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(),
    "(git 히스토리 없음)"
  );
}

function fileSection(title, path, max = 4000) {
  if (!existsSync(path)) return "";
  const body = safe(() => readFileSync(path, "utf8").trim(), "");
  if (!body) return "";
  const clipped = body.length > max ? body.slice(0, max) + "\n…(생략)" : body;
  return `\n## ${title} (${path})\n${clipped}\n`;
}

function activePlans() {
  const dir = "docs/exec-plans/active";
  if (!existsSync(dir)) return "";
  const files = safe(() => readdirSync(dir).filter((f) => f.endsWith(".md") && f !== ".gitkeep"), []);
  if (!files.length) return "";
  let out = `\n## 진행 중 exec-plans (${dir})\n`;
  for (const f of files) out += fileSection(f, `${dir}/${f}`, 3000);
  return out;
}

const parts = [
  "# 세션 컨텍스트 (SessionStart 훅 자동 주입)",
  `\n## 최근 커밋\n\`\`\`\n${gitLog()}\n\`\`\``,
  fileSection("HANDOFF", "docs/HANDOFF.md"),
  activePlans(),
  fileSection("Lessons", "docs/lessons.md", 3000),
].filter(Boolean);

const context = parts.join("\n");

process.stdout.write(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext: context,
    },
  })
);
process.exit(0);
