<template>
  <div class="display">
    <v-container>
      <div v-if="stats">
        <h1>Stats:</h1>
        <!-- Each card takes in a full row. -->
        <v-row>
          <v-col cols="4">
            <TimeSeriesCard
              title="Logs over Time"
              subtitle="An entry of log isn't always an attack."
              label="Logs"
              :dataX="graphX"
              :dataY="graphY"
            ></TimeSeriesCard>
          </v-col>
          <v-col cols="4">
            <TableCard
              title="Username Ranking"
              subtitle="The top username rank."
              :headers="userRankHeaders"
              :data="userRank"
            ></TableCard>
          </v-col>
          <v-col cols="4">
            <TableCard
              title="IP Ranking"
              subtitle="The top IP rank."
              :headers="ipHeaders"
              :data="ipRank"
            ></TableCard>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import {
  analyzeUserRank,
  analyzeIPRank,
  analyzeTimeSeries
} from "@/system/analysis";
import TimeSeriesCard from "@/components/TimeSeriesCard";
import TableCard from "@/components/TableCard";

export default {
  name: "Display",
  props: {
    stats: Array
  },
  components: {
    TimeSeriesCard,
    TableCard
  },
  data() {
    return {
      graphX: [],
      graphY: [],
      userRankHeaders: [
        {
          text: "Username",
          align: "start",
          sortable: false,
          value: "user"
        },
        {
          text: "Count",
          align: "start",
          sortable: true,
          value: "count"
        }
      ],
      userRank: [],
      ipHeaders: [
        {
          text: "IP Address",
          align: "start",
          sortable: false,
          value: "ip"
        },
        {
          text: "Count",
          align: "start",
          sortable: true,
          value: "count"
        }
      ],
      ipRank: []
    };
  },

  computed: {
    // a computed getter
    printStats: function() {
      // `this` points to the vm instance
      return JSON.stringify(this.stats, null, 2);
    }
  },

  created: function() {
    // Redirects back to loading page if data is not present.
    if (!this.stats) {
      this.$router.replace({ name: "load" });
    } else {
      this.analyze(this.stats);
    }
  },

  methods: {
    analyze: function(stats) {
      // Merge stats
      let total = {
        numIgnore: 0,
        entries: new Array()
      };

      stats.forEach(element => {
        total.numIgnore += element.numIgnore;
        total.entries = total.entries.concat(element.entries);
      });

      let myMap = analyzeUserRank(total.entries);

      for (let [key, value] of myMap) {
        this.userRank.push({
          user: key,
          count: value
        })
      }

      myMap = analyzeIPRank(total.entries);

      for (let [key, value] of myMap) {
        this.ipRank.push({
          ip: key,
          count: value
        })
      }

      let myTimeSeries = analyzeTimeSeries(total.entries);
      this.graphX = Object.keys(myTimeSeries);
      this.graphY = Object.values(myTimeSeries);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>