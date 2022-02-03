# Stimulus js based controller

# Handlebars based template

# Controller and Template are wrapped by Custom web component

Custom Handlebars helper 'controllerClass' assign stimulus classes to controller element.
Template use controller $initialData as partials.
Controller $setter are assigned to controller element.

To run properly Component should have valid tag name (ex. `<iqc-radio>`)
and required attributes
```
<qic-radio
    data-qic-radio-name-value="_input[1][0]"
    data-qic-radio-value-value="0"
    data-qic-radio-checked-value=""
    data-qic-radio-top-value="100px"
    data-qic-radio-left-value="20px"
    data-qic-radio-width-value="80px"
    data-qic-radio-height-value="80px"
>
```
Componet inner html are rendering once element are connected and use initial data. To change/update component needs to edit attributes by Stimulus js way, or use $setter defined methods.
