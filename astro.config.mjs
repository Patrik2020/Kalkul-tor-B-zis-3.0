import { defineConfig } from 'astro/config';

// The production domain will have a root base; GitHub Pages preview uses the repository subpath.
const isPagesPreview = process.env.GITHUB_PAGES_PREVIEW === 'true';
export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  base: isPagesPreview ? '/Kalkul-tor-B-zis-3.0' : '/',
});
