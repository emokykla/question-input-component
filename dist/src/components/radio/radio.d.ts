import './radio.scss';
import { ControllerComponent } from 'Components/controller-component';
import { Controller } from '@hotwired/stimulus';
export declare class Radio extends ControllerComponent {
    readonly identifier = "qic-radio";
    readonly template: string;
    readonly controller: typeof RadioController;
}
export declare class RadioController extends Controller {
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
    static classes: string[];
    private selectedClass;
    checked: string;
    name: string;
    value: string;
    connect(): void;
    topValueChanged(value: string): void;
    leftValueChanged(value: string): void;
    widthValueChanged(value: string): void;
    heightValueChanged(value: string): void;
    checkedValueChanged(value: string): void;
    select(event: Event): void;
    deselect(event: Event): void;
    triggerDeselectGroupRadios(event: Event): void;
}
