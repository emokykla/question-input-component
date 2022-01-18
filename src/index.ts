import {definitionsFromContext} from '@hotwired/stimulus-webpack-helpers';
import { Application } from "@hotwired/stimulus";
import { Radios } from './components/radios/radios';

const application = Application.start();
const context = require.context("./controllers", true, /\.ts$/);
application.load(definitionsFromContext(context));
(window as any).Stimulus = application;

export { Radios };