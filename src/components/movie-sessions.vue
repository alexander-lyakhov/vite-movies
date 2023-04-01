<template>
  <div class="movie-sessions">
    <row-container
      v-for="(session, index) in sessions"
      :key="index"
      :title="new Date(session.showdate).toDateString()"
      :items="session.daytime.split(';')"
      v-slot="{item: time}"
    >
      <div
        class="time"
        @click="$emit('pickTime', {
          showdate: session.showdate,
          daytime: time
        })"
      >
        {{ time }}
      </div>
    </row-container>
  </div>
</template>

<script setup>
  import rowContainer from '@/components/row-container.vue'

  defineProps({
    sessions: {
      type: Array,
      default: () => ([]),
      required: true
    }
  })
</script>

<style lang="scss" scoped>
.movie-sessions {
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
</style>
  