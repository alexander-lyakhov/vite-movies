<template>
  <h1 class="page-title">All Sessions</h1>
  <section class="sessions">
    <div
      class="movie"
      v-for="movie in sessions"
      :key="movie.id"
    >
      <poster
        :image="movie.image"
        :title="movie.name"
        @click="showMovieInfo(movie.id)"
      />
        
      <movie-sessions
        :movie-id="+movie.id"
        :sessions="movie.sessions"
        @pickTime="bookTickets"
      />
    </div>
  </section>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import poster from '@/components/movie-poster.vue'
  import movieSessions from '@/components/movie-sessions.vue'

  const store = useStore()
  const router = useRouter()

  store.dispatch('fetchSessions')
  const sessions = computed(() => store.getters.sessions)

  function showMovieInfo(id) {
    router.push({name: 'info', params: {id}})
  }

  function bookTickets({id, showdate, daytime}) {
    router.push({name: 'book', query: {id, showdate, daytime}})
  }
</script>

<style lang="scss" scope>
.sessions {
  @extend .grid-container;

  .movie {
    @extend .grid-container;
    background: $bg-800;
    grid-template-columns: 233px 1fr;
    padding: .75rem;

    .poster {
      position: sticky;
      top: .75rem;
      cursor: pointer;
    }
    
    .session-wrapper {
      .time {
        color: #000;
        background: $bg-100;
        text-align: center;
        padding: .5rem 0;
        cursor: pointer;
        
        &:hover {
          color: #000;
          background: #fff;
        }
      }
    }

  }
}
@media screen and (max-width: 512px) {
  .sessions .movie {
    grid-template-columns: 1fr;

    .poster {
      position: relative;
    }
  }
}
</style>