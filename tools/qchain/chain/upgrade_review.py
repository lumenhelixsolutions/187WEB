"""Upgradeability checklist."""


def checklist() -> list[str]:
    return [
        "initializer protected",
        "admin key custody documented",
        "storage layout collision review",
        "timelock / multisig on upgrade path",
    ]
