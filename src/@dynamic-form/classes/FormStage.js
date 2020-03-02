import {FormField} from './FormField';

/*
  FormStage represents a stage of the form.

  FormStage can be composed of FormFields, and/or a custom component.

  If buttons are visible, callback can be provided to the "Next" button.

  Constructor accepts an object with 5 valid keys:

  title:string - helpful text to appear on top of form stage
  innerComponent:VueComponent - VueComponent that will appear below the title
  formField:Array<FormField> - Array of form fields to show the actual fields to edit for this stage
  showButtons:boolean - Show buttons to move forwards and backwards through the form
  callback:function - additional callback to run after form validation.
                      Can return a promise for async form advancement.
*/
let currentFormStageId = 0;

export class FormStage {
  constructor({
    title="",
    innerComponent=null,
    fields=[],
    showButtons=true,
    callback=null,
  }) {
    /* NOTE: Considered doing this in TypeScript, but requirements
       said to use ES6 so decided to err on the side of caution
       hence the verbose validation below
    */
    fields.forEach((field) => {
      if (!(field instanceof FormField)) throw "Fields must use FormField class."
    });

    this.showButtons = showButtons;
    this.title = title;
    this.innerComponent = innerComponent;
    this.callback = callback;
    this.fields = fields;

    currentFormStageId++;
    this.id = currentFormStageId;
  }

  _validate() {
    let valid = true;
    this.fields.forEach((field) => {
      const fieldValid = field.checkValidity();

      if (!fieldValid) valid = false;
    });

    return valid;
  }

  submit(payload) {
    return new Promise((resolve, reject) => {
      let formValid = this._validate();

      if (!formValid) {
        reject();
        return;
      }

      const asyncCallback = async () => {
        try {
          const response = await this.callback(payload);

          resolve(response);
        } catch(e) {
          reject(e);
        }
      }

      if (this.callback) asyncCallback();
      else resolve()
    });
  }
}