import './definition-input.scss';
import { ControllerComponent } from 'Components/controller-component';
import { Controller } from '@hotwired/stimulus';
export declare class DefinitionInput extends ControllerComponent {
    readonly identifier = "ap-definition-input";
    readonly template: string;
    readonly controller: typeof DefinitionInputController;
}
export declare class DefinitionInputController extends Controller {
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
    readonly inputsTargets: Array<ControllerComponent>;
    inputList: any[];
    type: {
        radio: string;
    };
    connect(): void;
    containerDimensionsValueChanged(value: {
        width: number;
        height: number;
    }): void;
}
