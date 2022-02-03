import { ControllerConstructor, Controller } from "@hotwired/stimulus";
import * as HandleBars from 'handlebars';
import { Context } from '@hotwired/stimulus/dist/types/core/context';
interface ControllerConstructorExtended extends ControllerConstructor {
    classes?: Array<string>;
}
declare type InitialData = {
    [name: string]: any;
} & {
    identifier?: never;
};
declare type Setter = {
    [name: string]: Function;
};
export declare class ExtendedController extends Controller {
    $setter: Setter;
    $initialData: InitialData;
    constructor(context: Context);
    assignInitialData(initialData: InitialData): void;
    assignSetter(setters: Array<Function>): void;
}
export declare class ControllerComponent extends HTMLElement {
    readonly identifier: string;
    readonly template: HandleBars.Template;
    readonly controller: ControllerConstructorExtended;
    private application;
    private handleBars;
    $setter: {
        [name: string]: Function;
    };
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private registerHandleBarsHelpers;
    private startStimulusLocalApplication;
    private setIdentifierData;
    private addClassByShortKey;
    private renderInnerHTML;
}
export {};
