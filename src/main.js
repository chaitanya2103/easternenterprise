import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
})

const store = createStore({
    state() {
      return {
        arrayOfObjects: [],
        records: []
      }
    },
    mutations: {
        increment(state, payload) {
            // console.log("mutation", state)
            state.arrayOfObjects.push(payload)
        },
        SET_RECORDS(state, newRecords) {
            state.records = newRecords;
        },
        deleteProduct(state, productId) {
            const index = state.arrayOfObjects.findIndex(product => product.id === productId);
            if (index !== -1) {
              state.items.splice(index, 1);
            }
          }
    },
    actions: {
        // Actions to commit mutations
    setRecords({ commit }, newRecords) {
        commit('SET_RECORDS', newRecords);
      },
      deleteProduct({ commit }, productId) {
        // You can perform any asynchronous logic here if needed.
        // For simplicity, we're directly committing the mutation.
        commit('deleteProduct', productId);
      }
    },
    getters: {
        getCounter(state) {
            // console.log("getters",state.arrayOfObjects)
          return state.arrayOfObjects
        },
        getAllRecords: (state) => state.records,
      }
  })

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

app.use(store)
app.component('VueDatePicker', VueDatePicker);
app.use(vuetify).mount('#app')
