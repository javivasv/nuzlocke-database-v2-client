<template>
  <div v-if="getNuzlocke" id="team-form" class="content">
    <v-row class="h-100 w-100" no-gutters>
      <v-col class="pa-3" cols="8">
        <v-row class="py-3" no-gutters>
          <v-btn icon @click="toNuzlocke()">
            <v-icon icon="arrow_back"></v-icon>
          </v-btn>
        </v-row>
        <v-row no-gutters>
          <v-card class="pa-4 w-100">
            <v-form ref="teamForm">
              <v-row no-gutters>
                <v-col>
                  <v-row class="py-1" no-gutters>
                    <v-text-field
                      v-model="team.name"
                      placeholder="Name"
                      variant="outlined"
                      color="secondary"
                      :rules="nameRules"
                    ></v-text-field>
                  </v-row>
                  <v-row class="py-1" no-gutters>
                    <v-textarea
                      v-model="team.description"
                      placeholder="Description"
                      variant="outlined"
                      color="secondary"
                      no-resize
                      hide-details
                    ></v-textarea>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
            <v-row no-gutters align="center" justify="center">
              <v-col
                v-for="(pokemon, index) in team.pokemon"
                :key="pokemon.pokemonId"
                class="pa-2"
                cols="4"
              >
                <v-row
                  v-if="pokemon.pokemon && pokemon.pokemon.sprite !== ''"
                  no-gutters
                  align="center"
                  justify="center"
                >
                  <v-img :src="pokemon.pokemon.sprite" height="100px">
                    <template #placeholder>
                      <v-row
                        class="h-100"
                        no-gutters
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          color="primary"
                          indeterminate
                        ></v-progress-circular>
                      </v-row> </template
                  ></v-img>
                </v-row>
                <v-row no-gutters>
                  <v-select
                    v-model="pokemon.pokemon"
                    :items="filteredPokemon(index)"
                    item-value="species.formattedSpecies"
                    item-title="species.formattedSpecies"
                    hide-details
                    return-object
                    variant="outlined"
                    clearable
                    @click:clear="clearPokemon(index)"
                  ></v-select>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
      <v-col class="pa-3" cols="4">
        <Card v-if="false" :type="'team-form'" @submitTeam="submitTeam()" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import Card from "../components/InfoActions/Card.vue";
import { Pokemon } from "../store/interfaces/index";
export default defineComponent({
  name: "TeamForm",
  components: {
    Card,
  },
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlocke: "GET_NUZLOCKE",
    }),
  },
  data() {
    return {
      team: {
        name: "",
        description: "",
        pokemon: [
          {
            pokemon: null,
            item: "",
            moves: {
              first: "",
              second: "",
              third: "",
              fourth: "",
            },
          },
          {
            pokemon: null,
            item: "",
            moves: {
              first: "",
              second: "",
              third: "",
              fourth: "",
            },
          },
          {
            pokemon: null,
            item: "",
            moves: {
              first: "",
              second: "",
              third: "",
              fourth: "",
            },
          },
          {
            pokemon: null,
            item: "",
            moves: {
              first: "",
              second: "",
              third: "",
              fourth: "",
            },
          },
          {
            pokemon: null,
            item: "",
            moves: {
              first: "",
              second: "",
              third: "",
              fourth: "",
            },
          },
          {
            pokemon: null,
            item: "",
            moves: {
              first: "",
              second: "",
              third: "",
              fourth: "",
            },
          },
        ],
      },
      nameRules: [(value: string) => this.required(value, "name")],
    };
  },
  mounted() {
    if (!this.getNuzlocke) {
      this.fetchNuzlocke(this.$route.params.nuzlockeId);
    }
  },
  methods: {
    ...mapActions("nuzlockes", {
      fetchNuzlocke: "FETCH_NUZLOCKE",
    }),
    toNuzlocke() {
      this.$router.push({
        name: "nuzlocke",
        params: {
          nuzlockeId: this.$route.params.nuzlockeId,
        },
      });
    },
    filteredPokemon(teamPokemonIndex: number) {
      let pokemonList = [...this.getNuzlocke.pokemon];
      this.team.pokemon.forEach((pokemon, index) => {
        if (teamPokemonIndex !== index) {
          if (pokemon.pokemon) {
            pokemonList.splice(pokemonList.indexOf(pokemon.pokemon), 1);
          }
        }
      });

      return pokemonList;
    },
    clearPokemon(index: number) {
      this.team.pokemon[index] = {
        pokemon: null,
        item: "",
        moves: {
          first: "",
          second: "",
          third: "",
          fourth: "",
        },
      };
    },
    submitTeam() {
      console.log("SUBMIT TEAM");
    },
    required(value: string, type: string) {
      if (value) return true;
      return `You must enter a ${type}`;
    },
  },
});
</script>

<style></style>
