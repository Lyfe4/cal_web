interface ImportMetaEnv {
  /** Cloudflare Web Analytics site token; the beacon is omitted when unset */
  readonly PUBLIC_CF_BEACON_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// subset-font ships no types; this covers the call src/utils/brand.ts makes.
declare module 'subset-font' {
  export default function subsetFont(
    font: Buffer,
    text: string,
    options?: {
      targetFormat?: 'sfnt' | 'woff' | 'woff2' | 'truetype';
      variationAxes?: Record<string, number | { min: number; max: number; default?: number }>;
    }
  ): Promise<Buffer>;
}
