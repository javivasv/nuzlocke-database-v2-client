<template>
  <v-card class="filters-card pa-4 mt-3 w-100">
    <v-card-subtitle>
      <strong>Status filters</strong>
    </v-card-subtitle>
    <v-row no-gutters>
      <v-checkbox
        v-model="aliveFilter"
        label="Alive"
        hide-details
        color="secondary"
      ></v-checkbox>
      <v-checkbox
        v-model="faintedFilter"
        label="Fainted"
        hide-details
        color="secondary"
      ></v-checkbox>
    </v-row>
    <v-divider class="my-3"></v-divider>
    <v-card-subtitle>
      <strong>Obtained filters</strong>
    </v-card-subtitle>
    <v-row no-gutters>
      <v-checkbox
        v-model="caughtFilter"
        label="Caught"
        hide-details
        color="secondary"
      ></v-checkbox>
      <v-checkbox
        v-model="giftedFilter"
        label="Gifted"
        hide-details
        color="secondary"
      ></v-checkbox>
      <v-checkbox
        v-model="hatchedFilter"
        label="Hatched"
        hide-details
        color="secondary"
      ></v-checkbox>
      <v-checkbox
        v-model="tradedFilter"
        label="Traded"
        hide-details
        color="secondary"
      ></v-checkbox>
      <v-checkbox
        v-model="notCaughtFilter"
        label="Not caught"
        hide-details
        color="secondary"
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
      aliveFilter: false,
      faintedFilter: false,
      caughtFilter: false,
      giftedFilter: false,
      hatchedFilter: false,
      tradedFilter: false,
      notCaughtFilter: false,
    };
  },
  methods: {},
});
</script>

<style></style>
