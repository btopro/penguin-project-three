import { fixture, expect, html } from '@open-wc/testing';

import '../src/BtoProBox.js';

describe('BtoProBox', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<bto-pro-box></bto-pro-box>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
