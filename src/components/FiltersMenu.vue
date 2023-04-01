<template>
  <v-card class="filters-card pa-4 mt-3" width="400px">
    <v-card-subtitle>
      <strong>Status filters</strong>
    </v-card-subtitle>
    <v-row no-gutters>
      <v-col v-for="filter in statusFilters" :key="filter.value" cols="4">
        <v-checkbox
          v-model="filter.on"
          :label="filter.name"
          hide-details
          color="secondary"
          @update:modelValue="updateFilter(filter.value, $event)"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-divider class="my-3"></v-divider>
    <v-card-subtitle>
      <strong>Obtained filters</strong>
    </v-card-subtitle>
    <v-row no-gutters>
      <v-col v-for="filter in obtainedFilters" :key="filter.value" cols="4">
        <v-checkbox
          v-model="filter.on"
          :label="filter.name"
          hide-details
          color="secondary"
          @update:modelValue="updateFilter(filter.value, $event)"
        ></v-checkbox>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Filters",
  components: {},
  props: {},
  computed: {},
  data() {
    return {
      statusFilters: [
        {
          name: "Alive",
          value: "alive",
          on: false,
        },
        {
          name: "Fainted",
          value: "fainted",
          on: false,
        },
      ],
      obtainedFilters: [
        {
          name: "Caught",
          value: "caught",
          on: false,
        },
        {
          name: "Gifted",
          value: "gifted",
          on: false,
        },
        {
          name: "Hatched",
          value: "hatched",
          on: false,
        },
        {
          name: "Traded",
          value: "traded",
          on: false,
        },
        {
          name: "Not caught",
          value: "not",
          on: false,
        },
      ],
    };
  },
  methods: {
    updateFilter(filter: string) {
      this.$emit("updateFilter", filter);
    },
  },
});
</script>

<style></style>
