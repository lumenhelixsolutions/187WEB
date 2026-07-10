export type KNOTstoreErrorCode = "ENOENT" | "ECONFLICT" | "EINVALID" | "ECLOSED" | "EUNKNOWN";

export class KNOTstoreError extends Error {
  code: KNOTstoreErrorCode;

  constructor(code: KNOTstoreErrorCode, message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "KNOTstoreError";
    this.code = code;
  }
}
