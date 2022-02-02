import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
    static values: {
        id: NumberConstructor;
        inputs: ArrayConstructor;
        points: NumberConstructor;
        type: string;
        containerHeight: NumberConstructor;
        containerWidth: NumberConstructor;
    };
    readonly idValue: number;
    connect(): void;
}
