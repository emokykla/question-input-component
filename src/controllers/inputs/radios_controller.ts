import { Controller } from "@hotwired/stimulus"
import html from 'templates/inputs/radios.hbs';

const template = document.createElement('template');
template.innerHTML = html;

export default class extends Controller {
    static values = {
        top: String,
        left: String,
        width: String,
        height: String,
    }

    connect() {
        console.log("Hello, Stimulus!");
        //this.element.append(template.content.cloneNode(true));
    }

    topValueChanged(value: string) {
        (this.element as HTMLElement).style.top = value;
    }

    leftValueChanged(value: string) {
        (this.element as HTMLElement).style.left = value;
    }

    widthValueChanged(value: string) {
        (this.element as HTMLElement).style.width = value;
    }

    heightValueChanged(value: string) {
        (this.element as HTMLElement).style.height = value;
    }

    select() {
        console.log('selected');
    }
}