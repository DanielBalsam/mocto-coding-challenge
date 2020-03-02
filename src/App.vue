<template>
  <div id="app" v-cloak>
    <SignupForm />
  </div>
</template>

<script>
import SignupForm from "./components/SignupForm";

export default {
  name: "App",
  components: {
    SignupForm,
  },
};
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0px 0px 40px;
  background: #EDFEFF;
  font-size: 20px;
}

* {
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  font-family: Titillium Web, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #001215;
  text-align: center;
  min-height: 100vh;
}

a {
  color: #42b983;
}
</style>
