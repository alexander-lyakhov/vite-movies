<template>
  <header>
    <nav class="nav">
      <router-link class="router-link" to="/">Movies</router-link>
      <router-link class="router-link" to="/sessions">Sessions</router-link>
      <router-link class="router-link" to="/about">About</router-link>
    </nav>
  </header>
  <RouterView />
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<style lang="scss" scoped>
header {
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
}
</style>
