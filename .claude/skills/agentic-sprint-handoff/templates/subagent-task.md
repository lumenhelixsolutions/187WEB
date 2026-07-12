# Subagent Task

```yaml
subagent_task:
  role:
  objective:
  phase:
  dependencies: []
  owned_files: []
  prohibited_files: []
  inputs: []
  must_preserve: []
  prohibited_actions: []
  required_artifacts: []
  validation_commands: []
  token_budget:
  handoff_to:
```

## Required return

```yaml
subagent_report:
  role:
  status:
  files_read: []
  files_changed: []
  decisions: []
  tests_run: []
  test_results: []
  unresolved: []
  risks: []
  commit:
  handoff_to:
```
