# Phase and Milestone Gate Standard

Every phase defines entry conditions, milestones, file owners, deliverables, validation commands, exit evidence, rollback point, and next dependency.

Statuses: `not-started`, `in-progress`, `blocked`, `needs-review`, `passed`, `failed`, `superseded`.

A phase cannot pass with missing artifacts, failed or unobserved commands, unresolved shared-file conflicts, unclear authorization, documentation exceeding implementation, or generated-file drift.
