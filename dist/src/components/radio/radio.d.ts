import './radio.scss';
import { ControllerComponent, ExtendedController } from 'Components/controller-component';
export declare class Radio extends ControllerComponent {
    readonly identifier = "qic-radio";
    readonly template: string;
    readonly controller: typeof RadioController;
}
export declare class RadioController extends ExtendedController {
    static values: {
        top: StringConstructor;
        left: StringConstructor;
        width: StringConstructor;
        height: StringConstructor;
        checked: StringConstructor;
        name: StringConstructor;
        value: StringConstructor;
    };
    private checkedValue;
    private nameValue;
    private valueValue;
    private topValue;
    private leftValue;
    private widthValue;
    private heightValue;
    static classes: string[];
    private selectedClass;
    connect(): void;
    topValueChanged(value: string): void;
    leftValueChanged(value: string): void;
    widthValueChanged(value: string): void;
    heightValueChanged(value: string): void;
    checkedValueChanged(value: string): void;
    select(event: Event): void;
    deselect(event: Event): void;
    triggerDeselectGroupRadios(event: Event): void;
    setTopValue(value: string): void;
    setLeftValue(value: string): void;
    setWidthValue(value: string): void;
    setHeightValue(value: string): void;
}
