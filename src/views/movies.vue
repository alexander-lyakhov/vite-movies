<template>
  <main class="grid">
    <div
      class="movie"
      v-for="item in movies"
      :key="item.id"
    >
      <img
        width="233"
        height="240"
        :src="item.image"
      />

      <div class="title" v-html="item.name" />
    </div>
  </main>
</template>

<script setup>
  import { onMounted, computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  
  onMounted(() => store.dispatch('fetchMovies'))
  const movies = computed(() => store.state.movies)
</script>

<style lang="scss" scope>
.grid	{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(233px, 1fr));
  grid-gap: .75rem;
  padding: .75rem 0;
  
  .movie {
    background: $bg-500;
    display: flex;
    flex-direction: column;
    padding: .5rem;
    cursor: pointer;
  
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .title {
      font-size: 1.15rem;
      background: $bg-800;
      min-height: 64px;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      padding: 0 .5rem;

      &:hover {
        color: #fff;
      }
    }
  }
}
</style>