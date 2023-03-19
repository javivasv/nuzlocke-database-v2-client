<template>
  <v-card-title>
    <v-btn color="secondary" @click="addPokemon()">Add pokemon</v-btn>
  </v-card-title>
  <v-divider class="my-3"></v-divider>
  <v-card-text>
    <v-row no-gutters>
      <v-col>
        <v-row class="py-1" no-gutters>
          <span class="pokemon-form-info">
            <strong>Species:</strong>
            The species of the pokemon
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="pokemon-form-info">
            <strong>Original:</strong>
            In case of being an original pokemon species or being a species not
            existing in any previous game or region
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="pokemon-form-info">
            <strong>Nickname:</strong>
            The nickname given to the pokemon, if given one
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="pokemon-form-info">
            <strong>Location:</strong>
            The location in which the pokemon was obtained or encountered
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="pokemon-form-info">
            <strong>Obtained:</strong>
            The way in which the pokemon was obtained, or if it was obtained
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="pokemon-form-info">
            <strong>Shiny:</strong>
            The species sprite is shown with the shiny coloration, if there is
            one
          </span>
        </v-row>
      </v-col>
    </v-row>
  </v-card-text>
  <v-divider class="my-3"></v-divider>
  <v-card-text>
    <v-row no-gutters>
      <v-col>
        <v-row class="py-1" no-gutters align="center" justify="center">
          <span>
            Not all the pokemon listed have a sprite and not all the pokemon
            that have one, have a sprite with the shiny coloration. This data
            comes from the
            <a
              class="website-link"
              href="https://pokeapi.co/docs/v2"
              target="_blank"
              >PokeAPI V2</a
            >
          </span>
        </v-row>
      </v-col>
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
.pokemon-form-info {
  text-align: start;
}
</style>
