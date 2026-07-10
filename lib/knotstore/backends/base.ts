import { KNOTLink, KNOTQuery, KNOTRecord, KNOTStats } from "../types";

export abstract class BaseBackend {
  abstract open(): void;
  abstract close(): void;
  abstract put(record: KNOTRecord): string;
  abstract get(id: string): KNOTRecord | null;
  abstract query(filter: KNOTQuery): KNOTRecord[];
  abstract link(sourceId: string, targetId: string, meta?: { rel?: string }): void;
  abstract getLinks(id: string): { outgoing: KNOTLink[]; incoming: KNOTLink[] };
  abstract stats(): KNOTStats;
}
