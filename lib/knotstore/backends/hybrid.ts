import { KNOTLink, KNOTQuery, KNOTRecord, KNOTStats } from "../types";
import { SqliteBackend } from "./sqlite";
import { KnotPointBackend } from "./knot-points";

export class HybridBackend {
  private sqlite: SqliteBackend;
  private points: KnotPointBackend;

  constructor(dbPath: string, pointsPath: string) {
    this.sqlite = new SqliteBackend(dbPath);
    this.points = new KnotPointBackend(pointsPath);
  }

  open(): void {
    this.sqlite.open();
    this.points.open();
  }

  close(): void {
    this.sqlite.close();
    this.points.close();
  }

  put(record: KNOTRecord): string {
    this.sqlite.put(record);
    if (record.knotHash) {
      this.points.put({
        ...record,
        kind: "knot-point",
      });
    }
    return record.id;
  }

  get(id: string): KNOTRecord | null {
    const sql = this.sqlite.get(id);
    const pt = this.points.get(id);
    if (!sql && !pt) return null;
    return {
      ...(sql ?? pt!),
      knotHash: pt?.knotHash ?? sql?.knotHash,
    };
  }

  query(filter: KNOTQuery): KNOTRecord[] {
    const sql = this.sqlite.query(filter);
    const ids = new Set(sql.map((r) => r.id));
    const pts = this.points.query(filter).filter((r) => !ids.has(r.id));
    return [...sql, ...pts];
  }

  link(sourceId: string, targetId: string, meta?: { rel?: string }): void {
    this.sqlite.link(sourceId, targetId, meta);
    this.points.link(sourceId, targetId, meta);
  }

  getLinks(id: string): { outgoing: KNOTLink[]; incoming: KNOTLink[] } {
    return this.sqlite.getLinks(id);
  }

  stats(): KNOTStats {
    const s1 = this.sqlite.stats();
    const s2 = this.points.stats();
    return {
      totalRecords: s1.totalRecords,
      crawlDepth: s1.crawlDepth,
      entitiesWoven: s1.entitiesWoven,
      stubPages: s1.stubPages,
      links: s1.links,
      knotPoints: s2.knotPoints,
    };
  }
}
