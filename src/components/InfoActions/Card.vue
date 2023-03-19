<template>
  <div class="card-container h-100">
    <v-row no-gutters align="center" justify="center">
      <v-img
        class="pokeball"
        eager
        :src="require('../../assets/pokeball.png')"
      ></v-img>
    </v-row>
    <v-card class="info-card px-4 pb-4 w-100">
      <Nuzlockes v-if="type === 'nuzlockes'" />
      <NuzlockeForm
        v-if="type === 'nuzlocke-form'"
        @createNuzlocke="createNuzlocke()"
      />
      <PokemonForm v-if="type === 'pokemon-form'" @addPokemon="addPokemon()" />
      <Nuzlocke v-if="type === 'nuzlocke'" />
    </v-card>
    <Filters v-if="type === 'nuzlocke'" @updateFilter="updateFilter" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Nuzlockes from "./Nuzlockes.vue";
import NuzlockeForm from "./NuzlockeForm.vue";
import PokemonForm from "./PokemonForm.vue";
import Nuzlocke from "./Nuzlocke.vue";
import Filters from "./Filters.vue";
export default defineComponent({
  name: "InfoActionsCard",
  components: {
    Nuzlockes,
    NuzlockeForm,
    PokemonForm,
    Nuzlocke,
    Filters,
  },
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    createNuzlocke() {
      this.$emit("createNuzlocke");
    },
    addPokemon() {
      this.$emit("addPokemon");
    },
    updateFilter(filter: string) {
      this.$emit("updateFilter", filter);
    },
  },
});
</script>

<style>
.card-container {
  padding-top: 97.5px;
}
.pokeball {
  width: 195px;
  z-index: 100 !important;
  position: absolute !important;
  top: 15px;
}
.info-card {
  padding-top: 112.5px !important;
}
</style>
