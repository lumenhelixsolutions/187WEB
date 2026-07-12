"""LAB profiles registry."""
PROFILES = {
    "lab:text": {"runtime": "none", "network": "deny"},
    "lab:python": {"runtime": "python", "network": "deny"},
    "lab:node": {"runtime": "node", "network": "deny"},
    "lab:repo": {"runtime": "shell", "network": "deny"},
    "lab:web": {"runtime": "browser", "network": "allowlist"},
    "lab:quantum": {"runtime": "python", "network": "deny"},
    "lab:evm": {"runtime": "foundry", "network": "local-fork"},
}
