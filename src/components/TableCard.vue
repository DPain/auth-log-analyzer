<template>
  <v-card class="pa-4">
    <v-card-title class="headline">{{title}}</v-card-title>
    <v-card-subtitle>{{subtitle}}</v-card-subtitle>

    <div class="pa-2">
      <v-data-table dark :headers="headers" :items="data" :items-per-page="5"></v-data-table>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "TableCard",
  components: {},
  props: {
    title: String,
    subtitle: String,
    headers: Array,
    data: Array
  }
};
</script>

<style>
</style>