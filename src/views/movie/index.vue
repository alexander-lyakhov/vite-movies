<template>
  <section class="movie">
    <poster
      class="poster"
      :image="movie.image"
      :title="movie.name"
    />
    <div class="details">
      <div class="navigation">
        <router-link to="info">Info</router-link>
        <router-link to="sessions">Sessions</router-link>
      </div>
      <router-view />
    </div>
  </section>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute, useRouter, RouterView, RouterLink } from 'vue-router'
  import poster from '@/components/poster.vue'
  // import { genres } from '@/utils/config.js'

  const store = useStore()
  const route = useRoute()
  const router = useRouter()

  const id = route.params?.id
  const movie = ref({})
  // const genre = ref(null)

  onMounted(async() => {
    movie.value = await store.dispatch('getMovieById', id)
  })
  
</script>

<style lang="scss" scope>
.movie {
  @extend .grid-container;
  background: $bg-800;
  grid-template-columns: 233px 1fr;
  padding: .75rem;

  .poster {
    position: sticky;
    top: .75rem;
  }

  .movie-info ul li {
    display: flex;
    line-height: 1.75;
    padding: .5rem 0;
    
    &:not(:last-child) {
      border-bottom: 1px solid $bg-500;
    }
    
    .key {
      min-width: 200px;
    }

    .value {
      display: 100%;
    }
  }
}

@media screen and (max-width: 640px) {
  .movie-info {
    dd li {
      flex-direction: column;

      .key {
        font-weight: bold;
      }
    }
  }
}

@media screen and (max-width: 512px) {
  .movie {
    grid-template-columns: 1fr;

    .poster {
      position: relative;
    }
  }
}


</style>