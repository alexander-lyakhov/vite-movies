<template>
  <div class="row">
    <div class="row">
      <div class="row-title">{{ title }}</div>
    
      <div class="row-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const props = defineProps({
    title: {
      type: String,
      default: 'Row title'
    }
  })
</script>

<style lang="scss" scoped>
.row {
  background: $bg-600;
  padding: .75rem;

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  &-title {
    font-size: 1.25rem;
    text-shadow: 1px 1px 1px #000000;
    margin: 0 0 .75rem 0;
  }

  &-body {
    display: grid;
    //grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    grid-gap: .5rem;
  }
}
</style>
  