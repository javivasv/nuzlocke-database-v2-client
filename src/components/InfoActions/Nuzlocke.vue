<template>
  <v-card-title>
    <v-btn color="secondary" @click="toAddPokemon()">Add pokemon</v-btn>
  </v-card-title>
  <v-divider class="my-3"></v-divider>
  <v-card-subtitle>
    <strong>Relevant websites</strong>
  </v-card-subtitle>
  <v-card-text>
    <v-row no-gutters>
      <v-col>
        <v-row no-gutters></v-row>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "InfoActionsNuzlocke",
  components: {},
  computed: {},
  data() {
    return {};
  },
  methods: {
    toAddPokemon() {
      console.log("ADD POKEMON");
    },
  },
});
</script>

<style></style>
