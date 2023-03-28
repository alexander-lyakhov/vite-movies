<template>
  <div class="lock" v-show="modelValue">
    <div class="lock-overlay" />
    <div class="lock-spinner" />
  </div>
</template>

<script setup>
  import { watchEffect } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: true
    }
  })

  watchEffect(() =>
    document.body.style.overflow = props.modelValue ? 'hidden':'auto'
  )
</script>

<style lang="scss" scoped>
.lock {
  position: fixed;
  inset: 0;
  z-index: 1;

  &-overlay {
    background: #000;
    position: absolute;
    opacity: .5;
    inset: 0;
  }

  &-spinner {
    border-left: 3px solid $bg-200;
    border-top: 3px solid $bg-200;
    border-right: 3px solid $bg-200;
    border-bottom: 3px solid transparent;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: spin .5s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
  