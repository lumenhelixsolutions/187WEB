# Agentic Context Packet Standard

```yaml
natasha_packet:
  packet_version: 1.0
  mission:
  deliverable:
  current_phase:
  target_executor:
  must_preserve: []
  constraints: []
  explicit_exclusions: []
  prior_decisions: []
  evidence:
    sources: []
    repository_files: []
    measurements: []
  artifacts: []
  assumptions: []
  risks: []
  unresolved: []
  assigned_role:
  owned_files: []
  prohibited_files: []
  allowed_tools: []
  prohibited_actions: []
  required_output_schema:
  validation_commands: []
  token_budget:
  provenance:
```

Compression must preserve all explicit constraints, exclusions, numbers, paths, identifiers, commands, safety boundaries, prior decisions, and unresolved questions. Return `NO_OP` when safe compression is impossible.
