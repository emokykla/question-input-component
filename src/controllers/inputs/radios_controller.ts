import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    top: String,
    left: String,
    width: String,
    height: String,
    checked: String,
  }
  private checkedValue: string;
  static classes = [ 'selected' ];
  private selectedClass: string;
  private selectedClasses: string;

  connect() {
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
    const inputElement = event.target as HTMLInputElement;
    document.querySelector(`${this.element.tagName} [name='${inputElement.name}']:not(:checked)`)?.dispatchEvent(new Event('deselect'));
    this.checkedValue = 'on';
  }

  deselect(event: Event) {
    this.checkedValue = '';
  }
}
