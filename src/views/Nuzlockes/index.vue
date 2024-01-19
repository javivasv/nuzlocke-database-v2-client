<template>
  <div id="index-nuzlockes" class="content">
    <v-row class="h-100 w-100" no-gutters>
      <template v-if="$vuetify.display.mdAndUp">
        <v-col class="pa-3" cols="8">
          <MainContent ref="nuzlockes-main-content" />
        </v-col>
        <v-col class="pa-3" cols="4">
          <SecondaryContent
            @submitNuzlocke="submitNuzlocke()"
            @submitPokemon="submitPokemon()"
            @submitTeam="submitTeam()"
          />
        </v-col>
      </template>
      <template v-else>
        <v-col class="pa-3" cols="12">
          <MainContent ref="nuzlockes-main-content" />
          <SecondaryContent
            @submitNuzlocke="submitNuzlocke()"
            @submitPokemon="submitPokemon()"
            @submitTeam="submitTeam()"
          />
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainContent from "@/components/Nuzlockes/MainContent.vue";
import SecondaryContent from "@/components/Nuzlockes/SecondaryContent.vue";
export default defineComponent({
  name: "Nuzlockes",
  components: {
    MainContent,
    SecondaryContent,
  },
  methods: {
    submitNuzlocke() {
      (
        this.$refs["nuzlockes-main-content"] as HTMLFormElement
      ).submitNuzlocke();
    },
    submitPokemon() {
      (this.$refs["nuzlockes-main-content"] as HTMLFormElement).submitPokemon();
    },
    submitTeam() {
      (this.$refs["nuzlockes-main-content"] as HTMLFormElement).submitTeam();
    },
  },
});
</script>

<style></style>
