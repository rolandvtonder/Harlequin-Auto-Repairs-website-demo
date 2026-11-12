/**
 * Prefixes a site-root path with the deploy base, so the same build works at
 * a domain root (base "/") and in a sub-folder such as a GitHub Pages
 * project site (base "/Harlequin-Auto-Repairs-website-demo").
 */
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

export const link = (path: string) => (path.startsWith('/') && !path.startsWith(base + '/') ? `${base}${path}` : path);
