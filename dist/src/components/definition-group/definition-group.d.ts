import './definition-group.scss';
import { ControllerComponent, ExtendedController } from 'Components/controller-component';
import { Radio } from 'Components/radio/radio';
declare type ContainerDimensions = {
    width: number;
    height: number;
};
export declare class DefinitionGroup extends ControllerComponent {
    readonly identifier = "qic-definition-group";
    readonly template: string;
    readonly controller: typeof DefinitionGroupController;
}
export declare class DefinitionGroupController extends ExtendedController {
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
    containerDimensionsValue: ContainerDimensions;
    readonly inputsTargets: Array<Radio>;
    connect(): void;
    initiateInputs(): void;
    containerDimensionsValueChanged(value: ContainerDimensions): void;
    setContainerDimensionsValue(value: ContainerDimensions): void;
    private static getScales;
    private getType;
}
export {};
