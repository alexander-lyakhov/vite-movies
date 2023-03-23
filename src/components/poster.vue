<template>
  <div class="poster">
    <img
      width="233"
      height="344"
      :src="image"
    />

    <div
      class="title"
      v-html="title"
    />
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
  display: flex;
  flex-direction: column;
  align-self: start;
  width: 233px;
  cursor: default;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .title {
    font-size: 1.25rem;
    color: $accent-orange;
    text-align: center;
    line-height: 1.25;
    text-shadow: 1px 1px 1px #000;
    letter-spacing: 1px;
    min-height: 64px;
    padding: .5rem 0;
  }
}
</style>