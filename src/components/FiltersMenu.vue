<template>
  <v-card class="filters-card pa-4 mt-3 w-100" max-width="350px">
    <v-card-subtitle>
      <strong>Status filters</strong>
    </v-card-subtitle>
    <v-row no-gutters>
      <v-checkbox
        v-model="filters.alive"
        label="Alive"
        hide-details
        color="secondary"
        @update:modelValue="updateFilter('alive', $event)"
      ></v-checkbox>
      <v-checkbox
        v-model="filters.fainted"
        label="Fainted"
        hide-details
        color="secondary"
        @update:modelValue="updateFilter('fainted', $event)"
      ></v-checkbox>
    </v-row>
    <v-divider class="my-3"></v-divider>
    <v-card-subtitle>
      <strong>Obtained filters</strong>
    </v-card-subtitle>
    <v-row no-gutters>
      <v-checkbox
        v-model="filters.caught"
        label="Caught"
        hide-details
        color="secondary"
        @update:modelValue="updateFilter('caught', $event)"
      ></v-checkbox>
      <v-checkbox
        v-model="filters.gifted"
        label="Gifted"
        hide-details
        color="secondary"
        @update:modelValue="updateFilter('gifted', $event)"
      ></v-checkbox>
      <v-checkbox
        v-model="filters.hatched"
        label="Hatched"
        hide-details
        color="secondary"
        @update:modelValue="updateFilter('hatched', $event)"
      ></v-checkbox>
      <v-checkbox
        v-model="filters.traded"
        label="Traded"
        hide-details
        color="secondary"
        @update:modelValue="updateFilter('traded', $event)"
      ></v-checkbox>
      <v-checkbox
        v-model="filters.not"
        label="Not caught"
        hide-details
        color="secondary"
        @update:modelValue="updateFilter('not', $event)"
      ></v-checkbox>
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
      filters: {
        alive: false,
        fainted: false,
        caught: false,
        gifted: false,
        hatched: false,
        traded: false,
        not: false,
      },
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
