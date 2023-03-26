<template>
  <h1 class="page-title">Book Tickets</h1>
  <section class="booking">
    <div class="movie-title" v-html="movie?.name"></div>
    <div class="movie-date">{{ new Date(showdate).toDateString() }}</div>
    <div class="movie-time">{{ daytime }}</div>

    <row-container
      v-for="(item, index) in places"
      :key="index"
      :title="`Row ${getRowNumber(item)}`"
      :items="getSeats(item)"
      :item-width="32"
      v-slot="{item: el}"
    >
      <div
        class="seat"
        :class="[el.is_free ? 'is-free':'is-booked']"
        @click="bookTicket($event, getRowNumber(item), el.seat)"
      >
        {{ el.seat }}
      </div>
    </row-container>
  </section>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import rowContainer from '@/components/row-container.vue'
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
      await api.bookTicket({
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

  .seat {
    color: #000;
    background: $bg-800;
    text-align: center;
    padding: .5rem 0;
    cursor: pointer;

    &:hover {
      outline: 2px solid #fff;
    }

    &.is-free {
      background: $green-300;
    }

    &.is-booked {
      background: $red-300;
    }
  }
}
</style>