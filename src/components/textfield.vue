<template>
  <div class="text-field" :class="classObject">
    <input
      type="text"
      :value="modelValue" 
      @input="onInput"
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits([
    'update:modelValue'
  ])

  const classObject = computed(() => ({
    'not-empty': !!props.modelValue
  }))

  function onInput(e) {
    emit('update:modelValue', e.target.value)
  }
</script>

<style lang="scss" scoped>
.text-field {
  background: #000;
  border: 1px solid $bg-400;
  display: flex;
  height: 3rem;
  padding: 0 .5rem;
  z-index: 1;

  &.not-empty {
    border: 1px solid $accent-orange;
  }

  input[type="text"] {
    font-size: 1.5rem;
    color: $text-200;
    background: transparent;
    border: 0;
    outline: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
