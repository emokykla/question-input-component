import './radios.scss';
import RadiosController from '../../controllers/inputs/radios_controller';
import { ControllerComponent } from '../controller-component';
export declare class Radios extends ControllerComponent {
    readonly identifier = "ap-input-radios";
    readonly template: string;
    readonly controller: typeof RadiosController;
}
