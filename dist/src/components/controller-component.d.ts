import { Controller } from "@hotwired/stimulus";
import * as HandleBars from 'handlebars';
export declare class ControllerComponent extends HTMLElement {
    readonly identifier: string;
    readonly template: HandleBars.Template;
    readonly controller: typeof Controller;
    constructor();
    connectedCallback(): void;
    private startStimulusLocalApplication;
    private setIdentifierData;
    private getValueByShortKey;
    private renderInnerHTML;
}
