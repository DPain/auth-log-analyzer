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
import { Entry } from "@/objects/entry";

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
      let entries = Array();
      let lines = text.split("\n");

      let delimiters = [" ", " ", ": ", ": ", "; ", " ", " ", " ", " ", " "];
      // eslint-disable-next-line
      console.log("Parsing!");

      for (let i = 0; i < lines.length; i++) {
        // Assuming default format to be format 1.
        let format = 1;
        let line = lines[i];

        let entry = new Entry();

        for (let j = 0; j < delimiters.length; j++) {
          let index = line.indexOf(delimiters[j]);

          if (index > 0) {
            let info = line.substring(0, index);
            this.fillEntry(entry, info, j);

            line = line.substring(index + delimiters[j].length); // Skip the delimiter itself.
          } else {
            // Separator not found. 2nd format or unknown format.

            this.fillEntry(entry, line, j);
            format = 2;
            break;
          }
        }

        if (format == 1) {
          // Fill in rhost info.
          this.fillEntry(entry, line, 10);
        }

        // Register entry.
        entries.push(entry);
      }

      // Parse the text file.
      return entries;
    },
    fillEntry: function(entry, info, index) {
      // Works because Javascript passes objects by reference.

      // There are 2 possible formats for a log.
      /**
       * Format 1 -> time host sshd[id] pam_event_type_desc; logname uid euid connection ruser rhost
       * Format 2 -> time host sshd[id] pam_event_type_desc
       */

      switch (index) {
        case 0:
          entry.time = info;
          break;
        case 1:
          entry.host = info;
          break;
        case 2:
          entry.sshdId = info;
          break;
        case 3:
          entry.category = info;
          break;
        case 4:
          entry.description = info;

          this.fillUid(entry);

          break;
        case 5:
          entry.logname = info;
          break;
        case 6:
          // Probably not needed.
          //entry.uid = info;

          break;
        case 7:
          entry.euid = info;
          break;
        case 8:
          entry.connection = info;
          break;
        case 9:
          entry.ruser = info;
          break;
        case 10:
          let term = "rhost=";
          let i = info.indexOf(term);
          entry.rhost = info.substring(i + term.length).trimRight();
          break;
      }
    },
    fillUid: function(entry) {
      if (entry.category == "pam_unix(sshd:session)") {
        let desc_uid_token = "user ";
        let desc_end_token = " by (uid=0)";
        let lookForUid = entry.description.indexOf(desc_uid_token);
        if (lookForUid >= 0) {
          entry.uid = entry.description.substring(
            lookForUid + desc_uid_token.length,
            entry.description.length -
              (entry.description.indexOf(desc_end_token) >= 0
                ? desc_end_token.length
                : 0)
          );
        }
      } else if (entry.category == "pam_syno_log_fail(sshd:auth)") {
        let desc_uid_token = "uid (";
        let desc_end_token = ").";
        let lookForUid = entry.description.indexOf(desc_uid_token);
        if (lookForUid >= 0) {
          entry.uid = entry.description.substring(
            lookForUid + desc_uid_token.length,
            entry.description.length -
              (entry.description.indexOf(desc_end_token) >= 0
                ? desc_end_token.length
                : 0)
          );
        }
      } else if (entry.category == "pam_syno_log_fail(ftpd:auth)") {
        let desc_uid_token = "uid (";
        let desc_end_token = ").";
        let lookForUid = entry.description.indexOf(desc_uid_token);
        if (lookForUid >= 0) {
          entry.uid = entry.description.substring(
            lookForUid + desc_uid_token.length,
            entry.description.length -
              (entry.description.indexOf(desc_end_token) >= 0
                ? desc_end_token.length
                : 0)
          );
        }
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