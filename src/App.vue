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
    max-width: $page-width;
    display: flex;
    gap: 1rem;
    margin: auto;
    padding: 1rem 0.75rem;
    
    .router-link {
      font-size: 1.5rem;
      padding: .5rem 0;
      
      &-exact-active {
        border-bottom: 2px solid $accent-green;
      }
    }
  }
}
</style>
