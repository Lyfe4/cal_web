import type { APIRoute } from 'astro';
import { iconSvg, renderPng, toIco } from '../utils/brand';

/** For browsers and tools that only ask for /favicon.ico. */
export const GET: APIRoute = async () => {
  const pngs = await Promise.all(
    [16, 32, 48].map(async (size) => ({ size, data: await renderPng(iconSvg(size)) }))
  );
  return new Response(new Uint8Array(toIco(pngs)), {
    headers: { 'Content-Type': 'image/x-icon' },
  });
};
