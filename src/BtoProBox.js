import { LitElement, html, css } from 'lit';
import { I18NMixin } from '@lrnwebcomponents/i18n-manager/lib/I18NMixin.js';

/**
 * Things (intentionally) left undone but that would need taken into account
 * from this example:
 * - Hitting Enter while typing the answer in the input SHOULD trigger a click
 * / submit style event on the "Check answer" button. This way the user has a
 * more natural experience when using this.
 * - obviously more style work
 * - the slot while taking in the answer, needs some way of supporting visually
 * the image or whatever the material being asked about is while NOT assuming
 * that the information can be obtained in a purely by asking for textContent
 * as it does currently. This might be a specific element to find within a slot
 * of these names (hypothetically; again, something LIKE this).
 * - A string is left untranslated
 * - Obviously the correct / incorrect status should be visualized in some
 * manner that places it either directly over the item in question (as per comp)
 * or is an outline. Something more visually appealing. This could also provide
 * some thought on how the slot API is constructed here because you almost want
 * the asnwer to be different from the content so that it can be overlayed over
 * top of it (again, if going for matching the comp on this one). There are ways
 * of accomplishing that while maintaining the same approach shown but figured
 * I'd at least mention it.
 * - Also if we're going for language based words an option that uses browser
 * synthesis (like your penguin element) to allow for a click to hear a pronounciation
 * would be killer. The browser voice overs are able to tap into language and speak
 * things other than english (as well as british / accents) so worth a look.
 *
 * The localCompare function you wrote is very impressive and I never realized
 * that was a thing. Great solution taking into account i18n ahead of time here.
 */

export class BtoProBox extends I18NMixin(LitElement) {
  static get tag() {
    return 'bto-pro-box';
  }

  constructor() {
    super();
    this.back = false;
    this.correct = false;
    this.showResult = false;
    this.statusIcon = '';
    this.sideToShow = 'front';
    this.userAnswer = '';
    this.t = {
      yourAnswer: 'Your answer',
      checkAnswer: 'Check answer',
      restartActivity: 'Restart activity',
    };
    this.registerLocalization({
      context: this,
      localesPath: new URL('../locales/', import.meta.url).href,
      locales: ['es'],
    });
  }

  static get properties() {
    return {
      ...super.properties,
      back: { type: Boolean, reflect: true },
      sideToShow: { type: String, reflect: true, attribute: 'side-to-show' },
      userAnswer: { type: String, attribute: 'user-answer' },
      correct: { type: Boolean, reflect: true },
      showResult: { type: Boolean, attribute: 'show-result', reflect: true },
      statusIcon: { type: String, attribute: false },
    };
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'correct') {
        this.statusIcon = this[propName]
          ? 'icons:check-circle'
          : 'icons:cancel';
      }
      if (propName === 'back') {
        this.sideToShow = this[propName] ? 'back' : 'front';
      }
      if (propName === 'showResult' && this[propName]) {
        import('@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js');
        import('@lrnwebcomponents/simple-icon/lib/simple-icons.js');
      }
    });
  }

  // Need this instead of .toUpperCase() for i18n
  equalsIgnoringCase(text) {
    return (
      text.localeCompare(this.userAnswer, undefined, {
        sensitivity: 'base',
      }) === 0
    );
  }

  // Use data-correct-answer so that parent elements will be able to
  // know if the answer was correct or incorrect
  // We might need to add an incorrect data attribute not sure yet......
  checkUserAnswer() {
    const side = this.back ? 'front' : 'back';
    const comparison = this.shadowRoot
      .querySelector(`slot[name="${side}"]`)
      .assignedNodes({ flatten: true })[0].innerText;
    console.log(comparison);
    this.correct = this.equalsIgnoringCase(comparison);
    console.log(this.correct);
    this.showResult = true;
    // reverse so that it swaps which slot is shown
    this.sideToShow = !this.back ? 'back' : 'front';
  }

  // as the user types input, grab the value
  // this way we can react to disable state among other things
  inputChanged(e) {
    this.userAnswer = e.target.value;
  }

  // reset the interaction to the defaults
  resetCard() {
    this.userAnswer = '';
    this.correct = false;
    this.showResult = false;
    this.sideToShow = this.back ? 'back' : 'front';
  }

  // CSS - specific to Lit
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .answer-section {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 300px;
        border-radius: 20px;
        border: solid 1px gray;
      }
      .answer-section:focus-within {
        border-color: #9ecaed;
        box-shadow: 0 0 10px #9ecaed;
      }
      input {
        border: none;
        background-color: none;
        padding: 10px;
        margin: 2px;
        border-radius: 20px;
        font-size: 14px;
      }
      input:focus {
        outline: none;
      }
      button#check {
        background-color: #0a7694;
        color: white;
        font-size: 14px;
        margin: none;
        padding: 14px;
        border-radius: 0px 20px 20px 0px;
        border: none;
      }
      button#retry {
        background-color: #0a7694;
        color: white;
        font-size: 14px;
        margin: none;
        padding: 14px;
        border-radius: 20px;
        border: none;
      }
      button:hover {
        opacity: 0.8;
      }
      button:disabled {
        opacity: 0.5;
        background-color: #dddddd;
        color: black;
      }
      p {
        font-family: Helvetica;
        color: gray;
        font-weight: normal;
        font-size: 20px;
      }
      :host([side-to-show='front']) slot[name='back'] {
        display: none;
      }
      :host([side-to-show='back']) slot[name='front'] {
        display: none;
      }

      :host([correct]) simple-icon-lite {
        color: green;
      }
      simple-icon-lite {
        --simple-icon-width: 50px;
        --simple-icon-height: 50px;
        color: red;
      }

      .sr-only {
        position: absolute;
        left: -10000px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }
    `;
  }

  // HTML - specific to Lit
  render() {
    return html`
      <p id="question">
        <slot name="front"></slot>
        <slot name="back"></slot>
      </p>
      <div class="answer-section">
        <input
          id="answer"
          type="text"
          .placeholder="${this.t.yourAnswer}"
          @input="${this.inputChanged}"
          .value="${this.userAnswer}"
        />
        <button
          id="check"
          ?disabled="${this.userAnswer === ''}"
          @click="${this.checkUserAnswer}"
        >
          ${this.t.checkAnswer}
        </button>
      </div>
      ${this.showResult
        ? html`<simple-icon-lite icon="${this.statusIcon}"></simple-icon-lite>
            <button id="retry" @click="${this.resetCard}">
              ${this.t.restartActivity}
            </button>`
        : ``}
    `;
  }
}

customElements.define(BtoProBox.tag, BtoProBox);
