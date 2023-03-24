<template>
  <section class="search">
    <div class="text-field">
      <input type="text" />
    </div>

    <div class="dropdown">
      Comedy
    </div>
  </section>
  
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

  const store  = useStore()
  const router = useRouter()
  const movies = computed(() => store.state.movies)
  
  onMounted(() => store.dispatch('fetchMovies'))

  function showMovieInfo(id) {
    router.push({name: 'info', params: {id}})
  }
</script>

<style lang="scss" scope>
.search {
  @extend .grid-container;
  background: $bg-800;
  grid-template-columns: 1fr 240px;
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
      // height: 2.5rem;
      height: 100%;
    }
  }

  .dropdown {
    font-size: 1.15rem;
    background: $bg-700;
    border: 1px solid $bg-400;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    position: relative;
    cursor: pointer;

    &:after {
      content: '';
      // background: #888;
      border-right: 2px solid $bg-100;
      border-bottom: 2px solid $bg-100;
      display: block;
      position: absolute;
      width: .75rem;
      height: .75rem;
      transform: rotate(45deg) translateY(-4px);
      right: 1.25rem;
    }
  }
}

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

@media screen and (max-width: 576px) {
  .search {
    grid-template-columns: 1fr;
  }
}
</style>