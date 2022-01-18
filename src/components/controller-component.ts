import { Application, Controller } from "@hotwired/stimulus";
import * as HandleBars from 'handlebars';

export class ControllerComponent extends HTMLElement {
  readonly identifier: string;
  readonly template: HandleBars.Template;
  readonly controller = Controller;

  constructor() {
    super();
  }

  connectedCallback(): void {
    this.startStimulusLocalApplication();
    this.setIdentifierData();
    HandleBars.registerHelper('controllerValue', (key) => this.getValueByShortKey(key));
    setTimeout(() => {
      this.renderInnerHTML();
    });
  }

  private startStimulusLocalApplication() {
    const application = Application.start(this);
    application.register(this.identifier, this.controller);
  }

  private setIdentifierData() {
    this.dataset.controller = this.identifier;
    this.classList.add(this.identifier);
  }

  private getValueByShortKey(key: string) {
    const attributeKey = `${this.identifier}-${key}-value`;
    const camelCaseKey = attributeKey.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    return this.dataset[camelCaseKey];
  }

  private renderInnerHTML() {
    const template = document.createElement('template');
    template.innerHTML = HandleBars.compile(this.template)(this.dataset);
    this.append(template.content.cloneNode(true));
  }
}
