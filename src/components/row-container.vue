<template>
  <div class="row">
    <div class="row-title">{{ title }}</div>
  
    <div class="row-body" :style="styleObject">
      <template v-for="(item, index) in items" :key="index">
        <slot v-bind="{item}"></slot>
      </template>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, computed } from 'vue'

  const props = defineProps({
    title: {
      type: String,
      default: 'Row title'
    },
    itemWidth: {
      type: Number,
      default: 80
    },
    items: {
      type: Array,
      default: () => ([])
    }
  })

  const styleObject = {
    'grid-template-columns': `repeat(auto-fit, minmax(${props.itemWidth}px, 1fr))`
  }
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
    grid-gap: .5rem;
  }
}
</style>
  