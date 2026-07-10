import { KNOTstoreBackend } from "../types";

export abstract class BaseBackend implements KNOTstoreBackend {
  abstract open(): void;
  abstract close(): void;
  abstract put(record: import("../types").KNOTRecord): string;
  abstract get(id: string): import("../types").KNOTRecord | null;
  abstract query(filter: import("../types").KNOTQuery): import("../types").KNOTRecord[];
  abstract link(sourceId: string, targetId: string, meta?: { rel?: string }): void;
  abstract getLinks(id: string): { outgoing: import("../types").KNOTLink[]; incoming: import("../types").KNOTLink[] };
  abstract stats(): import("../types").KNOTStats;
}
