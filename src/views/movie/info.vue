<template>
  <div class="movie-info">
    <dl>
      <dt>Genre:</dt>
      <dd>{{ genre }}</dd>
    </dl>
    <dl>
      <dt>Description:</dt>
      <dd v-html="movie.description" />
    </dl>
    <dl>
      <dt>Additionsl:</dt>
      <dd v-html="movie.additional" />
    </dl>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { genres } from '@/utils/config.js'

  const store = useStore()
  const route = useRoute()
  const router = useRouter()

  const id = route.params?.id
  const movie = ref({})
  const genre = ref(genres[id])

  onMounted(async() => {
    movie.value = await store.dispatch('getMovieById', id)
    genre.value = genres.find(el => el.key == movie.value.genre)?.value
  })
</script>

<style lang="scss" scoped>

.movie-info {
  dl {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: .5rem;
    line-height: 1.5;

    &:not(:last-child) {
      margin-bottom: .75rem;
    }

    dt {
      text-align: right;
      padding: .75rem 0;
    }

    dd {
      background: $bg-700;
      border-radius: 6px;
      padding: .75rem;
    }
  }
}

@media screen and (max-width: 768px) {
  .movie-info {
    dl {
      grid-template-columns: 1fr;

      dt {
        text-align: left;
        padding: 0;
      }
    }
  }
}
</style>
  