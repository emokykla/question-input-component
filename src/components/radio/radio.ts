import './radio.scss';
import html from './radio.hbs';
import { ControllerComponent, ExtendedController } from 'Components/controller-component';

export class Radio extends ControllerComponent {
  readonly identifier = 'qic-radio';
  readonly template = html;
  readonly controller = RadioController;
}

export class RadioController extends ExtendedController {
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
  private topValue: string;
  private leftValue: string;
  private widthValue: string;
  private heightValue: string;
  static classes = [ 'selected' ];
  private selectedClass: string;

  connect() {
    this.assignInitialData({
      name: this.nameValue,
      value: this.valueValue,
      checked: this.checkedValue,
    });
    this.assignSetter([
      this.setTopValue,
      this.setLeftValue,
      this.setWidthValue,
      this.setHeightValue,
    ]);
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

  setTopValue(value: string) {
    this.topValue = value;
  }

  setLeftValue(value: string) {
    this.leftValue = value;
  }

  setWidthValue(value: string) {
    this.widthValue = value;
  }

  setHeightValue(value: string) {
    this.heightValue = value;
  }

}

