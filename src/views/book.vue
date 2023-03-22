<template>
  <main class="booking">
    <div
      class="row"
      v-for="item in places"
      :key="item[0].row"
    >
      <div class="row-title">Row {{ item[0].row }}</div>

      <ul class="row-body">
        <li
          class="seat"
          v-for="(el, index) in item[1]"
          :class="[el.is_free ? 'is-free':'is-booked']"
          :key="index"
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

  const store = useStore()
  const places = ref([])
  
  onMounted(async() => {
    places.value = await store.dispatch('fetchPlaces')
    console.log('Places: ', places.value)
  })

  /*
  const getClasses = (el) => ({
    el.is_free ? 'is-free':'is-booked'
  })
  */
</script>

<style lang="scss" scope>
.booking {
  background: $bg-800;
  max-width: $page-width;
  margin: auto;
  padding: .75rem;

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

        /*
        &:hover {
          color: #000;
          background: $bg-100;
        }
        */
      }
    }
  }
}
</style>