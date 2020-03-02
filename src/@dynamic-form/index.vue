<template>
  <div class="dynamic-form">
    <form
      :id="formId"
      :style="stageOffsetStyles"
      class="dynamic-form__wrapper"
      ref="wrapper"
      novalidate
      @submit.prevent
    >
      <Stage
        v-for="stage in form.stages"
        :key="stage.id"
        :stage="stage"
        :error="form.error"
        :response="form.response"
        :is-active-stage="activeStage.id === stage.id"
        :animation-duration="1750"
      />
    </form>
    <ButtonTray
      v-if="activeStage.showButtons"
      :loading="form.loading"
      :first-stage="form.currentStageIndex === 0"
      :last-stage="form.currentStageIndex === form.stages.length - 1"
      :form-id="formId"
      @back="form.goBack()"
      @submit="form.goForward()"
    />
  </div>
</template>

<script>
import Stage from './components/Stage';
import ButtonTray from './components/ButtonTray';

import {Form} from './classes/Form';

export {Form} from './classes/Form';
export {FormField} from './classes/FormField';
export {FormStage} from './classes/FormStage';

export {emailValidator} from './helpers/validate';
export {passwordValidator} from './helpers/validate';

export default {
  components: {
    Stage,
    ButtonTray,
  },

  data() {
    return {
      mounted: false,
    }
  },

  props: {
    form: {
      type: Form,
      required: true,
    },

    formId: {
      type: String,
      default: 'dynamicForm',
    },
  },

  watch: {
    ['form.currentStageIndex']() {
      this.updateHeight();
    }
  },

  computed: {
    activeStage() {
      return this.form.stages[this.form.currentStageIndex];
    },

    stageOffsetStyles() {
      return {
        transform: `translateX(-${this.form.currentStageIndex * 100}vw)`,
      };
    },
  },

  mounted() {
    this.updateHeight();

    window.addEventListener('resize', this.updateHeight);
  },

  destroyed() {
    window.removeEventListener('resize', this.updateHeight);
  },

  methods: {
    updateHeight() {
      const currentStageEl = document.querySelectorAll(
        '.form-stage'
      )[this.form.currentStageIndex];

      if (currentStageEl) {
        const BUFFER = 40;
        this.$refs.wrapper.style.height = currentStageEl.clientHeight + BUFFER + 'px';
      }
    },
  },
};
</script>

<style scoped lang="scss">
.dynamic-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  overflow: hidden;
}

.dynamic-form__wrapper {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
  transform: translateX(0vw);
  transition: transform 1.75s ease;

  @media(max-width: 600px) {
    padding-top: 20px;
    align-items: flex-start;
    transition: transform 0.55s ease;
  }

  @media(min-width: 600px) {
    height: auto !important;
  }
}
</style>