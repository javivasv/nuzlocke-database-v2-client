<template>
  <v-row class="py-3" no-gutters align="center" justify="center">
    <v-btn color="secondary" :loading="isLoading" @click="submitNuzlocke()">
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
          <span class="card-text">
            <strong>Name:</strong>
            The name of the playthrough
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="card-text">
            <strong>Game:</strong>
            The name of the game
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="card-text">
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
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    submitNuzlocke() {
      this.isLoading = true;
      this.$emit("submitNuzlocke");
    },
  },
});
</script>

<style></style>
