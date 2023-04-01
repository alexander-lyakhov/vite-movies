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

      <div class="session-wrapper">
        <row-container
          v-for="(session, iDate) in movie.sessions"
          :key="'${movie.id}_${iDate}'"
          :title="new Date(session.showdate).toDateString()"
          :items="session.daytime.split(';')"
          v-slot="{item: time}"
        >
          <div
            class="time"
            @click="bookTickets(movie.id, session.showdate, time)"
          >
            {{ time }}
          </div>
        </row-container>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import poster from '@/components/movie-poster.vue'
  import rowContainer from '@/components/row-container.vue'

  const store = useStore()
  const router = useRouter()

  store.dispatch('fetchSessions')
  const sessions = computed(() => store.getters.sessions)

  function showMovieInfo(id) {
    router.push({name: 'info', params: {id}})
  }

  function bookTickets(id, showdate, daytime) {
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