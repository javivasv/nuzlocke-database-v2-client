<template>
  <v-row class="py-1" no-gutters>
    <span class="text-field-name">
      {{ text }}
    </span>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TextFieldName",
  components: {},
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style></style>
