<template>
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
        <div
          class="session"
          v-for="(session, iDate) in movie.sessions"
          :key="'${movie.id}_${iDate}'"
        >
          <div class="session-title">
            {{ new Date(session.showdate).toDateString() }}
          </div>
        
          <ul class="session-body">
            <li
              class="time"
              v-for="(time, iTime) in session.daytime.split(';')"
              :key="'${movie.id}_${iDate}_${iTime}'"
              @click="bookTickets(movie.id, session.showdate, time)"
            >
              {{ time }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { onMounted, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import poster from '@/components/poster.vue'

  const store = useStore()
  const router = useRouter()

  onMounted(() => store.dispatch('fetchSessions'))
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
      width: 100%;

      .session {
        background: $bg-600;
        padding: .75rem;

        &:not(:last-child) {
          margin-bottom: 1.5rem;
        }

        &-title {
          font-size: 1.25rem;
          text-shadow: 1px 1px 1px #000000;
          margin: 0 0 .75rem 0;
        }

        &-body {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
          grid-gap: .5rem;

          .time {
            background: $bg-800;
            text-align: center;
            padding: .5rem 0;
            cursor: pointer;
        
            &:hover {
              color: #000;
              background: $bg-100;
            }
          }
        }
      }
    }

  }
}
</style>