import type { APIRoute, GetStaticPaths } from 'astro';
import { iconSvg, renderPng } from '../utils/brand';

/**
 * The PNG icons, at the paths the old site published them. The manifest icons
 * are maskable, so their letters shrink into the central safe zone.
 */
const icons = {
  'favicon-16': { size: 16, scale: 1 },
  'favicon-32': { size: 32, scale: 1 },
  'apple-touch-icon': { size: 180, scale: 1 },
  'icon-192': { size: 192, scale: 0.8 },
  'icon-512': { size: 512, scale: 0.8 },
} as const;

export const getStaticPaths = (() =>
  Object.entries(icons).map(([icon, props]) => ({
    params: { icon },
    props,
  }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ size: number; scale: number }> = async ({ props: { size, scale } }) =>
  new Response(new Uint8Array(await renderPng(iconSvg(size, scale))), {
    headers: { 'Content-Type': 'image/png' },
  });
