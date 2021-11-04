import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../rename-me.js';

describe('RenameMe', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<rename-me></rename-me>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot.querySelector('h1');
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('cool');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
