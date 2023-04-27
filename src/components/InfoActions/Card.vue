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
      <Nuzlockes v-if="cardType === 'nuzlockes'" />
      <NuzlockeForm
        v-if="cardType === 'nuzlocke-form'"
        @submitNuzlocke="submitNuzlocke()"
      />
      <PokemonForm
        v-if="cardType === 'pokemon-form' && getNuzlocke"
        @submitPokemon="submitPokemon()"
      />
      <TeamForm
        v-if="cardType === 'team-form' && getNuzlocke"
        @submitTeam="submitTeam()"
      />
      <Nuzlocke v-if="cardType === 'nuzlocke' && getNuzlocke" />
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlocke: "GET_NUZLOCKE",
    }),
    cardType() {
      if (this.$route.name === "nuzlockes") {
        return "nuzlockes";
      } else if (
        this.$route.name === "nuzlocke-form" ||
        this.$route.name === "edit-nuzlocke-form"
      ) {
        return "nuzlocke-form";
      } else if (this.$route.name === "nuzlocke") {
        return "nuzlocke";
      } else if (
        this.$route.name === "pokemon-form" ||
        this.$route.name === "edit-pokemon-form"
      ) {
        return "pokemon-form";
      } else if (
        this.$route.name === "team-form" ||
        this.$route.name === "edit-team-form"
      ) {
        return "team-form";
      } else {
        return "nuzlockes";
      }
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
