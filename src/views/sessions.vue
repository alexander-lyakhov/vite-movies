<template>
  <main class="sessions">
    <div
      class="movie"
      v-for="movie in sessions"
      :key="movie.id"
    >
      <div class="poster">
        <img :src="movie.image" width="233" />
        <div class="title" v-html="movie.name"></div>
      </div>

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
              @click="$router.push('/book')"
            >
              {{ time }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { onMounted, computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  onMounted(() => store.dispatch('fetchSessions'))
  const sessions = computed(() => store.getters.sessions)
</script>

<style lang="scss" scope>
.sessions {
  max-width: $page-width;
  display: grid;
  grid-gap: .75rem;
  margin: auto;
  padding: 0.75rem -0.75rem;
  
  .movie {
    background: $bg-800;
    display: flex;
    gap: 1rem;
    position: relative;
    padding: 1rem;

    .poster {
      position: sticky;
      top: 0.75rem;
      align-self: start;
      width: 233px;
    
      .title {
        font-size: 1.25rem;
        color: $accent-orange;
        text-align: center;
        line-height: 1.25;
        text-shadow: 1px 1px 1px #000;
        letter-spacing: 1px;
        padding: .5rem 0;
      }
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