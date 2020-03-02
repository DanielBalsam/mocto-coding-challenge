<template>
  <div
    :class="{'button-tray--hide': !showButtons}"
    class="button-tray"
  >
    <button
      :tabindex="firstStage ? -1 : undefined"
      :class="{'button-tray__button--hide': firstStage}"
      :disabled="loading"
      class="button-tray__button button-tray__button--secondary"
      type="button"
      @click="$emit('back')"
    >
      Back
    </button>
    <button
      :aria-busy="loading"
      :form="formId"
      :disabled="loading"
      class="button-tray__button button-tray__button--primary"
      type="button"
      @click="$emit('submit')"
    >
      <Spinner v-if="loading" />
      <span v-else>
        Next
      </span>
    </button>
  </div>
</template>

<script>
import Spinner from './Spinner';

export default {
  components: {
    Spinner
  },

  props: {
    formId: {
      type: String,
      required: true,
    },

    loading: {
      type: Boolean,
      default: false,
    },

    firstStage: {
      type: Boolean,
      default: false,
    },

    lastStage: {
      type: Boolean,
      default: false,
    },

    showButtons: {
      type: Boolean,
      default: true,
    }
  },
}
</script>

<style scoped lang="scss">
.button-tray {
  display: flex;
  justify-content: center;
  width: 90%;
  margin-top: 30px;
  opacity: 1;
  transition: opacity 1s ease;

  .spinner {
    filter: brightness(150%);
  }
}

.button-tray--hide {
  opacity: 0;
  pointer-events: none;
}

.button-tray__button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 40px;
  border-radius: 20px;
  font-size: 18px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: none;
  padding: 0;
  opacity: 1;
  transition: width 0.75s ease 0s, margin 0.75s ease 0s, opacity 0.5s linear 0.75s;

  @media(max-width: 600px) {
    height: 60px;
    border-radius: 5px;
  }

  &:focus {
    outline-color: #00b5c3;
    outline-style: auto;
    outline-offset: 1px;
    outline-width: 2px;
  }

  &:first-of-type {
    margin-right: 20px;
  }
}

.button-tray__button--hide {
  opacity: 0;
  width: 0px;
  transition: width 0.75s ease 0.5s, margin 0.75s ease 0.5s, opacity 0.5s linear 0s;

  &:first-of-type {
    margin-right: 0px;
  }
}

.button-tray__button--secondary {
  border: 1px solid #323232;
  background: white;
}

.button-tray__button--primary {
  background: #00808A;
  color: white;
}
</style>