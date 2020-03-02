/*
  FormField class represents an input row on form.
  Contructor accepts an object with 7 valid keys:


  REQUIRED KEYS:

  field:string - the name of the key for the form to set in the payload
  label:string - the label to appear beside the input
  required:boolean - is the field required?
  type:string - the actual HTML5 input type I.E. text, number, password, etc.


  OPTIONAL KEYS:

  min:number - minimum for number inputs
  validator:function - custom validator function for input,
                       takes two arguments for value and label of field.
                       should return object that looks like
                       {validity: boolean, errorMessage: string}
                       errorMessage key is optional.
  defaultValue:any - default value for the input on instantiation
*/
let currentFormFieldId = 0;
export class FormField {
  constructor({
    field,
    label,
    required=false,
    type="text",
    min=null,
    validator=null,
    defaultValue=null,
  }) {
    /* NOTE: Considered doing this in TypeScript, but requirements
       said to use ES6 so decided to err on the side of caution
       hence the verbose validation below
    */
    if (
      typeof field !== 'string' ||
      typeof label !== 'string' ||
      typeof required !== 'boolean' ||
      typeof type !== 'string' ||
      (min && typeof min !== 'number') ||
      (validator && typeof validator !== 'function')
    ) {
      throw "Invalid config passed to FormField class.";
    }

    this.field = field;
    this.label = label;
    this.required = required;
    this.type = type;
    this.min = min;
    this.validator = validator;

    this.value = defaultValue;
    this.isValid = true;
    this.errorMessage = '';

    currentFormFieldId++;
    this.id = currentFormFieldId;
  }

  updateValue(value) {
    this.value = value;

    if (!this.isValid) this.checkValidity();
  }

  _setValidity({validity, errorMessage=''}) {
    this.isValid = validity;
    this.errorMessage = errorMessage;

    return validity;
  }

  checkValidity() {
    if (!this.value && this.required) {
      this._setValidity({
        validity: false,
        errorMessage: `${this.label} is a required field.`,
      });
    } else if (
      this.validator &&
      typeof this.validator === 'function'
    ) {
      return this._setValidity(
        this.validator(this.value, this.label)
      );
    } else {
      this._setValidity({
        validity: true
      });
    }

    return this.isValid;
  }
}