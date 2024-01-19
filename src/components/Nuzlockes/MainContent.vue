<template>
  <v-row v-if="$route.name !== 'nuzlockes'" class="py-3" no-gutters>
    <v-btn icon @click="goTo()">
      <v-icon icon="arrow_back"></v-icon>
    </v-btn>
  </v-row>
  <router-view v-slot="{ Component }">
    <component ref="nuzlockes-router-view" :is="Component" />
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/InfoActions/Card.vue";
export default defineComponent({
  name: "NuzlockesMainContent",
  components: {
    Card,
  },
  methods: {
    goTo() {
      if (
        this.$route.name === "nuzlocke" ||
        this.$route.name === "nuzlocke-form"
      ) {
        this.$router.push({
          name: "nuzlockes",
        });
      } else if (
        this.$route.name === "edit-nuzlocke-form" ||
        this.$route.name === "pokemon-form" ||
        this.$route.name === "edit-pokemon-form" ||
        this.$route.name === "team-form" ||
        this.$route.name === "edit-team-form"
      ) {
        this.$router.push({
          name: "nuzlocke",
          params: {
            nuzlockeId: this.$route.params.nuzlockeId,
          },
        });
      }
    },
    submitNuzlocke() {
      (this.$refs["nuzlockes-router-view"] as HTMLFormElement).submitNuzlocke();
    },
    submitPokemon() {
      (this.$refs["nuzlockes-router-view"] as HTMLFormElement).submitPokemon();
    },
    submitTeam() {
      (this.$refs["nuzlockes-router-view"] as HTMLFormElement).submitTeam();
    },
  },
});
</script>

<style></style>
