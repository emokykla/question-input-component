import { ControllerConstructor } from "@hotwired/stimulus";
import * as HandleBars from 'handlebars';
interface ControllerConstructorWithClasses extends ControllerConstructor {
    classes: Array<string>;
}
export declare class ControllerComponent extends HTMLElement {
    readonly identifier: string;
    readonly template: HandleBars.Template;
    readonly controller: ControllerConstructorWithClasses;
    private application;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private registerHandleBarsHelpers;
    private startStimulusLocalApplication;
    private setIdentifierData;
    private getValueByShortKey;
    private addClassByShortKey;
    private renderInnerHTML;
}
export {};
