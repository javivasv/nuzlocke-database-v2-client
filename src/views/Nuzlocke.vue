<template>
  <div id="nuzlocke" class="content">
    <v-row class="w-100" no-gutters>
      <v-col class="content-col pa-3" cols="8">
        <v-row class="py-3" no-gutters>
          <v-btn icon @click="toNuzlockes()">
            <v-icon icon="arrow_back"></v-icon>
          </v-btn>
        </v-row>
        <v-row no-gutters>
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
                </v-window>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
      <v-col class="content-col pa-3" cols="4">
        <Card v-if="getNuzlocke" :type="'nuzlocke'" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import PokemonTable from "../components/PokemonTable.vue";
import Card from "../components/InfoActions/Card.vue";
export default defineComponent({
  name: "Nuzlocke",
  components: {
    PokemonTable,
    Card,
  },
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlocke: "GET_NUZLOCKE",
    }),
  },
  beforeUnmount() {
    this.setNuzlocke(null);
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
    ...mapMutations("nuzlockes", {
      setNuzlocke: "SET_NUZLOCKE",
    }),
    ...mapActions("nuzlockes", {
      fetchNuzlocke: "FETCH_NUZLOCKE",
    }),
    toNuzlockes() {
      this.$router.push({
        name: "nuzlockes",
      });
    },
  },
});
</script>

<style></style>
