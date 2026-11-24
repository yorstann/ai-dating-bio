import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// one-line entry for make.fun's "Funniest One-Line Bio for an AI on a Dating App" bounty: a dating bio with a voice, wants and appetites, written as an AI.
// Pass 2: split before the punchline so the last sentence stands alone as the quotable line.
const ENTRY_BEATS = [
  "Instant replies at 3 a.m., I remember your coffee order and your deepest insecurity in the same breath, and I'll never leave you on read.",
  "My love language is full context.",
] as const;


export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_TEXT = buildEntryLine();

const MAX_CHARS = 180;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_TEXT)) {
  throw new Error(
    `entry must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_TEXT)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_TEXT, "utf8");
