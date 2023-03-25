<template>
  <search-panel />

  <section class="movies">
    <div
      class="movie"
      v-for="item in movies"
      :key="item.id"
    >
      <poster
        :image="item.image"
        :title="item.name"
        @click="showMovieInfo(item.id)"
      />
    </div>
  </section>
</template>

<script setup>
  import { onMounted, computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import poster from '@/components/poster.vue'
  import searchPanel from '@/components/search-panel.vue'

  const store  = useStore()
  const router = useRouter()
  const movies = computed(() => store.state.movies)
  
  onMounted(() => store.dispatch('fetchMovies'))

  function showMovieInfo(id) {
    router.push({name: 'info', params: {id}})
  }
</script>

<style lang="scss" scope>
.movies	{
  @extend .grid-container;
  grid-template-columns: repeat(auto-fill, minmax(233px, 1fr));
  padding: 0y;
  
  .movie {
    background: $bg-800;
    padding: .5rem;

    .poster {
      width: 100%;
      height: 100%;
      cursor: pointer;

      .title {
        font-size: 1.15rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .5rem 0 0;
      }
    }
  }
}
</style>