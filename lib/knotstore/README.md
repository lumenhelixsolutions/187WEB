# KNOTstore

Local agentic data layer for 187WEB.

## Usage

```ts
import { KNOTstore } from "@/lib/knotstore";

const store = KNOTstore({ backend: "hybrid", path: "./data/knotstore" });
store.open();

store.put({
  id: "entity-1",
  kind: "entity",
  title: "Example entity",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const stats = store.stats();
console.log(stats);

store.close();
```

## Backends

- `sqlite` — structured records and links in a local SQLite file.
- `knot-points` — file-based key/value store for base64-encoded KNOT hashes.
- `hybrid` — combines both; records live in SQLite and KNOT hashes are mirrored to the point store.
