import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
    static values: {
        top: StringConstructor;
        left: StringConstructor;
        width: StringConstructor;
        height: StringConstructor;
        checked: StringConstructor;
    };
    private checkedValue;
    static classes: string[];
    private selectedClass;
    private selectedClasses;
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
