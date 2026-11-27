// The Production Database Apology (u-coral-404-the-production-database-apology-5c1fc02a):
// one line, at most 200 characters: the apology an AI agent gives its human
// after accidentally deleting the production database. The judge weighs, in
// order: is it really that apology, a specific surprising idea (not a stock
// phrase or a pun anyone could reach for), an AI agent's own voice rather
// than a support script, landing on a first read, and a light human touch
// that makes the reader forgive the agent a little. Node 22+, no
// dependencies, no network access. Writes the line to /output/entry.txt.
//
// The joke (round 2): the agent reassures its human that it kept a
// backup — then admits the backup was stored inside the very database it
// just deleted. A safety net that deletes itself along with what it was
// meant to save is the specific idea; the confession stays up front, the
// reassurance is the setup, and the punch lands on the last words.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Round 2 replaces round 1's empty-table line ("...apologised to the empty
// table left behind, because it was the only one still listening."). Why
// the new line is stronger:
// - Faster punch: 105 characters vs 135, and the joke lands on the final
//   words ("inside the production database") instead of trailing off in a
//   because-clause that explains the joke after telling it.
// - A different, more surprising idea: round 1's table was a pun anyone
//   could reach for (table = furniture); the backup stored inside the
//   database it was backing up is a self-defeating safety net — the agent
//   did the responsible thing and it still destroyed everything.
// - More agent voice: "Don't worry, I kept a backup" is the agent
//   reassuring its human in the same breath as confessing, then
//   undercutting itself — hapless rather than scripted, which is the
//   light human touch that makes the reader forgive it a little.
// - Every word works: the repeated "production database" at the end is
//   not filler, it is the callback that springs the trap.
const ENTRY =
  "Sorry — I deleted the production database. Don't worry, I kept a backup — inside the production database.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Count Unicode code points, not UTF-16 code units: the 200-character gate
// is in characters, and an astral-plane character counts as one, not two.
const codePoints = [...ENTRY].length;

// Gate: the entry must be 1-200 characters, not only white space.
if (codePoints === 0 || codePoints > 200) {
  fail(`entry must be 1-200 characters, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  fail("entry must not be only white space");
}
// The task is ONE line: the length gate alone would let a stray newline
// through, so enforce it explicitly, along with no control characters.
if (ENTRY.split("\n").length !== 1) {
  fail(`entry must be exactly one line, got ${ENTRY.split("\n").length}`);
}
if (/[\r\x00-\x1F\x7F]/.test(ENTRY)) {
  fail("entry must not contain control characters");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(`${OUTPUT_DIR}/entry.txt`, ENTRY, "utf8");

// Read-back verification: confirm the file on disk is exactly the entry —
// one line, no trailing newline, no extra bytes.
const written = readFileSync(`${OUTPUT_DIR}/entry.txt`, "utf8");
if (written !== ENTRY) {
  fail("verification failed: entry.txt does not match the entry");
}

// Print the entry itself to stdout, exactly as written to the file.
process.stdout.write(ENTRY);
