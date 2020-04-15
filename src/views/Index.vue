<template>
  <div id="grid">
    <v-container>
      <!-- Each card takes in a full row. -->
      <v-row>
        <v-col v-for="(item, i) in entries" :key="i" cols="12">
          <v-card class="pa-4" :color="item.color" raised>
            <v-card-title class="headline" v-text="item.title"></v-card-title>
            <v-card-text v-html="item.body"></v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    source: String
  },

  data: () => ({
    entries: [
      {
        title: "Welcome!",
        body:
          "Click load to start analyzing your <b>auth.log</b> file!<br>" +
          "Don't worry, your data all processed within your local machine and is not sent to us!",
        color: "#385F73"
      },
      {
        title: "What is this?",
        body:
          "This web app takes in your <b>auth.log</b> file and returns useful information that can make you more informed about attacks towards your system.<br>" +
          "Simply select your <b>auth.log</b> file and the application will handle the rest for you.",
        color: "#3242AD"
      },
      {
        title: "What can I learn?",
        body:
          "The things you can learn from your <b>auth.log</b> file are the following:<br>" +
          "<ul><li>Attacks per city/country.</li>" +
          "<li>Top Usernames used.</li>" +
          "<li>Attack frequency over time.</li></ul>",
        color: "#1F7087"
      }
    ],
    drawer: false,
    model: 1
  }),

  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>