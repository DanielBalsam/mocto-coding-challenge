<template>
  <div class="spinner" aria-busy />
</template>

<style lang="scss">
.spinner {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  animation: loading 1s ease infinite;

  /* IE11 */

  @media all and (-ms-high-contrast:none) {
    border-left: 8px solid #008690;
    animation: loadingIE11 1s ease infinite;
  }
}

@keyframes loading {
  0% {
    border-left: 0px solid transparent;
    transform: rotateZ(0deg);
  }

  50% {
    border-left: 8px solid #008690;
  }

  100% {
    border-left: 0px solid transparent;
    transform: rotateZ(360deg);
  }
}

@keyframes loadingIE11 {
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(360deg);
  }
}
</style>