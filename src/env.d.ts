interface ImportMetaEnv {
  /** Cloudflare Web Analytics site token; the beacon is omitted when unset */
  readonly PUBLIC_CF_BEACON_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
