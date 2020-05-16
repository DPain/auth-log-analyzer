<template>
  <v-card class="pa-4">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">{{title}}</v-list-item-title>
        <v-list-item-subtitle>{{subtitle}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <div class="pa-2">
      <line-chart :chart-data="datacollection"></line-chart>
      <button class="pa-2" @click="fillData()">Randomize</button>
    </div>

    <v-card-text>Visit ten places on our planet that are undergoing the biggest changes today.</v-card-text>
  </v-card>
</template>

<script>
import LineChart from "@/components/LineChart";

export default {
  name: "TimeSeriesChart",
  components: {
    LineChart
  },
  props: {
    title: String,
    subtitle: String
  },
  data() {
    return {
      datacollection: null
    };
  },
  created() {
    this.fillData();
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          },
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>

<style>
.chart-border {
  border: 10px;
  border-color: red;
  padding: 10px;
}
</style>