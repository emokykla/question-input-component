import './definition-group.scss';
import { ControllerComponent } from 'Components/controller-component';
import { Controller } from '@hotwired/stimulus';
import { Radio } from 'Components/radio/radio';
export declare class DefinitionGroup extends ControllerComponent {
    readonly identifier = "qic-definition-group";
    readonly template: string;
    readonly controller: typeof DefinitionGroupController;
}
export declare class DefinitionGroupController extends Controller {
    static targets: string[];
    static values: {
        definition: ObjectConstructor;
        containerDimensions: ObjectConstructor;
    };
    readonly definitionValue: {
        id: number;
        name: string;
        class: string;
        inputs: Array<any>;
        readonly: boolean;
        answer: Array<any>;
        options: any;
    };
    readonly containerDimensionsValue: {
        width: number;
        height: number;
    };
    readonly inputsTargets: Array<Radio>;
    inputList: any[];
    types: {
        radio: string;
    };
    connect(): void;
    containerDimensionsValueChanged(value: {
        width: number;
        height: number;
    }): void;
    private static getScales;
    private getType;
}
