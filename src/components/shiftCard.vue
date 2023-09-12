<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6">
        <h2>
          Shifts
          <p class="bar_color"></p>
        </h2>
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn
          >Add Shift
          <v-dialog v-model="dialog" activator="parent" width="auto">
            <v-card width="1000">
              <v-container>
                <h3>
                  Create/Edit
                  <p class="bar_color"></p>
                </h3>
                <v-text-field label="Title" v-model="title" required ></v-text-field>
                <v-textarea label="Description" v-model="description"></v-textarea>
                <VueDatePicker
                  v-model="date"
                  multi-dates
                  multi-dates-limit="10"
                  :enable-time-picker="false"
                  @closed="alertFn()"
                ></VueDatePicker>
                <div></div>
                <v-card class="mt-3" v-for="item in date" :key="item.id">
                  <div class="ml-4">{{ formatDate(item) }}</div>
                  <v-row class="ml-1 mt-3">
                    <v-col cols="12" sm="4"
                      ><vue-timepicker
                        :format="timeFormat"
                        v-model="timeData"
                        required 
                      ></vue-timepicker
                    ></v-col>
                    <v-col cols="12" sm="4"
                      ><vue-timepicker
                        :format="timeFormatSec"
                        v-model="timeDataSec"
                        required 
                      ></vue-timepicker
                    ></v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field label="Price" type="number" v-model="dataprice" height="30" required ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-select
                    label="Select"
                    :items="[
                      'Consultation',
                      'Telephone',
                      'Ambulance'
                    ]"
                    v-model="dropType"
                    required 
                  ></v-select>
                </v-card>
                <v-card-actions>
                  <v-btn color="primary" @click="deleteCard()">Delete</v-btn>
                  <v-btn color="primary" @click="addData()">Save</v-btn>
                </v-card-actions>
              </v-container>
            </v-card>
          </v-dialog>
        </v-btn>
      </v-col>
    </v-row>
    <v-card class="mt-3" v-for="obj in this.objects" :key="obj.id" width="1000" :title="obj.title" :subtitle="obj.description">
      <v-row>
        <v-col cols="12"
        sm="4"></v-col>
        <v-col cols="12"
        sm="4"></v-col>
        <v-col cols="12"
        sm="4" class="mt-n10"><v-btn @click="editCard(obj)">Edit</v-btn></v-col>
      </v-row>
      <v-card-title>
        <span class="text-h8">Dates</span>
      </v-card-title>
      <v-card-text v-for="data in obj.rowdata" :key="data.id">
        <v-row>
          <v-col cols="12" sm="2">{{ data.date }}</v-col>
          <v-col cols="12" sm="2">{{ data.starttime }}</v-col>
          <v-col cols="12" sm="2">{{ data.endtime }}</v-col>
          <v-col cols="12" sm="2">{{ data.droptype }}</v-col>
          <v-col cols="12" sm="2">{{ data.price }}</v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import VueTimepicker from "vue3-timepicker";
import "vue3-timepicker/dist/VueTimepicker.css";
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  components: {
    VueDatePicker,
    VueTimepicker,
  },
  data() {
    return {
      dialog: false,
      counter: 1,
      date: [],
      timeData: "",
      timeDataSec: "",
      timeFormatSec: "hh:mm",
      timeFormat: "hh:mm",
      title: "",
      description: "",
      dataprice: "",
      dropType: "",
      handleDate: "",
      objects: [],
      count: 1,
      actualDate: []
    };
  },
  computed: {
    ...mapGetters(['getAllRecords']),
  },
  mounted() {
    // this.handleDate = (modelData) => {
    //   this.date.value = modelData;
    //   // do something else with the data
    // }
    console.log(this.objects = this.$store.getters.getCounter)
  },
  // computed: {
  //   ...mapGetters(['getArrayOfObjects']),
  // },
  methods: {
    ...mapActions(['setRecords']),
    formatDate(created_at) {
      let date = new Date(created_at);
      let formttedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      return formttedDate;
    },
    alertFn () {
        this.date.forEach(element => {
          element.id = this.count++;
          const date = new Date(element);
          // Format the date as YYYY-MM-DD HH:MM:SS (for example)
          const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
          this.actualDate.push(formattedDate);
          console.log("data", this.actualDate)
          // this.counter++;
        });
    },
    addData() {
      let obj = {};
      let data = []
      console.log("data1", this.actualDate)
      this.actualDate.forEach(element => {
        let obj_data = {
        id: this.count,
        date: element,
        starttime: this.timeData,
        endtime: this.timeDataSec,
        price: this.dataprice,
        droptype: this.dropType
      }
      data.push(obj_data);
      });
      obj = {
        id: this.counter,
        title: this.title,
        description: this.description,
        rowdata: data
      }
      this.counter++
      console.log("data", this.setRecords(obj))
      this.$store.commit('increment', obj)

      this.getCounterData(this.$store.getters.getCounter)
      this.dialog = false;
    },
    getCounterData(data) {
      console.log("data2", data)
      this.objects = data;
    },
    editCard(data) {
      console.log("dummy", data)
      this.objects = []
      this.dialog = true;
    },
    deleteCard(productId) {
      console.log("dummy", productId)
      this.$store.dispatch('deleteProduct', productId);
      this.dialog = false;
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
