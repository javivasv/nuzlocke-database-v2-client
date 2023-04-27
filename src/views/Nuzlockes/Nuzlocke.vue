<template>
  <v-row v-if="getNuzlocke" id="nuzlocke" no-gutters>
    <v-card class="pa-4 w-100" style="height: fit-content">
      <v-row no-gutters>
        <v-col>
          <v-row no-gutters>
            <v-tabs v-model="tab" color="primary">
              <v-tab> Pokemon </v-tab>
              <v-tab> Teams </v-tab>
            </v-tabs>
          </v-row>
          <v-window v-model="tab">
            <v-window-item>
              <PokemonTable :is-loading="isLoading" />
            </v-window-item>
            <v-window-item>
              <TeamsTable :is-loading="isLoading" />
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import PokemonTable from "@/components/PokemonTable.vue";
import TeamsTable from "@/components/TeamsTable.vue";
export default defineComponent({
  name: "Nuzlocke",
  components: {
    PokemonTable,
    TeamsTable,
  },
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlocke: "GET_NUZLOCKE",
    }),
  },
  mounted() {
    if (!this.getNuzlocke) {
      this.isLoading = true;
      this.fetchNuzlocke(this.$route.params.nuzlockeId).finally(() => {
        this.isLoading = false;
      });
    }
  },
  data() {
    return {
      tab: 0,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("nuzlockes", {
      fetchNuzlocke: "FETCH_NUZLOCKE",
    }),
  },
});
</script>

<style></style>
