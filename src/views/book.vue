<template>
  <main class="booking">
    <h1 v-html="movie?.name"></h1>
    <h2>{{ movie?.name }} - {{ new Date(showdate).toDateString() }} - {{ daytime }}</h2>
    <div
      class="row"
      v-for="(item, iRow) in places"
      :key="iRow"
    >
      <div class="row-title">Row {{ getRowNumber(item) }}</div>

      <ul class="row-body">
        <li
          class="seat"
          v-for="(el, iSeat) in getSeats(item)"
          :class="[el.is_free ? 'is-free':'is-booked']"
          :key="`${iRow}_${iSeat}`"
        >
          {{ el.seat }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
  import { onMounted, computed, ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import api from '@/api'

  const store = useStore()
  const route = useRoute()

  const id = route.query?.id
  const showdate = ref(route.query?.showdate)
  const daytime = ref(route.query?.daytime)
  const places = ref([])
  const movie = ref({})
  // store.dispatch('getMovieById', id).then(res => movie.value = res)
  
  onMounted(async() => {
    const data = await api.getPlaces(route.query)
    // const { data } = await api.getPlaces({id: 61, showdate: '2021-06-27', daytime: '10:50'})
    places.value = data

    movie.value = await store.dispatch('getMovieById', id)

    console.log('Places: ', places.value)
  })

  function getRowNumber(item) {
    return item[0]?.row || ''
  }

  function getSeats(item) {
    return item[1] || []
  }
</script>

<style lang="scss" scope>
.booking {
  background: $bg-800;
  padding: .75rem;

  h1 {
    font-size: 2rem;
    font-weight: normal;
    color: $accent-orange;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 1rem 0;
  }

  .row {
    background: $bg-600;
    padding: .75rem;

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }

    &-title {
      font-size: 1.5rem;
      text-shadow: 1px 1px 1px #000000;
      margin: 0 0 .75rem 0;
    }

    &-body {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(32px, 1fr));
      grid-gap: .25rem;

      .seat {
        background: $bg-800;
        text-align: center;
        padding: .5rem 0;
        cursor: pointer;

        &.is-free {
          color: #000;
          background: $green-300;
        }
    
        &.is-booked {
          color: #000;
          background: $red-300;
        }
      }
    }
  }
}
</style>