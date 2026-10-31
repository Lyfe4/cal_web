import type { APIRoute } from 'astro';
import { renderPng, siteCardSvg } from '../utils/brand';

/** The sitewide social card, at the path the old site published it. */
export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await renderPng(siteCardSvg())), {
    headers: { 'Content-Type': 'image/png' },
  });
