import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
test('test environment remains noindex',()=>{const layout=readFileSync('src/layouts/BaseLayout.astro','utf8');assert.match(layout,/noindex,nofollow,noarchive/)});
test('no AdSense scripts in initial scaffold',()=>{for(const path of ['src/layouts/BaseLayout.astro','src/pages/index.astro','src/pages/kalkulatorok.astro'])assert.doesNotMatch(readFileSync(path,'utf8'),/adsbygoogle|pagead2\.googlesyndication/)});
