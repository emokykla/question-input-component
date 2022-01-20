import { Application, ControllerConstructor } from "@hotwired/stimulus";
import * as HandleBars from 'handlebars';
import { toCamelCase } from 'Utils/camel-case';

interface ControllerConstructorWithClasses extends ControllerConstructor {
  classes: Array<string>;
}

export class ControllerComponent extends HTMLElement {
  readonly identifier: string;
  readonly template: HandleBars.Template;
  readonly controller: ControllerConstructorWithClasses;
  private application: Application;

  constructor() {
    super();
  }

  connectedCallback(): void {
    this.registerHandleBarsHelpers();
    this.startStimulusLocalApplication();
    this.setIdentifierData();
    this.renderInnerHTML();
  }

  disconnectedCallback(): void {
    this.application?.stop();
  }

  private registerHandleBarsHelpers() {
    HandleBars.registerHelper('controllerValue', (key) => this.getValueByShortKey(key));
    HandleBars.registerHelper('controllerClass', (key, className) => this.addClassByShortKey(key, className));
    HandleBars.registerHelper('concat', (stringA, stringB) => stringA + stringB);
  }

  private startStimulusLocalApplication() {
    this.application = Application.start(this);
    this.application.register(this.identifier, this.controller);
  }

  private setIdentifierData() {
    this.dataset.controller = this.identifier;
    this.classList.add(this.identifier);
  }

  private getValueByShortKey(key: string) {
    const attributeKey = `${this.identifier}-${key}-value`;
    const camelCaseKey = toCamelCase(attributeKey);
    return this.dataset[camelCaseKey];
  }

  private addClassByShortKey(key: string, className:string) {
    const attributeKey = `${this.identifier}-${key}-class`;
    const camelCaseKey = toCamelCase(attributeKey);
    this.dataset[camelCaseKey] = className;
  }

  private renderInnerHTML() {
    const template = document.createElement('template');
    template.innerHTML = HandleBars.compile(this.template)(this.dataset);
    setTimeout(() => {
      this.append(template.content.cloneNode(true));
    });
  }
}
