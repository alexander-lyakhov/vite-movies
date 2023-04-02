<template>
  <movie-sessions
    :movie-id="+id"
    :sessions="sessions"
    @pickTime=bookTickets
  />
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import movieSessions from '@/components/movie-sessions.vue'

  const store  = useStore()
  const route  = useRoute()
  const router = useRouter()

  const id = route.params?.id
  store.dispatch('fetchSessions')
  const sessions = computed(() => store.state.sessions[id])

  function bookTickets({id, showdate, daytime}) {
    router.push({name: 'book', query: {id, showdate, daytime}})
  }
</script>
  