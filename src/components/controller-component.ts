import { Application, ControllerConstructor } from "@hotwired/stimulus";
import * as HandleBars from 'handlebars';
import { toCamelCase } from 'Utils/camel-case';

interface ControllerConstructorWithClasses extends ControllerConstructor {
  classes?: Array<string>;
}

export class ControllerComponent extends HTMLElement {
  readonly identifier: string;
  readonly template: HandleBars.Template;
  readonly controller: ControllerConstructorWithClasses;
  private application: Application;
  private handleBars = HandleBars.create();

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
    this.handleBars.registerHelper('controllerClass', (key, className) => this.addClassByShortKey(key, className));
    this.handleBars.registerHelper('concat', (value1, value2) => value1 + value2);
    this.handleBars.registerHelper('isEqual', (value1, value2) => value1 === value2);
  }

  private startStimulusLocalApplication() {
    this.application = Application.start(this);
    this.application.register(this.identifier, this.controller);
  }

  private setIdentifierData() {
    this.dataset.controller = this.identifier;
    this.classList.add(this.identifier);
  }

  private addClassByShortKey(key: string, className:string) {
    const attributeKey = `${this.identifier}-${key}-class`;
    const camelCaseKey = toCamelCase(attributeKey);
    this.dataset[camelCaseKey] = className;
  }

  private renderInnerHTML() {
    const template = document.createElement('template');
    // compile to add class names
    this.handleBars.compile(this.template)({ identifier: this.identifier });
    // run async to wait stimulus controller connect
    setTimeout(() => {
      const controller = this.application.getControllerForElementAndIdentifier(this, this.identifier);
      const partials = {
        ...controller,
        identifier: this.identifier,
      };
      template.innerHTML = this.handleBars.compile(this.template)(partials);
      this.append(template.content.cloneNode(true));
    });
  }
}
