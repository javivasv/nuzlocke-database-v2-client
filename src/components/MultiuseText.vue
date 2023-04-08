<template>
  <v-row class="py-1" no-gutters :align="align" :justify="justify">
    <span class="text-field-name">
      {{ text }}
    </span>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MultiuseText",
  props: {
    text: {
      type: String,
      default: "",
    },
    align: {
      type: String,
      default: "center",
    },
    justify: {
      type: String,
      default: "start",
    },
  },
});
</script>

<style></style>
