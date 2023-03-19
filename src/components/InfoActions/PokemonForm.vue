<template>
  <v-card-title>
    <v-btn color="secondary" @click="addPokemon()">Add pokemon</v-btn>
  </v-card-title>
  <v-divider class="my-3"></v-divider>
  <v-card-text>
    <v-row no-gutters>
      <v-col></v-col>
    </v-row>
  </v-card-text>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "InfoActionsPokemonForm",
  emits: ["addPokemon"],
  components: {},
  computed: {},
  data() {
    return {};
  },
  methods: {
    addPokemon() {
      this.$emit("addPokemon");
    },
  },
});
</script>

<style>
.nuzlocke-form-info {
  text-align: start;
}
</style>
