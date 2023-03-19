<template>
  <div id="nuzlocke" class="content">
    <v-row class="h-100 w-100" no-gutters>
      <v-col class="pa-3" cols="8">
        <v-row class="py-3" no-gutters>
          <v-btn icon @click="toNuzlockes()">
            <v-icon icon="arrow_back"></v-icon>
          </v-btn>
        </v-row>
        <v-row no-gutters>
          <v-card class="pa-4 w-100">
            <v-row no-gutters>
              <v-col></v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
      <v-col class="pa-3" cols="4">
        <Card :type="'nuzlocke'" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "../components/InfoActions/Card.vue";
export default defineComponent({
  name: "Nuzlocke",
  components: {
    Card,
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    toNuzlockes() {
      this.$router.push({
        name: "nuzlockes",
      });
    },
  },
});
</script>

<style></style>
