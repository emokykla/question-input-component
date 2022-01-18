import * as HandleBars from 'handlebars';
import html from './radios.hbs';
import './radios.scss';

export class Radios extends HTMLElement {
    private observer: MutationObserver;
    private isSelected: boolean;

    constructor() {
        super();
    }

    connectedCallback(): void {
        this.renderInnerHTML();
        this.setProperties();
        this.setObserver();
        this.setListeners();
    }

    disconnectedCallback(): void {
        this.observer?.disconnect();
    }

    private renderInnerHTML() {
        const template = document.createElement('template');
        template.innerHTML = HandleBars.compile(html)(this.dataset);
        this.append(template.content.cloneNode(true));
    }

    private setObserver () {
        this.observer = new MutationObserver(() => this.setProperties);
        this.observer.observe(this, { attributes: true });
    }

    private setProperties() {
        this.style.top = this.dataset.top;
        this.style.left = this.dataset.left;
        this.style.width = this.dataset.width;
        this.style.height = this.dataset.height;
        if(this.dataset.checked) {
            this.classList.add('ap-input-radios--is-selected');
        } else {
            this.classList.remove('ap-input-radios--is-selected');
        }
    }

    private setListeners() {
        const inputElement = this.querySelector('#input') as HTMLInputElement;
        inputElement.addEventListener('change', () => {
            this.isSelected = inputElement.checked;
            document.querySelector(`[name='${inputElement.name}']:not(:checked)`).dispatchEvent( new Event('deselect'));
            this.classList.add('ap-input-radios--is-selected');
        });
        inputElement.addEventListener('deselect', () => {
            this.isSelected = inputElement.checked;
            this.classList.remove('ap-input-radios--is-selected');
        });
    }
}
