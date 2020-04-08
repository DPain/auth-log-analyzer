<template>
  <div id="app">
    <v-app id="analyzer">
      <v-navigation-drawer v-model="drawer" app clipped>
        <v-list dense>
          <v-list-item-group>
            <v-list-item v-for="(item, i) in links" :key="i" :to="item.link" link>
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-app-bar>

      <v-content>
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Index from "@/views/Index";

export default {
  name: "App",
  components: {
    Index
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
        id: "upload",
        icon: "mdi-settings",
        text: "Upload",
        link: "/upload"
      },
      {
        id: "about",
        icon: "mdi-settings",
        text: "About",
        link: "/about"
      }
    ],
    drawer: false,
    model: 1,
    title: "Auth.log Analyzer"
  }),
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

<style lang="scss">
#app {
  font-family: Roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
