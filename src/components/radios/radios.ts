import './radios.scss';
import html from './radios.hbs';
import RadiosController from '../../controllers/inputs/radios_controller';
import { ControllerComponent } from '../controller-component';

export class Radios extends ControllerComponent {
  readonly identifier = 'ap-input-radios';
  readonly template = html;
  readonly controller = RadiosController;
}
