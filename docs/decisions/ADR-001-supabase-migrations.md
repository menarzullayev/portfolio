# ADR-001 — Supabase CLI migrations

- **Status:** Accepted
- **Date:** 2026-09-22
- **Decision:** Variant A — Supabase CLI migrations
- **Scope:** Database schema version control for `menarzullayev/portfolio`

## Context

The repository currently keeps the database definition in a single `supabase/schema.sql`.
That file acts as both bootstrap schema and a place for later `ALTER TABLE` changes.
There is no versioned `supabase/migrations/` history.

This makes schema evolution harder to audit and increases the risk of production/schema drift.

## Decision

Use **Supabase CLI migrations** as the canonical source of truth for database schema evolution:

- `supabase/migrations/*.sql` contains ordered, immutable schema changes.
- The existing `supabase/schema.sql` is retained as a compatibility/reference snapshot for now.
- New schema changes must not be appended to `schema.sql`.
- Existing production data is not modified by this repository decision alone.
- Reconciling the existing remote database migration history with the new baseline is a separate operational step.

## Consequences

### Positive

- Ordered and reviewable schema history.
- Easier reproduction of the database on a fresh environment.
- Lower risk of silent schema drift.
- Migration changes can be reviewed together with application code.

### Trade-offs

- Developers need the Supabase CLI migration workflow.
- The existing production database needs a one-time migration-history reconciliation.
- The legacy `schema.sql` must eventually be retired or generated from the migration history.

## Current baseline

`supabase/migrations/20260922230000_initial_schema.sql` captures the current portfolio database baseline: 12 public tables, their current columns, RLS state/policies, indexes, triggers, and the `media` storage setup. During validation, the live project was checked directly; its migration history is currently empty while the schema already exists, confirming the drift/history gap this decision addresses.

No remote migration-history repair or production migration was executed as part of this decision.


## Baseline validation

The live Supabase project was introspected directly before reconciliation:

- 12 public tables exist.
- The live schema has RLS enabled on all 12 public tables.
- The live schema contains the expected public-read policies, indexes, triggers, and the `media` storage policy.
- Remote migration history is currently empty.
- The repository baseline was checked against the live column metadata and adjusted for the live `subscribers` RLS state.

The repository environment used for this implementation does not have the Supabase CLI, Docker runtime, or the production database password available, so the literal `supabase db pull --linked` command could not be executed here. The repository is prepared for that exact command through `supabase/config.toml`; no claim is made that the committed baseline was emitted by the CLI.

Official workflow: `supabase db pull` creates a migration from the remote schema and can record that migration as applied in the remote migration history. The generated migration should be reviewed before commit.
