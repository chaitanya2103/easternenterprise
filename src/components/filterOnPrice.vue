<template>
    <div>
      <h2>Filter<p class="bar_color"></p></h2>
      <div>Filter On Price</div>
      <v-range-slider
        v-model="value"
        step="1"
        thumb-label="always"
      ></v-range-slider>
    </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'filterOnPrice',
  data() {
    return {
      value: [0, 500],
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bar_color {
  border: 1px solid pink;
  width: 2.5rem;
}
</style>