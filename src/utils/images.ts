import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

/**
 * AVIF and WebP versions of an image at a few widths, for a <picture>.
 *
 * Each format gets its own quality: AVIF at WebP's quality 80 comes out larger than the
 * WebP on text-heavy UI captures, while 55 matches it visually at about half the bytes.
 */
export const responsiveSources = async (
  image: ImageMetadata,
  candidates: number[] = [400, 640, 800, 1160]
) => {
  // Candidate widths up to the image's own width; never upscale.
  const widths = [...new Set(candidates.filter((w) => w < image.width).concat(image.width))];

  const [avif, webp] = await Promise.all([
    getImage({ src: image, format: 'avif', quality: 55, widths }),
    getImage({ src: image, format: 'webp', quality: 80, widths }),
  ]);
  return { avif, webp };
};
