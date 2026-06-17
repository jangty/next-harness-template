/**
 * env 검증 — 빠른 실패(loud fail).
 *
 * 원칙(§6): 환경변수가 빠지면 런타임 깊숙한 곳이 아니라 부팅 시점에 큰 소리로 죽는다.
 *
 * ⚠️ 슬롯: 실제 변수 목록은 스택(Supabase/Prisma 등)이 붙으면 채운다.
 *    지금은 검증 *틀*만 둔다. 검증 라이브러리(zod 등)는 설치 후 활성화.
 *
 * 설치 예: npm i zod
 */

// import { z } from "zod"; // ← 스키마 검증 채택 시 활성화

// ── 스키마 슬롯 ──────────────────────────────────────────────
// const schema = z.object({
//   NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
//   DATABASE_URL: z.string().url(),
//   NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
//   NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
//   SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
// });
//
// const parsed = schema.safeParse(process.env);
// if (!parsed.success) {
//   console.error("❌ 환경변수 검증 실패:");
//   console.error(parsed.error.flatten().fieldErrors);
//   throw new Error("필수 환경변수가 누락되었습니다. .env.example 를 참고하세요.");
// }
// export const env = parsed.data;

// 임시 통과 (스키마 채택 전까지). 변수가 정의되면 위 블록으로 교체한다.
export const env = process.env;
