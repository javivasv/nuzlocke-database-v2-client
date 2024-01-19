<template>
  <v-row :class="$vuetify.display.smAndDown ? 'pt-3' : ''" no-gutters>
    <Card
      @submitNuzlocke="submitNuzlocke()"
      @submitPokemon="submitPokemon()"
      @submitTeam="submitTeam()"
    />
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/InfoActions/Card.vue";
export default defineComponent({
  name: "NuzlockesSecondaryContent",
  components: {
    Card,
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
