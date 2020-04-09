<template>
  <div id="app">
    <v-app id="analyzer">
      <v-navigation-drawer v-model="drawer" app clipped temporary>
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
        <router-link tag="span" class="link" to="/">
          <v-toolbar-title v-text="title" to="/"></v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>
        <router-link class="link" :to="uploadUrl">
          <v-btn icon>
            <v-icon>mdi-upload</v-icon>
          </v-btn>
        </router-link>
      </v-app-bar>

      <!-- Sizes your content based upon application components -->
      <v-content>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- Using vue-router -->
          <router-view></router-view>
        </v-container>
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
  data() {
    return {
      links: [
        {
          id: "index",
          icon: "mdi-home",
          text: "Home",
          link: "/"
        },
        {
          id: "upload",
          icon: "mdi-upload",
          text: "Upload",
          link: "/upload"
        }
      ],
      drawer: false,
      model: 1,
      title: "Auth.log Analyzer"
    };
  },
  computed: {
    uploadUrl() {
      return this.links.find(el => el["id"] == "upload").link;
    }
  },
  methods: {
    doStuff(e) {
      console.log("TEST");
      // target is actually btn__content so we need to go one step higher
      e.path[1].deactive;
      e.path[1].blur();
    }
  },
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

.link {
  text-decoration: none;
  color: white;
  cursor: pointer;
}

// Lets Nav bar to be temporary and clipped.
.v-navigation-drawer--temporary.v-navigation-drawer--clipped {
  z-index: 5;
  padding-top: 64px;
}
</style>
