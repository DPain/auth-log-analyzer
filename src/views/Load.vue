<template>
  <div id="load">
    <v-container>
      <!-- Each card takes in a full row. -->
      <v-row>
        <v-col cols="12">
          <v-card class="pa-4 flexcard" color="rgba(61, 81, 212, 0.8)" raised height="80vh">
            <v-card-title class="headline">Choose Auth.log</v-card-title>
            <v-divider></v-divider>
            <v-row align="center" justify="center">
              <v-col cols="12" align="center">
                <v-avatar color="rgba(0,0,0,0.2)" size="15em">
                  <v-icon size="10em">mdi-file-plus</v-icon>
                </v-avatar>
                <v-card-text class="pb-0">Please load the file you want to analyze.</v-card-text>
                <v-card-subtitle class="pt-0">Don't worry! Your data is not sent anywhere.</v-card-subtitle>
                <v-card-actions class="justify-center">
                  <v-btn large outlined>Load</v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Load",
  props: {
    msg: String
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

.flexcard {
  display: flex;
  flex-direction: column;
}
</style>