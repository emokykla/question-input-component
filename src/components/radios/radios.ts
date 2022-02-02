import './radios.scss';
import html from './radios.hbs';
import { ControllerComponent } from 'Components/controller-component';
import { Controller } from '@hotwired/stimulus';

export class Radios extends ControllerComponent {
  readonly identifier = 'ap-input-radios';
  readonly template = html;
  readonly controller = RadiosController;
}

export class RadiosController extends Controller {
  static values = {
    top: String,
    left: String,
    width: String,
    height: String,
    checked: String,
    name: String,
    value: String,
  }
  private checkedValue: string;
  private nameValue: string;
  private valueValue: string;
  static classes = [ 'selected' ];
  private selectedClass: string;
  checked: string;
  name: string;
  value: string;

  connect() {
    this.name = this.nameValue;
    this.value = this.valueValue;
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

  checkedValueChanged(value: string) {
    if (value) {
      this.element.classList.add(this.selectedClass);
    } else {
      this.element.classList.remove(this.selectedClass);
    }
    this.checked = value;console.log(value, this.selectedClass);
  }

  select(event: Event) {
    this.checkedValue = 'on';
    this.triggerDeselectGroupRadios(event);
  }

  deselect(event: Event) {
    this.checkedValue = '';
  }

  triggerDeselectGroupRadios(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const deselectedRadios = document.querySelectorAll(
      `${this.element.tagName} [name='${inputElement.name}']:not(:checked)`
    );
    deselectedRadios?.forEach((element) => {
      element.dispatchEvent(new Event('deselect'));
    });
  }
}

