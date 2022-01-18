import './radios.scss';
export declare class Radios extends HTMLElement {
    private observer;
    private isSelected;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private renderInnerHTML;
    private setObserver;
    private setProperties;
    private setListeners;
}
