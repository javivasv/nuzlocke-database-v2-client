<template>
  <div class="card-container h-100">
    <v-row no-gutters align="center" justify="center">
      <v-img
        class="pokeball"
        eager
        :src="require('@/assets/pokeball.png')"
      ></v-img>
    </v-row>
    <v-card class="info-card px-4 pb-4 w-100">
      <Nuzlockes v-if="type === 'nuzlockes'" />
      <NuzlockeForm
        v-if="type === 'nuzlocke-form'"
        @submitNuzlocke="submitNuzlocke()"
      />
      <PokemonForm
        v-if="type === 'pokemon-form'"
        @submitPokemon="submitPokemon()"
      />
      <TeamForm v-if="type === 'team-form'" @submitTeam="submitTeam()" />
      <Nuzlocke v-if="type === 'nuzlocke'" />
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Nuzlockes from "@/components/InfoActions/Nuzlockes.vue";
import NuzlockeForm from "@/components/InfoActions/NuzlockeForm.vue";
import PokemonForm from "@/components/InfoActions/PokemonForm.vue";
import TeamForm from "@/components/InfoActions/TeamForm.vue";
import Nuzlocke from "@/components/InfoActions/Nuzlocke.vue";
export default defineComponent({
  name: "InfoActionsCard",
  components: {
    Nuzlockes,
    NuzlockeForm,
    PokemonForm,
    TeamForm,
    Nuzlocke,
  },
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  methods: {
    submitNuzlocke() {
      this.$emit("submitNuzlocke");
    },
    submitPokemon() {
      this.$emit("submitPokemon");
    },
    submitTeam() {
      this.$emit("submitTeam");
    },
  },
});
</script>

<style></style>
