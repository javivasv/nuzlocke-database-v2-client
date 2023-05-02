<template>
  <v-card class="filters-card pa-4 mt-3" width="420px">
    <MultiuseText :text="'Status filters'" />
    <v-row no-gutters>
      <v-col v-for="filter in statusFilters" :key="filter.value" cols="4">
        <v-checkbox
          v-model="filter.on"
          :class="{ 'dark-mode': $vuetify.theme.name === 'customDarkTheme' }"
          :label="filter.name"
          hide-details
          color="secondary"
          @update:modelValue="updateFilter(filter.value, 'status')"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-divider class="my-3"></v-divider>
    <MultiuseText :text="'Obtained filters'" />
    <v-row no-gutters>
      <v-col v-for="filter in obtainedFilters" :key="filter.value" cols="4">
        <v-checkbox
          v-model="filter.on"
          :class="{ 'dark-mode': $vuetify.theme.name === 'customDarkTheme' }"
          :label="filter.name"
          hide-details
          color="secondary"
          @update:modelValue="updateFilter(filter.value, 'obtained')"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-divider class="my-3"></v-divider>
    <MultiuseText :text="'Type filters'" />
    <v-row no-gutters>
      <v-col v-for="filter in pokemonTypes" :key="filter.value" cols="4">
        <v-checkbox
          v-model="filter.on"
          :class="{ 'dark-mode': $vuetify.theme.name === 'customDarkTheme' }"
          :label="filter.name"
          hide-details
          :color="filter.color"
          @update:modelValue="updateFilter(filter.value, 'type')"
        ></v-checkbox>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MultiuseText from "@/components/MultiuseText.vue";
import mixin from "@/mixin";
export default defineComponent({
  name: "FiltersMenu",
  mixins: [mixin],
  components: {
    MultiuseText,
  },
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
    updateFilter(value: string, type: string) {
      this.$emit("updateFilter", {
        value,
        type,
      });
    },
  },
});
</script>

<style></style>
