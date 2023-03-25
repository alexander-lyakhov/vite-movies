<template>
  <section class="search">
    <textfield v-model="search.name" />
    <dropdown :items="genres" v-model="search.genre" />

    <a class="btn btn-icon" href="#" @click.stop="reset">
      <IconReset />
    </a>
    <a class="btn btn-icon" href="#" @click="confirmSearch">
      <IconConvirm />
    </a>
  </section>
</template>

<script setup>
  import { reactive } from 'vue'
  import { useStore } from 'vuex'
  import textfield from '@/components/textfield.vue'
  import dropdown from '@/components/dropdown.vue'
  import IconConvirm from '@/assets/icons/checkmark-outline.svg'
  import IconReset from '@/assets/icons/close-outline.svg'
  import { genres } from '@/utils/config.js'

  const store = useStore()

  const search = reactive({
    name: '',
    genre: null
  })

  function reset() {
    search.name = ''
    search.genre = null
    store.dispatch('fetchMovies')
  }

  function confirmSearch() {
    store.dispatch('searchMovies', {
      name: search.name,
      genre: search.genre?.key
    })
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
  