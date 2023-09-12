<template>
  <v-container>
    <filterOnPrice />
    <shiftCard />
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import filterOnPrice from './components/filterOnPrice.vue';
import shiftCard from './components/shiftCard.vue';

export default defineComponent ({
  name: 'App',
  components: {
    filterOnPrice,
    shiftCard
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
