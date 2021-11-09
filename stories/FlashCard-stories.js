import { html } from 'lit';

import '../Flash-Card.js';

export default {
  title: 'Flashcard',
  component: 'flash-card',
  argTypes: {
    need: { control: 'text' },
  },
};

function Template({ need = 'flash-card', slot }) {
  return html`
    <flash-card need="${need}"> ${slot} <flash-card> </flash-card></flash-card>
  `;
}
export const Card = Template.bind({});

export const ScienceCard = Template.bind({});
ScienceCard.args = {
  need: 'science',
  slot: html`<p>slotted content that should render</p>`,
};
