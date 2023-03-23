<template>
  <main class="booking">
    <div class="movie-title" v-html="movie?.name"></div>
    <div class="movie-date">{{ new Date(showdate).toDateString() }}</div>
    <div class="movie-time">{{ daytime }}</div>
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
          @click="bookTicket($event, getRowNumber(item), el.seat)"
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

  const movie_id = route.query?.id
  const showdate = ref(route.query?.showdate)
  const daytime = ref(route.query?.daytime)
  const places = ref([])
  const movie = ref({})
  
  onMounted(async() => {
    // places.value = await api.getPlaces({id: 61, showdate: '2021-06-27', daytime: '10:50'})
    places.value = await api.getPlaces(route.query)
    movie.value = await store.dispatch('getMovieById', movie_id)
  })

  function getRowNumber(item) {
    return item[0]?.row || ''
  }

  function getSeats(item) {
    return item[1] || []
  }

  async function bookTicket(e, row, seat) {
    try {
      const res = await api.bookTicket({
        movie_id,
        row,
        seat,
        showdate: showdate.value,
        daytime: daytime.value
      })

      e.target.classList.remove('is-free')
      e.target.classList.add('is-booked')
    }
    catch(e) {
      console.log(e.statusText)
    }
  }
</script>

<style lang="scss" scope>
.booking {
  background: $bg-800;
  padding: .75rem;

  .movie {
    &-title {
      font-size: 1.5rem;
      color: $accent-orange;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 2px;
      padding: 1rem 0;
    }

    &-date {
      font-size: 1.15rem;
      color: $text-200;
      text-align: center;
    }

    &-time {
      font-size: 1.5rem;
      text-align: center;
      padding: 1rem;
    }
  }

  .row {
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
      grid-template-columns: repeat(auto-fit, minmax(32px, 1fr));
      grid-gap: .25rem;

      .seat {
        background: $bg-800;
        text-align: center;
        padding: .5rem 0;
        cursor: pointer;

        &:hover {
          outline: 2px solid #fff;
        }

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