import Database from "better-sqlite3";
import { KNOTLink, KNOTQuery, KNOTRecord, KNOTStats } from "../types";
import { KNOTstoreError } from "../errors";

export class SqliteBackend {
  private db: Database.Database | null = null;

  constructor(private path: string) {}

  open(): void {
    this.db = new Database(this.path);
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS records (
        id TEXT PRIMARY KEY,
        kind TEXT NOT NULL,
        source TEXT,
        title TEXT,
        content TEXT,
        tags TEXT,
        knotHash TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        meta TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_records_kind ON records(kind);
      CREATE INDEX IF NOT EXISTS idx_records_source ON records(source);
      CREATE TABLE IF NOT EXISTS links (
        sourceId TEXT NOT NULL,
        targetId TEXT NOT NULL,
        rel TEXT,
        createdAt TEXT NOT NULL,
        PRIMARY KEY (sourceId, targetId)
      );
      CREATE INDEX IF NOT EXISTS idx_links_source ON links(sourceId);
      CREATE INDEX IF NOT EXISTS idx_links_target ON links(targetId);
    `);
  }

  close(): void {
    this.db?.close();
    this.db = null;
  }

  private ensureOpen(): Database.Database {
    if (!this.db) throw new KNOTstoreError("ECLOSED", "SQLite backend is not open");
    return this.db;
  }

  put(record: KNOTRecord): string {
    const db = this.ensureOpen();
    const stmt = db.prepare(`
      INSERT INTO records (id, kind, source, title, content, tags, knotHash, createdAt, updatedAt, meta)
      VALUES (@id, @kind, @source, @title, @content, @tags, @knotHash, @createdAt, @updatedAt, @meta)
      ON CONFLICT(id) DO UPDATE SET
        kind=excluded.kind,
        source=excluded.source,
        title=excluded.title,
        content=excluded.content,
        tags=excluded.tags,
        knotHash=excluded.knotHash,
        updatedAt=excluded.updatedAt,
        meta=excluded.meta
    `);
    stmt.run({
      id: record.id,
      kind: record.kind,
      source: record.source ?? null,
      title: record.title ?? null,
      content: record.content ?? null,
      tags: record.tags ? JSON.stringify(record.tags) : null,
      knotHash: record.knotHash ?? null,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      meta: record.meta ? JSON.stringify(record.meta) : null,
    });
    return record.id;
  }

  get(id: string): KNOTRecord | null {
    const db = this.ensureOpen();
    const row = db.prepare("SELECT * FROM records WHERE id = ?").get(id) as RecordRow | undefined;
    return row ? this.rowToRecord(row) : null;
  }

  query(filter: KNOTQuery): KNOTRecord[] {
    const db = this.ensureOpen();
    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (filter.kind) {
      conditions.push("kind = ?");
      params.push(filter.kind);
    }
    if (filter.source) {
      conditions.push("source = ?");
      params.push(filter.source);
    }
    if (filter.search) {
      conditions.push("(title LIKE ? OR content LIKE ?)");
      const like = `%${filter.search}%`;
      params.push(like, like);
    }

    let sql = "SELECT * FROM records";
    if (conditions.length) sql += " WHERE " + conditions.join(" AND ");
    sql += " ORDER BY updatedAt DESC";
    if (filter.limit) {
      sql += " LIMIT ?";
      params.push(filter.limit);
    }

    const rows = db.prepare(sql).all(...params) as RecordRow[];
    return rows.map((r) => this.rowToRecord(r));
  }

  link(sourceId: string, targetId: string, meta?: { rel?: string }): void {
    const db = this.ensureOpen();
    db.prepare(
      `INSERT INTO links (sourceId, targetId, rel, createdAt)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(sourceId, targetId) DO UPDATE SET rel=excluded.rel`
    ).run(sourceId, targetId, meta?.rel ?? null, new Date().toISOString());
  }

  getLinks(id: string): { outgoing: KNOTLink[]; incoming: KNOTLink[] } {
    const db = this.ensureOpen();
    const outgoing = db.prepare("SELECT * FROM links WHERE sourceId = ?").all(id) as LinkRow[];
    const incoming = db.prepare("SELECT * FROM links WHERE targetId = ?").all(id) as LinkRow[];
    return {
      outgoing: outgoing.map(this.rowToLink),
      incoming: incoming.map(this.rowToLink),
    };
  }

  stats(): KNOTStats {
    const db = this.ensureOpen();
    const totalRecords = (db.prepare("SELECT COUNT(*) AS c FROM records").get() as { c: number }).c;
    const entitiesWoven = (db.prepare("SELECT COUNT(*) AS c FROM records WHERE kind = 'entity'").get() as { c: number }).c;
    const stubPages = (db.prepare("SELECT COUNT(*) AS c FROM records WHERE kind = 'stub'").get() as { c: number }).c;
    const links = (db.prepare("SELECT COUNT(*) AS c FROM links").get() as { c: number }).c;
    const knotPoints = (db.prepare("SELECT COUNT(*) AS c FROM records WHERE knotHash IS NOT NULL").get() as { c: number }).c;
    const crawlDepth = (db.prepare("SELECT MAX(CAST(json_extract(meta, '$.depth') AS INTEGER)) AS d FROM records WHERE meta IS NOT NULL").get() as { d: number | null }).d ?? 0;

    return {
      totalRecords,
      crawlDepth,
      entitiesWoven,
      stubPages,
      links,
      knotPoints,
    };
  }

  private rowToRecord(row: RecordRow): KNOTRecord {
    return {
      id: row.id,
      kind: row.kind as KNOTRecord["kind"],
      source: row.source ?? undefined,
      title: row.title ?? undefined,
      content: row.content ?? undefined,
      tags: row.tags ? JSON.parse(row.tags) : undefined,
      knotHash: row.knotHash ?? undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      meta: row.meta ? JSON.parse(row.meta) : undefined,
    };
  }

  private rowToLink(row: LinkRow): KNOTLink {
    return {
      sourceId: row.sourceId,
      targetId: row.targetId,
      rel: row.rel ?? undefined,
      createdAt: row.createdAt,
    };
  }
}

type RecordRow = {
  id: string;
  kind: string;
  source: string | null;
  title: string | null;
  content: string | null;
  tags: string | null;
  knotHash: string | null;
  createdAt: string;
  updatedAt: string;
  meta: string | null;
};

type LinkRow = {
  sourceId: string;
  targetId: string;
  rel: string | null;
  createdAt: string;
};
