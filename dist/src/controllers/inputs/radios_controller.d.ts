import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
    static values: {
        top: StringConstructor;
        left: StringConstructor;
        width: StringConstructor;
        height: StringConstructor;
    };
    connect(): void;
    topValueChanged(value: string): void;
    leftValueChanged(value: string): void;
    widthValueChanged(value: string): void;
    heightValueChanged(value: string): void;
    select(): void;
}
