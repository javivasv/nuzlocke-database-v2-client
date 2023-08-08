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
          <v-row
            v-if="isLoading"
            class="py-5"
            no-gutters
            align="center"
            justify="center"
          >
            <v-progress-circular
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-row>
          <v-window v-else v-model="tab">
            <v-window-item>
              <PokemonTable />
            </v-window-item>
            <v-window-item>
              <TeamsTable />
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
import PokemonTable from "@/components/PokemonTable/index.vue";
import TeamsTable from "@/components/TeamsTable/index.vue";
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
    this.isLoading = true;

    if (
      !this.getNuzlocke ||
      this.getNuzlocke._id !== this.$route.params.nuzlockeId
    ) {
      this.fetchNuzlocke(this.$route.params.nuzlockeId).finally(() => {
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
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
