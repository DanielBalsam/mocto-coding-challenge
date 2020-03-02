
import {
  Form,
  FormField,
  FormStage,
  emailValidator,
  passwordValidator,
} from '../@dynamic-form';

import FinalStage from '../components/FinalStage';

import {register} from '../api/register';

export const generateSignUpForm = () => {
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
  const firstNameField = new FormField({
    field: 'first_name',
    label: 'First name',
    required: true,
  })
  const lastNameField = new FormField({
    field: 'last_name',
    label: 'Last name',
    required: true,
  });
  const ageField = new FormField({
    field: 'age',
    label: 'Age',
    required: true,
    type: 'number',
    min: 0,
  });

  const stage1 = new FormStage({
    title: `Let's get to know you`,
    fields: [
      emailField,
      passwordField,
    ],
  });

  const stage2 = new FormStage({
    title: `Let's reaaaally get to know you`,
    fields: [
      firstNameField,
      lastNameField,
      ageField,
    ],
    callback: register,
  });

  const stage3 = new FormStage({
    title: 'Thanks!',
    innerComponent: FinalStage,
    showButtons: false,
  });

  const form = new Form({
    stages: [
      stage1,
      stage2,
      stage3
    ],
  });

  return form;
};