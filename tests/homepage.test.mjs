import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const homepage = readFileSync('src/pages/index.astro', 'utf8');
const styles = readFileSync('src/styles/home.css', 'utf8');

test('homepage has semantic sections and stable section anchors', () => {
  for (const id of ['hero-heading', 'kategoriak', 'categories-heading', 'popular-heading', 'editorial-heading', 'principles-heading', 'final-cta-heading']) {
    assert.ok(homepage.includes(id), `Missing homepage anchor: ${id}`);
  }
  assert.match(homepage, /<BaseLayout/);
});

test('homepage design avoids inline styles and important overrides', () => {
  assert.doesNotMatch(homepage, /\sstyle\s*=/);
  assert.doesNotMatch(styles, /!important/i);
});

test('planned features are labeled and links point only to existing pages', () => {
  assert.match(homepage, /Kategória hamarosan/);
  assert.match(homepage, /Fejlesztés alatt/);
  assert.match(homepage, /nem valós látogatottsági rangsor/);
  const links = [...homepage.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  const allowed = new Set(['/kalkulatorok', '/aktualis', '#kategoriak']);
  for (const link of links) assert.ok(allowed.has(link), `Unexpected homepage link: ${link}`);
});

test('homepage supports mobile and reduced-motion users', () => {
  assert.match(styles, /max-width:720px/);
  assert.match(styles, /max-width:520px/);
  assert.match(styles, /prefers-reduced-motion:reduce/);
});
