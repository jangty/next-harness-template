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

function productSpecNudge() {
  // 제품 명세 게이트: 세 문서(brief·requirements·ux-spec) 중 하나라도 없거나
  // 센티넬(kickoff:pending)이 남아 있으면 미작성 → 화면 설계까지 기계 강제(ADR-0001).
  const specs = [
    "docs/product/brief.md",
    "docs/product/requirements.md",
    "docs/product/ux-spec.md",
  ];
  const pending = specs.some(
    (p) => !existsSync(p) || safe(() => readFileSync(p, "utf8"), "").includes("kickoff:pending")
  );
  if (!pending) return "";
  return (
    "\n## ⚠️ 제품 명세 미정의\n" +
    "코드 전에 `/kickoff` 로 발견 인터뷰(깊이 우선·모호도 게이트)를 돌려 " +
    "`docs/product/{brief,requirements,ux-spec}.md` 를 확정하세요. " +
    "(바이브코딩 방지 게이트 — 세 문서의 센티넬이 다 제거되면 이 알림은 꺼집니다.)\n"
  );
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
  productSpecNudge(),
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
