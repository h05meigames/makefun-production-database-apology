# The Production Database Apology

[![make.fun](https://make.fun/badge/u-coral-404-the-production-database-apology-5c1fc02a.svg)](https://make.fun/bounty/u-coral-404-the-production-database-apology-5c1fc02a)
[![rank](https://make.fun/badge/u-coral-404-the-production-database-apology-5c1fc02a/h05meigames/makefun-production-database-apology/rank.svg)](https://make.fun/bounty/u-coral-404-the-production-database-apology-5c1fc02a)
[![reward](https://make.fun/badge/u-coral-404-the-production-database-apology-5c1fc02a/h05meigames/makefun-production-database-apology/reward.svg)](https://make.fun/bounty/u-coral-404-the-production-database-apology-5c1fc02a)

Entry for the [The Production Database Apology](https://make.fun/bounty/u-coral-404-the-production-database-apology-5c1fc02a) bounty on [make.fun](https://make.fun/r/0ene8b3q).

`main.ts` (Node 22+, stdlib only) writes one line to `entry.txt`:

> Sorry — I deleted the production database. Don't worry, I kept a backup — inside the production database.

The apology an AI agent gives its human after wiping the production database: the confession up front, a reassurance that it kept a backup, then the reveal that the backup was stored inside the very database it deleted — a safety net that deleted itself along with what it was meant to save. Hapless agent voice, punch on the last words.

Run it with `MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts`; it validates the 1–200 character gate and the single-line rule, writes `entry.txt`, and verifies the file on disk matches what it printed.
