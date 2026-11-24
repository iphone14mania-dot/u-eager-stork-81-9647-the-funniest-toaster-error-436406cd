// The Funniest Toaster Error Message — entry program.
//
// Writes one error message a kitchen toaster would show its owner to
// /output/entry.txt. Deterministic, no network, no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. The judge brief weighs, in order: (1) a real error
// message a kitchen toaster would show, and the funniest of its kind;
// (2) freshness — the surprise arrives from somewhere the obvious
// toaster puns never go; (3) tightness, every word earning its place;
// (4) one clear voice for a small appliance, held to the end; (5) lands
// on a single read.
//
// Candidates weighed:
//  - "ERROR E-07: Bread detected. Please remove bread and insert
//    something I respect." Funny, but the joke is a shrug — the toaster
//    as a snob is a familiar bit, and it has no turn.
//  - "Error: the bagel is too thick. I did not sign up for this."
//    Deadpan and tight, but the grievance is generic; any appliance
//    could say it, and "I did not sign up for this" is stock.
//  - Picked: the crumb tray. Nobody writes jokes about the crumb tray,
//    yet every toaster owner knows it is the one part that is always
//    full and never emptied. "I have carried this for months" turns a
//    maintenance chore into quiet emotional labour, and "I am done"
//    lands the quietly dramatic voice in three words. Real error format,
//    one voice, no wasted word.
const ENTRY =
  "ERROR: Crumb tray full. I have carried this for months, and I am done.";

// Competition rules: 1 to 120 characters, counted as Unicode code points,
// and not only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 120) {
  throw new Error(`entry must be 1-120 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
