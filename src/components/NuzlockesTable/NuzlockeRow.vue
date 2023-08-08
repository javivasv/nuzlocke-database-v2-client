<template>
  <v-row class="table-row py-5" no-gutters @click="checkNuzlocke(nuzlocke)">
    <v-col cols="6">
      <v-row no-gutters align="center" justify="center">
        <span class="table-text">
          {{ nuzlocke.name }}
        </span>
      </v-row>
    </v-col>
    <v-col cols="3">
      <v-row no-gutters align="center" justify="center">
        <span class="table-text">
          {{ nuzlocke.game }}
        </span>
      </v-row>
    </v-col>
    <v-col cols="3">
      <v-row no-gutters align="center" justify="center">
        <v-icon
          :icon="
            nuzlocke.status === 'started'
              ? 'flag'
              : nuzlocke.status === 'completed'
              ? 'done'
              : 'close'
          "
        ></v-icon>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Nuzlocke } from "@/interface";
export default defineComponent({
  name: "NuzlockeRow",
  props: {
    nuzlocke: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    checkNuzlocke(nuzlocke: Nuzlocke) {
      this.$emit("checkNuzlocke", nuzlocke);
    },
  },
});
</script>

<style></style>
