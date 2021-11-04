import { html } from 'lit';

import '../rename-me.js';

export default {
  title: 'Rename me',
  component: 'rename-me',
  argTypes: {
    need: { control: 'text' },
  },
};

function Template({ need = 'rename', slot }) {
  return html` <rename-me need="${need}"> ${slot} </rename-me> `;
}
export const Card = Template.bind({});

export const ScienceCard = Template.bind({});
ScienceCard.args = {
  need: 'science',
  slot: html`<p>slotted content that should render</p>`,
};
