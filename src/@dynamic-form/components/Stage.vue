<template>
  <div class="form-stage">
    <fieldset class="form-stage__inner">
      <legend class="form-stage__title">
        {{ stage.title }}
      </legend>
      <component
        v-if="stage.innerComponent"
        :is="stage.innerComponent"
        :response="response"
      />
      <Field
        v-for="field in stage.fields"
        :key="field.id"
        :field="field"
        :is-active-stage="isActiveStage"
      />
      <div
        v-if="error"
        class="form-stage__error"
        v-text="error"
      />
    </fieldset>
  </div>
</template>

<script>
import Field from './Field';

import {FormStage} from './../classes/FormStage';

export default {
  components: {
    Field,
  },

  props: {
    stage: {
      type: FormStage,
      required: true,
    },

    isActiveStage: {
      type: Boolean,
      default: false,
    },

    error: {
      type: String,
      default: '',
    },

    animationDuration: {
      type: Number,
      default: 0,
    },

    response: {
      type: Object,
      default: null,
    }
  },

  watch: {
    isActiveStage(val) {
      if (val) {
        const firstInput = this.$el.querySelector('input');

        if (firstInput) window.setTimeout(() => {
          firstInput.focus();
        }, this.animationDuration);
      }
    },
  },
}
</script>

<style scoped lang="scss">
.form-stage {
  display: flex;
  justify-content: center;
  width: 100vw;
  flex-shrink: 0;
}

.form-stage__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 90%;
  border: 3px solid #00808A;
  border-radius: 5px;
  padding: 20px;
}

.form-stage__title {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 26px;
  letter-spacing: 0.1em;
  margin-bottom: 10px;
}

.form-stage__error {
  width: 100%;
  color: #c73400;
  font-weight: bold;
  opacity: 1;
  transition: opacity 0.25s ease;
  text-align: left;
  margin-bottom: 20px;
  min-height: 1em;
  font-size: 16px;
  letter-spacing: 0.05em;
}
</style>