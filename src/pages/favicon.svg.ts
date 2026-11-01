import type { APIRoute } from 'astro';
import { iconSvg, outlineSvg } from '../utils/brand';

/** The letters are outlined, since a favicon can't load the site's fonts. */
export const GET: APIRoute = async () =>
  new Response(await outlineSvg(iconSvg(32)), {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
