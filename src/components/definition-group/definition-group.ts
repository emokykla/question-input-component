import './definition-group.scss';
import html from './definition-group.hbs';
import { ControllerComponent, ExtendedController } from 'Components/controller-component';
import { Radio } from 'Components/radio/radio';

const LINKABLE = 'linkable';
const CHECKED = 'on';
const TYPES = {
  radio: 'radio',
};
const INPUT_TYPE_RADIOS = 'radios';

type ContainerDimensions = { width: number; height: number; };

export class DefinitionGroup extends ControllerComponent {
  readonly identifier = 'qic-definition-group';
  readonly template = html;
  readonly controller = DefinitionGroupController;
}

export class DefinitionGroupController extends ExtendedController {
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
  declare containerDimensionsValue: ContainerDimensions;
  declare readonly inputsTargets: Array<Radio>;

  connect() {
    this.assignInitialData({
      inputList: [],
      types: TYPES,
    });
    this.assignSetter([
      this.setContainerDimensionsValue,
    ]);
    this.initiateInputs();
  }

  initiateInputs() {
    const { id, name, inputs, readonly, answer, options } = this.definitionValue;
    const { hScale, vScale } = DefinitionGroupController.getScales(options.width, this.containerDimensionsValue.width, this.containerDimensionsValue.height );
    inputs?.forEach((definitionItem, definitionItemIndex) => {
      const inputOptions = {
        name: `${name}[${id}]`,
        readonly,
        checked: '',
        value: definitionItemIndex,
        type: this.getType(),
        top: `${definitionItem.top * vScale}%`,
        left: `${definitionItem.left * hScale}%`,
        width: `${definitionItem.width * hScale}%`,
        height: `${definitionItem.height * vScale}%`,
      };
      if (answer[id] && this.getType() === TYPES.radio) {
        if (parseInt(answer[id] as unknown as string, 10) === definitionItemIndex) {
          inputOptions.checked = CHECKED;
        }
      }
      this.$initialData.inputList.push({
        options: inputOptions,
        definition: definitionItem,
      });
    });
  }

  containerDimensionsValueChanged(value: ContainerDimensions) {
    const { inputs, options } = this.definitionValue;
    const { hScale, vScale } = DefinitionGroupController.getScales(options.width, value.width, value.height );
    this.inputsTargets.forEach((inputElement, index) => {
      const definitionItem = inputs[index];
      const top = `${definitionItem.top * vScale}%`;
      const left =  `${definitionItem.left * hScale}%`;
      const width = `${definitionItem.width * hScale}%`;
      const height = `${definitionItem.height * vScale}%`;
      inputElement.$setter.setTopValue(top);
      inputElement.$setter.setLeftValue(left);
      inputElement.$setter.setWidthValue(width);
      inputElement.$setter.setHeightValue(height);
    });
  }

  setContainerDimensionsValue(value: ContainerDimensions) {
    this.containerDimensionsValue = value;
  }

  private static getScales(width: number, containerWidth: number, containerHeight: number) {
    let hScale = 100 / width;
    let vScale = 100 / containerHeight * (containerWidth / width);
    // round
    hScale = hScale.toFixed(4) as unknown as number;
    vScale = vScale.toFixed(4) as unknown as number;

    return { hScale, vScale };
  }

  private getType() {
    if (this.definitionValue.class !== LINKABLE && this.definitionValue.options.type === INPUT_TYPE_RADIOS) {
      return TYPES.radio;
    }

    return TYPES.radio
  }
}
