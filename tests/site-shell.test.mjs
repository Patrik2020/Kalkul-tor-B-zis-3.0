import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const layout = readFileSync('src/layouts/BaseLayout.astro','utf8');
const home = readFileSync('src/pages/index.astro','utf8');
const shell = readFileSync('src/styles/shell.css','utf8');
test('no demo calculator in homepage hero', () => {
  assert.doesNotMatch(home,/home-preview-card/);
  assert.match(home,/home-editorial-art/);
});
test('shell exposes real theme and accessibility controls', () => {
  for (const id of ['theme-toggle','accessibility-toggle','accessibility-large-text','accessibility-contrast','site-help-panel','site-language']) assert.ok(layout.includes(id), id);
  assert.match(layout,/localStorage\.setItem/);
  assert.match(layout,/aria-expanded/);
  assert.match(shell,/data-theme="dark"/);
});
test('original existing site favicon is referenced rather than redrawn', () => {
  assert.match(layout,/kalkulatorbazis\.hu\/favicon\/web-app-manifest-512x512\.png/);
});
test('footer labels unimplemented legal pages rather than linking to missing routes', () => {
  assert.match(layout,/elő készítés alatt|előkészítés alatt/);
  assert.doesNotMatch(layout,/href="\/(adatvedelem|impresszum|sutik)"/);
});
