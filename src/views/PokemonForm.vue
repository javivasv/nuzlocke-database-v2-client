<template>
  <div id="pokemon-form" class="content">
    <v-row class="h-100 w-100" no-gutters>
      <v-col class="pa-3" cols="8">
        <v-row class="py-3" no-gutters>
          <v-btn icon @click="toNuzlocke()">
            <v-icon icon="arrow_back"></v-icon>
          </v-btn>
        </v-row>
        <v-row no-gutters>
          <v-card class="pa-4 w-100">
            <v-form ref="pokemonForm">
              <v-row no-gutters>
                <v-col></v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-row>
      </v-col>
      <v-col class="pa-3" cols="4">
        <Card :type="'pokemon-form'" @addPokemon="addPokemon()" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "../components/InfoActions/Card.vue";
export default defineComponent({
  name: "PokemonForm",
  components: {
    Card,
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    toNuzlocke() {
      this.$router.push({
        name: "nuzlocke",
        params: {
          id: this.$route.params.id,
        },
      });
    },
    addPokemon() {
      console.log("ADD POKEMON");
    },
  },
});
</script>

<style></style>
