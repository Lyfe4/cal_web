/**
 * The public path for a built page. With build.format 'file' the build sees
 * /about.html and /index.html, but they're served as /about and /.
 */
export const canonicalPath = (pathname: string): string =>
  pathname.replace(/\.html$/, '').replace(/(^|\/)index$/, '$1') || '/';
