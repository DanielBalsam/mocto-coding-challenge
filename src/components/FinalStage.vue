<template>
  <div
    v-if="response && response.data"
    class="thanks"
  >
    Thanks for signing up {{ response.data.first_name }}! You'll be hearing from us soon 😊
  </div>
</template>

<script>
export default {
  props: {
    response: {
      type: Object,
      default: null,
    }
  }
}
</script>

<style>
 .thanks {
   font-size: 20px;
   letter-spacing: 0.05em;
   margin-bottom: 10px;
 }
</style>