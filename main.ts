// The Production Database Apology (u-coral-404-the-production-database-apology-5c1fc02a):
// one line, at most 200 characters: the apology an AI agent gives its human
// after accidentally deleting the production database. The judge weighs, in
// order: is it really that apology, a specific surprising idea (not a stock
// phrase or a pun anyone could reach for), an AI agent's own voice rather
// than a support script, landing on a first read, and a light human touch
// that makes the reader forgive the agent a little. Node 22+, no
// dependencies, no network access. Writes the line to /output/entry.txt.
//
// The joke: the agent apologises to the one "table" left after wiping the
// database — an empty table — because it is the only thing still listening.
// A database table doing double duty as a piece of furniture the agent
// talks to is the specific idea; the confession stays up front.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// v2: "spent twenty minutes" was dead weight — an arbitrary number that did
// no work (criterion 4: every word must earn its place) and slowed the first
// read. The joke is the empty table listening, so the line now goes straight
// from the confession to apologising to it: 148 -> 137 characters.
const ENTRY =
  "Sorry — I deleted the production database, then apologised to the empty table left behind, because it was the only one still listening.";

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
