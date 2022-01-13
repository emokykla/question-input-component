import {definitionsFromContext} from '@hotwired/stimulus-webpack-helpers';
import { Application } from "@hotwired/stimulus";
import './components/radios/radios.ts';

const application = Application.start();
const context = require.context("./controllers", true, /\.ts$/);
application.load(definitionsFromContext(context));
(window as any).Stimulus = application;