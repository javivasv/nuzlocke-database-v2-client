<template>
  <v-card-title>
    <v-btn color="secondary" @click="createNuzlocke()"> New nuzlocke </v-btn>
  </v-card-title>
  <v-divider class="my-3"></v-divider>
  <v-card-text>
    <v-row no-gutters>
      <v-col>
        <v-row class="py-1" no-gutters>
          <span class="new-nuzlocke-info">
            <strong>Name:</strong>
            The name of the playthrough
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="new-nuzlocke-info">
            <strong>Game:</strong>
            The name of the game
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="new-nuzlocke-info">
            <strong>Description:</strong>
            Relevant information of the playthrough, such as extra rules
          </span>
        </v-row>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "InfoActionsNewNuzlocke",
  components: {},
  computed: {},
  data() {
    return {};
  },
  methods: {
    createNuzlocke() {
      console.log("CREATE NUZLOCKE");
    },
  },
});
</script>

<style>
.new-nuzlocke-info {
  text-align: start;
}
</style>
