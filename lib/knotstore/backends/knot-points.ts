import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import { KNOTLink, KNOTQuery, KNOTRecord, KNOTStats } from "../types";
import { KNOTstoreError } from "../errors";
import { BaseBackend } from "./base";

type StoredPoint = {
  id: string;
  knotHash: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

export class KnotPointBackend extends BaseBackend {
  private data = new Map<string, StoredPoint>();
  private links: KNOTLink[] = [];
  private isOpen = false;
  private linksPath: string;

  constructor(private path: string) {
    super();
    this.linksPath = path.replace(/\.jsonl$/, ".links.jsonl");
    if (this.linksPath === path) {
      this.linksPath = `${path}.links.jsonl`;
    }
  }

  open(): void {
    this.data.clear();
    this.links = [];
    this.isOpen = true;

    if (existsSync(this.path)) {
      const text = readFileSync(this.path, "utf8");
      for (const line of text.split("\n")) {
        if (!line.trim()) continue;
        try {
          const obj = JSON.parse(line) as unknown;
          if (
            obj &&
            typeof obj === "object" &&
            "id" in obj &&
            typeof obj.id === "string" &&
            "knotHash" in obj &&
            typeof obj.knotHash === "string" &&
            "createdAt" in obj &&
            typeof obj.createdAt === "string" &&
            "updatedAt" in obj &&
            typeof obj.updatedAt === "string"
          ) {
            this.data.set(obj.id, obj as StoredPoint);
          }
        } catch {
          // skip corrupt lines
        }
      }
    }

    if (existsSync(this.linksPath)) {
      const text = readFileSync(this.linksPath, "utf8");
      for (const line of text.split("\n")) {
        if (!line.trim()) continue;
        try {
          const obj = JSON.parse(line) as KNOTLink;
          this.links.push(obj);
        } catch {
          // skip corrupt lines
        }
      }
    }
  }

  close(): void {
    if (!this.isOpen) return;
    this.flush();
    this.data.clear();
    this.links = [];
    this.isOpen = false;
  }

  private flush(): void {
    const recordLines: string[] = [];
    for (const point of this.data.values()) {
      recordLines.push(JSON.stringify(point));
    }
    writeFileSync(this.path, recordLines.join("\n") + (recordLines.length ? "\n" : ""));

    const linkLines: string[] = [];
    for (const link of this.links) {
      linkLines.push(JSON.stringify(link));
    }
    writeFileSync(this.linksPath, linkLines.join("\n") + (linkLines.length ? "\n" : ""));
  }

  private ensureOpen(): void {
    if (!this.isOpen) {
      throw new KNOTstoreError("ECLOSED", "KNOT point backend is not open");
    }
  }

  put(record: KNOTRecord): string {
    this.ensureOpen();
    if (!record.knotHash) {
      throw new KNOTstoreError("EINVALID", "knot-point records require knotHash");
    }
    const stored: StoredPoint = {
      id: record.id,
      knotHash: record.knotHash,
      meta: record.meta,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
    this.data.set(record.id, stored);
    appendFileSync(this.path, JSON.stringify(stored) + "\n");
    return record.id;
  }

  get(id: string): KNOTRecord | null {
    this.ensureOpen();
    const p = this.data.get(id);
    if (!p) return null;
    return this.toRecord(p);
  }

  query(filter: KNOTQuery): KNOTRecord[] {
    this.ensureOpen();
    const out: KNOTRecord[] = [];
    for (const p of this.data.values()) {
      const r = this.toRecord(p);
      if (filter.kind && r.kind !== filter.kind) continue;
      if (filter.search && !r.id.includes(filter.search) && !r.knotHash?.includes(filter.search))
        continue;
      out.push(r);
      if (filter.limit && out.length >= filter.limit) break;
    }
    return out;
  }

  link(sourceId: string, targetId: string, meta?: { rel?: string }): void {
    this.ensureOpen();
    const link: KNOTLink = {
      sourceId,
      targetId,
      rel: meta?.rel,
      createdAt: new Date().toISOString(),
    };
    this.links.push(link);
    appendFileSync(this.linksPath, JSON.stringify(link) + "\n");
  }

  getLinks(id: string): { outgoing: KNOTLink[]; incoming: KNOTLink[] } {
    this.ensureOpen();
    return {
      outgoing: this.links.filter((l) => l.sourceId === id),
      incoming: this.links.filter((l) => l.targetId === id),
    };
  }

  stats(): KNOTStats {
    this.ensureOpen();
    return {
      totalRecords: this.data.size,
      crawlDepth: 0,
      entitiesWoven: 0,
      stubPages: 0,
      links: this.links.length,
      knotPoints: this.data.size,
    };
  }

  private toRecord(p: StoredPoint): KNOTRecord {
    return {
      id: p.id,
      kind: "knot-point",
      knotHash: p.knotHash,
      meta: p.meta,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    };
  }
}
