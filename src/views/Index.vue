<template>
  <div>
    Index
  </div>
</template>

<script>
export default {
  props: {
    source: String
  },

  data: () => ({
    links: [
      {
        id: "index",
        icon: "mdi-view-dashboard",
        text: "Home",
        link: "/"
      },
      {
        id: "help",
        icon: "mdi-settings",
        text: "Temp",
        link: "/"
      },
      {
        id: "github",
        icon: "mdi-view-dashboard",
        text: "Github",
        link: "https://github.com/DPain"
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