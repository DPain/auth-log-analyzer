<template>
  <v-card class="pa-4">
    <v-card-title class="headline">{{title}}</v-card-title>
    <v-card-subtitle>{{subtitle}}</v-card-subtitle>

    <div class="pa-2">
      <LineChart :chart-data="fillData()"></LineChart>
    </div>
  </v-card>
</template>

<script>
import LineChart from "@/components/LineChart";

export default {
  name: "TimeSeriesCard",
  components: {
    LineChart
  },
  props: {
    title: String,
    subtitle: String,
    label: String,
    dataX: Array,
    dataY: Array
  },
  data() {
    return {
      datacollection: null
    };
  },
  created() {
    this.fillData();
  },
  methods: {
    fillData() {
      return {
        labels: this.dataX,
        datasets: [
          {
            label: this.label,
            backgroundColor: "#f87979",
            data: this.dataY
          }
        ]
      };
    }
  }
};
</script>

<style>
</style>