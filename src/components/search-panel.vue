<template>
  <section class="search">
    <div class="text-field">
      <input type="text" />
    </div>

    <dropdown :items="genres" v-model="genre" />

    <a class="btn btn-icon" href="#" @click.stop="reset">
      <IconReset />
    </a>
    <a class="btn btn-icon" href="#">
      <IconConvirm />
    </a>
  </section>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import dropdown from '@/components/dropdown.vue'
  import IconConvirm from '@/assets/icons/checkmark-outline.svg'
  import IconReset from '@/assets/icons/close-outline.svg'
  import { genres } from '@/utils/config.js'

  const genre = ref(null)

  function reset() {
    genre.value = null
  }
</script>

<style lang="scss" scoped>
.search {
  @extend .grid-container;
  background: $bg-800;
  grid-template-columns: 1fr 240px 32px 32px;
  align-items: center;
  margin-bottom: .75rem;
  padding: .75rem;

  .text-field {
    background: #000;
    border: 1px solid $bg-400;
    display: flex;
    height: 3rem;
    padding: 0 .5rem;

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
}

@media screen and (max-width: 576px) {
  .search {
    grid-template-columns: 1fr 32px 32px;

    .text-field {
      grid-column: 1 / -1;
    }
  }	
}

@media screen and (max-width: 320px) {
  .search {
    grid-template-columns: 1fr 1fr;
    justify-items: center;

    .text-field, .dropdown {
      grid-column: 1 / -1;
      width: 100%;
    }
  }	
}
</style>
  