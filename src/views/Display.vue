<template>
  <div class="display">
    <v-container>
      <div v-if="stats">
        <h1>Stats:</h1>
        <p>{{ stats.length }}</p>
      </div>
    </v-container>
  </div>
</template>

<script>
import { analyzeUserRank, analyzeIPRank } from "@/system/analysis";

export default {
  name: "Display",
  props: {
    stats: Array
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

      // eslint-disable-next-line
      console.log("total");
      // eslint-disable-next-line
      console.log(total);

      let userRank = analyzeUserRank(total.entries);
      // eslint-disable-next-line
      console.log(userRank);

      let ipRank = analyzeIPRank(total.entries);
      // eslint-disable-next-line
      console.log(ipRank);
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