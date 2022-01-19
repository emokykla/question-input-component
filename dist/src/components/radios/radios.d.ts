import './radios.scss';
import RadiosController from 'Controllers/inputs/radios_controller';
import { ControllerComponent } from 'Components/controller-component';
export declare class Radios extends ControllerComponent {
    readonly identifier = "ap-input-radios";
    readonly template: string;
    readonly controller: typeof RadiosController;
}
