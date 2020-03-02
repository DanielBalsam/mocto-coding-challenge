# DynamicForm

A dynamic form component for Vue.js. DynamicForm automatically handles validation for you, and helps you make pretty and accessible cross-browser supported forms in minutes.

## How to use

To generate a form, first we need to create some fields. We do this by importing the FormField class from DynamicForm and instantiating a form field:

```
import {FormField} from '@dynamic-form';

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

const textField = new FormField({
  field: 'text_field',
  label: 'Text field',
  required: true,
});
const numberField = new FormField({
  field: 'number_field',
  label: 'Number field',
  type: 'number',
  min: 0,
  required: false,
});
```

We can also pass validators into our fields, DynamicForm provides a few out of the box but we can also  write our own.

```
import {
  emailValidator,
  passwordValidator,
} from '@dynamic-form';

const alwaysInvalid = (val, label) => {
  return {
    validity: false,
    errorMessage: `Can't make everyone happy`,
  };
};

const emailField = new FormField({
  field: 'email',
  label: 'Email address',
  required: true,
  validator: emailValidator,
});

const passwordField = new FormField({
  field: 'password',
  label: 'Password',
  type: 'password',
  required: true,
  validator: passwordValidator,
});

const alwaysInvalidField = new FormField({
  field: 'invalid',
  label: 'This will never be valid',
  validator: alwaysInvalid,
});
```

Once we've instantiated the fields that we want, we can add stages to our flow like so:

```
import FormStage from '@dynamic-form';

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

const stage1 = new FormStage({
  title: 'Stage 1',
  fields: [
    textField,
    numberField,
  ],
});
const stage2 = new FormStage({
  title: 'Stage 2',
  fields: [
    emailField,
    passwordField,
  ],
  callback() {
    // do something async
  }
});
```

Finally we add our stages to a form object, in order to finalize our config:

```
import Form from '@dynamic-form';

export const myForm = new Form(
  stages: [
    stage1,
    stage2,
  ]
)

```

Now that we have our config, we're ready to import the component in to the Vue instance that you want to use the form in and add to your template.

```
import DynamicForm from '@dynamic-form';

import {myForm} from './my-form.js';

export default {
  components: {
    DynamicForm,
  },

  data() {
    return {
      myForm
    };
  },
};
```

And last but not least in the template like so:

```
<DynamicForm :form="myForm">
```

## Browser Support

DynamicForm works in IE11, FireFox, Edge, Safari, and Chrome. It works on both desktop and mobile.