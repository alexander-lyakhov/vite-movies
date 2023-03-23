<template>
  <div class="poster">
    <img :src="image" width="233" />
    <div class="title" v-html="title"></div>
  </div>
</template>

<script setup>
  const props = defineProps({
    image: {
      type: String,
      required: true
    },

    title: {
      type: String,
      default: ''
    }
  })
</script>

<style lang="scss" scoped>
.poster {
  align-self: start;
  width: 233px;
  cursor: default;

  .title {
    font-size: 1.25rem;
    color: $accent-orange;
    text-align: center;
    line-height: 1.25;
    text-shadow: 1px 1px 1px #000;
    letter-spacing: 1px;
    padding: .5rem 0;
    cursor: default;
  }
}
</style>