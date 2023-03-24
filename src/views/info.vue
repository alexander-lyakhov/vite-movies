<template>
  <section class="info">
    <poster
      class="poster"
      :image="movie.image"
      :title="movie.name"
    />
    <div class="movie-info">
      <dd>
        <dt>Genre:</dt>
        <dl>{{ genre }}</dl>
      </dd>
      <dd>
        <dt>Description:</dt>
        <dl v-html="movie.description"></dl>
      </dd>
      <dd>
        <dt>Additionsl:</dt>
        <dl v-html="movie.additional" />
      </dd>
    </div>
  </section>
</template>

<script setup>
  import { onMounted, ref, computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import poster from '@/components/poster.vue'
  import { genres } from '@/utils/config.js'

  const store = useStore()
  const route = useRoute()

  const id = route.params?.id
  const movie = ref({})
  const genre = ref(null)

  onMounted(async() => {
    window.scrollTo(0, 0)
    movie.value = await store.dispatch('getMovieById', id)
    genre.value = genres.find(el => el.key == movie.value.genre)?.value
  })
</script>

<style lang="scss" scope>
.info {
  @extend .grid-container;
  background: $bg-800;
  grid-template-columns: 233px 1fr;
  padding: .75rem;

  .poster {
    position: sticky;
    top: .75rem;
  }

  .movie-info {
    width: 100%;

    dd {
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

      dl {
        background: $bg-700;
        border-radius: 6px;
        padding: .75rem;
        
        li {
          display: flex;
          line-height: 1.75;
          padding: .5rem 0;
          
          &:not(:last-child) {
            border-bottom: 1px solid $bg-500;
          }
          
          .key {
            min-width: 200px;
          }

          .value {
            display: 100%;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .movie-info {
    .info dd {
      grid-template-columns: 1fr;

      dt {
        text-align: left;
        padding: 0;
      }
    }
  }
}

@media screen and (max-width: 640px) {
  .movie-info {
    .info dd li {
      flex-direction: column;

      .key {
        font-weight: bold;
      }
    }
  }
}

@media screen and (max-width: 512px) {
  .movie-info {
    grid-template-columns: 1fr;

    .poster {
      position: relative;
    }
  }
}


</style>