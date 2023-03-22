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
  padding: 0.75rem;	

  .movie {
    background: $bg-700;
    display: grid;
    grid-template-columns: 233px 1fr;
    grid-gap: .75rem;
    position: relative;
    padding: .75rem;
  
    .poster {
      position: sticky;
      top: 0.75rem;
      align-self: start;
    
      .title {
        font-size: 1.15rem;
        color: $accent-orange;
        text-align: center;
        line-height: 1.25;
        text-shadow: 1px 1px 1px #000;
        letter-spacing: 1px;
        padding: .5rem 0;
      }
    }
    
    .session-wrapper {
      background: $bg-700;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      grid-gap: .75rem;
    
      h2 {
        display: none;
        background: $bg-600;
        font-size: 1.5rem;
        text-shadow: 1px 1px 1px #000;
        grid-column: 1 / -1;
        padding: .5rem;
      }
      .session {
        font-size: 1.15rem;
        text-align: center;
      
        &-title  {					
          color: #fff;
          background: $bg-800;
          padding: 1rem .75rem;
        }
        
        &-body {
          .time {	
            padding: .75rem .75rem;
            cursor: pointer;
        
            &:not(:last-child) {
              border-bottom: 1px solid $bg-500;
            }
            
            &:hover {
              background: $bg-600;
            }
          }
        }
      }
    }
  }
}
</style>