<template>
  <div class="dropdown noselect">
    <div
      class="dropdown-title"
      :class="titleClassObject"
      @click.stop="toggle"
    >
      <span v-if="!selectedItem" class="placeholder">
        choose genre
      </span>
      <span v-else class="value">
        {{ selectedItem.value }}
      </span>
    </div>
    <ul
      class="dropdown-body"
      v-show="isOpen"
    >
      <li
        v-for="item in items"
        :key="item.key"
        @click.stop="select(item)"
      >
        {{ item.value }}
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'

  const props = defineProps({
    items: {
      type: Array,
      default: () => ([])
    },

    modelValue: {
      type: Object,
      default: null
    }
  })

  const emit = defineEmits([
    'update:modelValue',
    'expand',
    'collapse',
    'toggle'
  ])

  const isOpen = ref(false)
  const selectedItem = computed(() => props.modelValue)
  const titleClassObject = computed(() => ({
    'is-open': isOpen.value,
    'is-selected': selectedItem.value
  }))

  function toggle() {
    isOpen.value = !isOpen.value
    emit('toggle', isOpen.value)
  }

  function select(item) {
    isOpen.value = false;
    emit('update:modelValue', item)
    emit('toggle', isOpen.value)
  }
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  z-index: 1;

  &-title {
    font-size: 1.15rem;
    background: $bg-600;
    border: 1px solid $bg-400;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    position: relative;
    cursor: pointer;

    &:after {
      content: '';
      border-right: 2px solid $bg-100;
      border-bottom: 2px solid $bg-100;
      display: block;
      position: absolute;
      width: .5rem;
      height: .5rem;
      transform: rotate(45deg) translateY(-2px);
      right: 1.25rem;
    }

    &.is-open {
      border-bottom: 1px solid $accent-green;

      &:after {
        transform: rotate(-135deg) translateY(-4px);
      }
    }

    &.is-selected:not(.is-open) {
      border: 1px solid $accent-orange;
    }

    .placeholder {
      font-size: 1rem;
    }
  }


  &-body {
    background: $bg-600;
    width: 100%;
    position: absolute;
    left: 0;
    top: 100%;
    padding: 4px;

    li {
      background: $bg-800;
      padding: .75rem .5rem;
      cursor: pointer;
      
      &:not(:last-child) {
        margin: 0 0 1px;
      }

      &:hover {
        background: $bg-700;
      }			
    }
  }
}
</style>
  