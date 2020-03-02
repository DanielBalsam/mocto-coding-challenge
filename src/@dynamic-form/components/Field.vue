<template>
  <div class="form-field">
    <div class="form-field__row">
      <label
        :for="field.field"
        class="form-field__label"
        v-text="field.label"
      />
      <input
        :name="field.field"
        :value="field.value"
        :type="field.type"
        :required="field.required"
        :min="field.min"
        :aria-invalid="!field.isValid"
        :tabindex="isActiveStage ? undefined : -1"
        class="form-field__input"
        @input="$e => field.updateValue($e.target.value)"
      >
    </div>
    <div
      :class="{'form-field__error--hide': !field.errorMessage}"
      :role="field.errorMessage ? 'alert' : ''"
      class="form-field__error"
      v-text="field.errorMessage"
    />
  </div>
</template>

<script>
import {FormField} from './../classes/FormField';

export default {
  props: {
    field: {
      type: FormField,
      required: true,
    },

    isActiveStage: {
      type: Boolean,
      default: false,
    }
  },
}
</script>

<style scoped lang="scss">
.form-field {
  width: 100%;

  &:last-of-type {
    .form-field__error {
      margin-bottom: 0px;
    }
  }
}

.form-field__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}

.form-field__error {
  width: 100%;
  color: #c73400;
  opacity: 1;
  transition: opacity 0.25s ease;
  text-align: left;
  margin-bottom: 20px;
  min-height: 1em;
  font-size: 16px;
  letter-spacing: 0.05em;
}

.form-field__error--hide {
  opacity: 0;
}

.form-field__label {
  text-transform: uppercase;
  letter-spacing: .10em;
  min-width: 200px;
  text-align: left;
  margin-bottom: 10px;
  font-weight: bold;
}

.form-field__input {
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  border: 2px solid #00808A;
  transition: border 0.25s ease;
  margin-bottom: 10px;
  width: 100%;
  max-width: 300px;
  transition: border 0.25s ease;
  color: #001215;

  &:focus {
    border: 2px solid #00c5d3;
    outline: none;
  }
}
</style>