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
                      density="compact"
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
                      density="compact"
                      hide-details
                      rows="2"
                    ></v-textarea>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
            <v-row no-gutters align="center" justify="center">
              <v-col>
                <template
                  v-for="(pokemon, index) in team.pokemon"
                  :key="pokemon.pokemonId"
                >
                  <v-row no-gutters align="center" justify="center">
                    <v-col class="pr-3" cols="3">
                      <v-row
                        v-if="pokemon.pokemon && pokemon.pokemon.sprite !== ''"
                        class="py-2"
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
                      <v-row class="py-2" no-gutters>
                        <v-autocomplete
                          v-model="pokemon.pokemon"
                          :items="filteredPokemon(index)"
                          item-value="species.formattedSpecies"
                          item-title="species.formattedSpecies"
                          density="compact"
                          hide-details
                          return-object
                          variant="outlined"
                          clearable
                          @click:clear="clearPokemon(index)"
                        ></v-autocomplete>
                      </v-row>
                    </v-col>
                    <v-col class="px-3" cols="3">
                      <v-row
                        v-if="pokemon.item && pokemon.item.sprite !== ''"
                        class="py-2"
                        no-gutters
                        align="center"
                        justify="center"
                      >
                        <v-img :src="pokemon.item.sprite" height="100px">
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
                      <v-row
                        class="py-2"
                        no-gutters
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          v-if="loadingItems"
                          color="primary"
                          indeterminate
                        ></v-progress-circular>
                        <v-autocomplete
                          v-else
                          v-model="pokemon.item"
                          :items="getItems"
                          item-value="formattedItem"
                          item-title="formattedItem"
                          density="compact"
                          hide-details
                          return-object
                          variant="outlined"
                          clearable
                          @click:clear="clearItem(index)"
                          @update:modelValue="fetchItemData(index)"
                        ></v-autocomplete>
                      </v-row>
                    </v-col>
                    <v-col class="pl-3" cols="6">
                      <v-row class="py-2" no-gutters>
                        <v-col class="pr-3" cols="6">
                          <v-row no-gutters>
                            <v-autocomplete
                              density="compact"
                              hide-details
                              variant="outlined"
                            ></v-autocomplete>
                          </v-row>
                        </v-col>
                        <v-col class="pl-3" cols="6">
                          <v-row no-gutters>
                            <v-autocomplete
                              density="compact"
                              hide-details
                              variant="outlined"
                            ></v-autocomplete>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-row class="py-2" no-gutters>
                        <v-col class="pr-3" cols="6">
                          <v-row no-gutters>
                            <v-autocomplete
                              density="compact"
                              hide-details
                              variant="outlined"
                            ></v-autocomplete>
                          </v-row>
                        </v-col>
                        <v-col class="pl-3" cols="6">
                          <v-row no-gutters>
                            <v-autocomplete
                              density="compact"
                              hide-details
                              variant="outlined"
                            ></v-autocomplete>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-divider v-if="index !== 5" class="my-3 px-3"></v-divider>
                </template>
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
export default defineComponent({
  name: "TeamForm",
  components: {
    Card,
  },
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlocke: "GET_NUZLOCKE",
    }),
    ...mapGetters("pokeapi", {
      getItems: "GET_ITEMS",
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
            item: {
              sprite: "",
              codedItem: "",
              formattedItem: "",
            },
            moves: {
              first: "",
              second: "",
              third: "",
              fourth: "",
            },
          },
          {
            pokemon: null,
            item: {
              sprite: "",
              codedItem: "",
              formattedItem: "",
            },
            moves: {
              first: "",
              second: "",
              third: "",
              fourth: "",
            },
          },
          {
            pokemon: null,
            item: {
              sprite: "",
              codedItem: "",
              formattedItem: "",
            },
            moves: {
              first: "",
              second: "",
              third: "",
              fourth: "",
            },
          },
          {
            pokemon: null,
            item: {
              sprite: "",
              codedItem: "",
              formattedItem: "",
            },
            moves: {
              first: "",
              second: "",
              third: "",
              fourth: "",
            },
          },
          {
            pokemon: null,
            item: {
              sprite: "",
              codedItem: "",
              formattedItem: "",
            },
            moves: {
              first: "",
              second: "",
              third: "",
              fourth: "",
            },
          },
          {
            pokemon: null,
            item: {
              sprite: "",
              codedItem: "",
              formattedItem: "",
            },
            moves: {
              first: "",
              second: "",
              third: "",
              fourth: "",
            },
          },
        ],
      },
      loadingItems: false,
      nameRules: [(value: string) => this.required(value, "name")],
    };
  },
  mounted() {
    if (!this.getNuzlocke) {
      this.fetchNuzlocke(this.$route.params.nuzlockeId);
    }

    if (this.getItems.length === 0) {
      this.loadingItems = true;
      this.fetchItems().then(() => {
        this.loadingItems = false;
      });
    }
  },
  methods: {
    ...mapActions("nuzlockes", {
      fetchNuzlocke: "FETCH_NUZLOCKE",
    }),
    ...mapActions("pokeapi", {
      fetchItems: "FETCH_ITEMS",
      fetchItem: "FETCH_ITEM",
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
    fetchItemData(index: number) {
      this.fetchItem(this.team.pokemon[index].item.codedItem).then((res) => {
        this.team.pokemon[index].item.sprite = res.sprites.default
          ? res.sprites.default
          : "";
      });
    },
    clearPokemon(index: number) {
      this.team.pokemon[index] = {
        pokemon: null,
        item: {
          sprite: "",
          codedItem: "",
          formattedItem: "",
        },
        moves: {
          first: "",
          second: "",
          third: "",
          fourth: "",
        },
      };
    },
    clearItem(index: number) {
      this.team.pokemon[index].item = {
        sprite: "",
        codedItem: "",
        formattedItem: "",
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
