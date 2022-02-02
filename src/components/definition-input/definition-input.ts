import './definition-input.scss';
import html from './definition-input.hbs';
import { ControllerComponent } from 'Components/controller-component';
import { Controller } from '@hotwired/stimulus';

export class DefinitionInput extends ControllerComponent {
  readonly identifier = 'ap-definition-input';
  readonly template = html;
  readonly controller = DefinitionInputController;
}

export class DefinitionInputController extends Controller {
  static targets = [ 'inputs' ];
  static values = {
    definition: Object,
    containerDimensions: Object,
  }
  declare readonly definitionValue: {
    id: number,
    name: string,
    class: string,
    inputs: Array<any>,
    readonly: boolean,
    answer: Array<any>,
    options: any,
  };
  declare readonly containerDimensionsValue: { width: number; height: number; };
  declare readonly inputsTargets: Array<ControllerComponent>;

  inputList = [] as Array<any>;
  type = {
    radio: 'radio',
  };

  connect() {
    const { id, name, inputs, readonly, answer, options } = this.definitionValue;
    this.inputList = [];
    let hScale = 100 / options.width;
    let vScale = 100 / this.containerDimensionsValue.height * (this.containerDimensionsValue.width / options.width);
    // round
    hScale = hScale.toFixed(4) as unknown as number;
    vScale = vScale.toFixed(4) as unknown as number;

    inputs?.forEach((definitionItem, definitionItemIndex) => {
      const inputOptions = {
        name: `${name}[${id}]`,
        readonly,
        checked: '',
        value: definitionItemIndex,
        type: this.type.radio,
        top: `${definitionItem.top * vScale}%`,
        left: `${definitionItem.left * hScale}%`,
        width: `${definitionItem.width * hScale}%`,
        height: `${definitionItem.height * vScale}%`,
      };
      if (answer[id] && this.definitionValue.class !== 'linkable') {
        if (parseInt(answer[id] as unknown as string, 10) === definitionItemIndex) {
          inputOptions.checked = 'on';
        }
      }
      this.inputList.push({
        options: inputOptions,
        definition: definitionItem,
      });
    });
  }

  containerDimensionsValueChanged(value: { width: number; height: number; }) {
    const { inputs, options } = this.definitionValue;
    let hScale = 100 / options.width;
    let vScale = 100 / this.containerDimensionsValue.height * (this.containerDimensionsValue.width / options.width);
    // round
    hScale = hScale.toFixed(4) as unknown as number;
    vScale = vScale.toFixed(4) as unknown as number;
    this.inputsTargets.forEach((inputElement, index) => {
      const definitionItem = inputs[index];
      const top = `${definitionItem.top * vScale}%`;
      const left =  `${definitionItem.left * hScale}%`;
      const width = `${definitionItem.width * hScale}%`;
      const height = `${definitionItem.height * vScale}%`;
      inputElement.setAttribute(`data-${inputElement.identifier}-top-value`, top);
      inputElement.setAttribute(`data-${inputElement.identifier}-left-value`, left);
      inputElement.setAttribute(`data-${inputElement.identifier}-width-value`, width);
      inputElement.setAttribute(`data-${inputElement.identifier}-height-value`, height);
    });
  }
}
