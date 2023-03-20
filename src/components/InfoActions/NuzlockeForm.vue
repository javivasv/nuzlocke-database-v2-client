<template>
  <v-row class="py-3" no-gutters align="center" justify="center">
    <v-btn color="secondary" @click="submitNuzlocke()">
      {{
        $route.name === "edit-nuzlocke-form"
          ? "Update nuzlocke"
          : "Create nuzlocke"
      }}
    </v-btn>
  </v-row>
  <v-divider class="my-3"></v-divider>
  <v-card-text>
    <v-row no-gutters>
      <v-col>
        <v-row class="py-1" no-gutters>
          <span class="nuzlocke-form-info">
            <strong>Name:</strong>
            The name of the playthrough
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="nuzlocke-form-info">
            <strong>Game:</strong>
            The name of the game
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="nuzlocke-form-info">
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
  name: "InfoActionsNuzlockeForm",
  emits: ["submitNuzlocke"],
  components: {},
  computed: {},
  data() {
    return {};
  },
  methods: {
    submitNuzlocke() {
      this.$emit("submitNuzlocke");
    },
  },
});
</script>

<style>
.nuzlocke-form-info {
  text-align: start;
}
</style>
