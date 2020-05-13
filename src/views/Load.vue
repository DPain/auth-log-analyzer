<template>
  <div class="load">
    <input type="file" ref="file" style="display: none" @change="load()" multiple="multiple" />
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
                  <v-btn large outlined @click="triggerInput()">Load</v-btn>
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
import Entry from "@/objects/entry";
import setCategoryData from "@/objects/category";

export default {
  name: "Load",

  data: () => ({
    temp: {
      hello: "world",
      world: "jelly"
    }
  }),

  methods: {
    triggerInput: function() {
      this.$refs.file.click();
    },
    load: function() {
      // eslint-disable-next-line
      console.log(this.$refs.file.files);
      if (this.$refs.file.files.length > 0) {
        let promises = [];

        // Creates Promises for each file, because the reading process is asynchronous.
        Array.prototype.forEach.call(this.$refs.file.files, el => {
          let filePromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(el, "UTF-8");
            reader.onload = evt => {
              resolve(this.parse(evt.target.result));
            };
          });
          promises.push(filePromise);
        });

        // Gathers all the values from the promises and then redirects to display page.
        Promise.all(promises).then(dataList => {
          // eslint-disable-next-line
          console.log("dataList");
          // eslint-disable-next-line
          console.log(dataList);
          // eslint-disable-next-line
          console.log(dataList.length);
          this.$router.replace({
            name: "display",
            params: { stats: dataList }
          });
        });
      }
    },
    parse: function(text) {
      let numIgnore = 0; // Number of ignored lines.
      let entries = Array();
      let lines = text.split("\n");

      // Handles the extra line the log might have.
      if (lines[lines.length - 1] == "") {
        lines.pop();
      }

      let delimiters = [" ", " ", ": ", ": "];
      // eslint-disable-next-line
      console.log("Parsing!");

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        if (line == "\n") {
          // Checks if line is an empty line.
          continue;
        } else {
          // Line is not empty.
          let entry = new Entry();

          // Parses through each line with delimiters.
          for (let j = 0; j < delimiters.length; j++) {
            let index = line.indexOf(delimiters[j]);

            if (index > 0) {
              // Separator found.
              let info = line.substring(0, index);
              let leftover = line.substring(index);
              this.fillEntry(entry, info, leftover, j);

              line = line.substring(index + delimiters[j].length); // Skip the delimiter itself.
            } else {
              // Separator not found. Unknown format.

              numIgnore++;
              break;
            }
          }

          // Register entry.
          entries.push(entry);
        }
      }

      // Parse the text file.
      return {
        numIgnore: numIgnore,
        entries: entries
      };
    },
    fillEntry: function(entry, info, leftover, index) {
      // Works because Javascript passes objects by reference.

      switch (index) {
        case 0:
          entry.time = info;
          break;
        case 1:
          entry.host = info;
          break;
        case 2:
          entry.id = info;
          break;
        case 3:
          setCategoryData(entry, info, leftover);
          break;
      }
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

.flexcard {
  display: flex;
  flex-direction: column;
}
</style>