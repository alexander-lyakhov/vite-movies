<template>
  <teleport to="body">
    <spinner v-model="flags.isLoading" />
  </teleport>
  <notifications
    classes="notification"
    width="512px"
    position="top center"
  />
  <header>
    <nav class="nav">
      <router-link class="router-link" to="/">Movies</router-link>
      <router-link class="router-link" to="/sessions">Sessions</router-link>
    </nav>
    <span class="btn btn-back" @click="router.go(-1)">
      &larr; Back
    </span>
  </header>
  
  <RouterView />
</template>

<script setup>
  import { ref } from 'vue'
  import { RouterLink, RouterView, useRouter } from 'vue-router'
  import { flags } from '@/utils'
  import spinner from '@/components/spinner'

  const router = useRouter()
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: .75rem;

  .nav {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    
    .router-link {
      font-size: 1.25rem;
      border-bottom: 2px solid transparent;
      padding: .5rem 0;
      
      &-exact-active {
        border-bottom: 2px solid $accent-green;
      }
    }
  }

  .btn-back {
    font-size: 1rem;
    margin-left: auto;
    padding: .5rem;
  }
}
</style>
