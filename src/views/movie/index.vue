<template>
  <h1 class="page-title">Movie Details</h1>
  <section class="movie">
    <poster
      class="poster"
      :image="movie.image"
      :title="movie.name"
    />
    <div class="details">
      <div class="navigation">
        <router-link class="router-link" to="info">Info</router-link>
        <router-link class="router-link" to="sessions">Sessions</router-link>
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

  const store = useStore()
  const route = useRoute()

  const id = route.params?.id
  const movie = ref({})

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

  .navigation {
    display: grid;
    grid-template-columns: 100px 100px;
    grid-gap: .5rem;
    border: 2px solid transparent;
    margin-bottom: 1.5rem;

    .router-link {
      font-size: 1rem;
      text-align: center;
      display: block;
      padding: .5rem;

      &-exact-active {
        border-bottom: 2px solid $accent-green;
      }
    }
  }

  .movie-info {
    ul li {
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
}

@media screen and (max-width: 640px) {
  .movie {
    .navigation {
      grid-template-columns: 1fr 1fr;
    }

    .movie-info {
      dd li {
        flex-direction: column;

        .key {
          font-weight: bold;
        }
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