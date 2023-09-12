// store.js

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    arrayOfObjects: [],
     // Your array of objects will be stored here
  },
//   mutations: {
//     // Mutations to update the state
//     SET_ARRAY(state, newArray) {
//       state.arrayOfObjects = newArray;
//       console.log(state.arrayOfObjects)
//     },
//   },
//   actions: {
//     // Actions to commit mutations
//     setArray({ commit }, newArray) {
//       commit('SET_ARRAY', newArray);
//     },
//   },
//   getters: {
//     // Getters to access the state
//     getArrayOfObjects: (state) => state.arrayOfObjects,
//   },
});