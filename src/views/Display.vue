<template>
  <div class="display">
    <v-container>
      <div v-if="stats">
        <h1>Stats:</h1>
        <p>[{{ printStats }}]</p>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Display",
  props: {
    stats: Object
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
      this.$router.push({name: "load"});
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