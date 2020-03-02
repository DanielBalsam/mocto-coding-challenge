<template>
  <div class="signup-form">
    <transition
      :duration="1000"
      name="fade"
    >
      <Spinner v-if="loading" />
      <DynamicForm
        v-else
        :form="signupForm"
      />
    </transition>
  </div>
</template>

<script>
import Spinner from '../@dynamic-form/components/Spinner';
import DynamicForm from '../@dynamic-form';

import {generateSignUpForm} from '../helpers/signupForm';

import {getViewModel} from '../api/register';

export default {
  name: "SignupForm",

  components: {
    DynamicForm,
    Spinner,
  },

  data() {
    const signupForm = generateSignUpForm();

    return {
      signupForm,
      loading: true,
    };
  },

  async created() {
    // NOTE: Arbitrary timeout to simulate API calls and show off loading animation

    await getViewModel();

    this.loading = false;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.signup-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  .spinner {
    position: absolute;
    width: 80px;
    height: 80px;
    border-width: 4px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
