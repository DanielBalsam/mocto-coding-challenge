<template>
  <header class="header">
    <h1 class="header__title">
      Signup 4 Me
    </h1>
  </header>
</template>

<script>
  export default {
    name: "Header",
  };
</script>

<style scoped lang="scss">
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    border-bottom: 2px solid #008690;
  }

  .header__title {
    text-transform: uppercase;
    font-size: 32px;
    font-weight: 600;
    letter-spacing: 0.12em;
    margin: 0;
    user-select: none;
  }
</style>
