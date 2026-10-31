import type { APIRoute } from 'astro';
import { business } from '../data/site';
import { brandColors } from '../utils/brand';

export const GET: APIRoute = () =>
  Response.json({
    name: business.name,
    short_name: 'Calvin R Dev',
    description: 'Websites and web apps for businesses across Australia.',
    start_url: '/',
    display: 'standalone',
    theme_color: brandColors.bg,
    background_color: brandColors.bg,
    icons: [
      { src: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/icon-192.png', type: 'image/png', sizes: '192x192', purpose: 'any maskable' },
      { src: '/icon-512.png', type: 'image/png', sizes: '512x512', purpose: 'any maskable' },
    ],
  });
