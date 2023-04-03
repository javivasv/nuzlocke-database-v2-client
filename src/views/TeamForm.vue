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
          <v-card
            class="pa-4 w-100"
            style="overflow: auto"
            :style="{
              'max-height': $vuetify.display.height - 96 + 'px',
            }"
          >
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
                          item-value="species.formattedName"
                          item-title="species.formattedName"
                          density="compact"
                          hide-details
                          return-object
                          variant="outlined"
                          clearable
                          @click:clear="clearPokemon(index)"
                        ></v-autocomplete>
                      </v-row>
                    </v-col>
                    <v-col
                      class="px-3"
                      cols="3"
                      :align-self="pokemon.pokemon ? 'end' : 'center'"
                    >
                      <v-row
                        v-if="pokemon.item && pokemon.item.sprite !== ''"
                        class="py-2"
                        no-gutters
                        align="center"
                        justify="center"
                      >
                        <v-img :src="pokemon.item.sprite" height="50px">
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
                        :class="pokemon.pokemon ? 'mt-5' : ''"
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
                          item-value="formattedName"
                          item-title="formattedName"
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
                      <v-row
                        v-if="loadingMoves"
                        no-gutters
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          color="primary"
                          indeterminate
                        ></v-progress-circular
                      ></v-row>
                      <template v-else>
                        <v-row class="py-2" no-gutters>
                          <v-col class="pr-3" cols="6">
                            <v-row no-gutters>
                              <v-autocomplete
                                v-model="pokemon.moves.first"
                                :items="getMoves"
                                item-value="formattedName"
                                item-title="formattedName"
                                return-object
                                density="compact"
                                hide-details
                                variant="outlined"
                                clearable
                                @click:clear="clearMove(index, 'first')"
                              ></v-autocomplete>
                            </v-row>
                          </v-col>
                          <v-col class="pl-3" cols="6">
                            <v-row no-gutters>
                              <v-autocomplete
                                v-model="pokemon.moves.second"
                                :items="getMoves"
                                item-value="formattedName"
                                item-title="formattedName"
                                return-object
                                density="compact"
                                hide-details
                                variant="outlined"
                                clearable
                                @click:clear="clearMove(index, 'second')"
                              ></v-autocomplete>
                            </v-row>
                          </v-col>
                        </v-row>
                        <v-row class="py-2" no-gutters>
                          <v-col class="pr-3" cols="6">
                            <v-row no-gutters>
                              <v-autocomplete
                                v-model="pokemon.moves.third"
                                :items="getMoves"
                                item-value="formattedName"
                                item-title="formattedName"
                                return-object
                                density="compact"
                                hide-details
                                variant="outlined"
                                clearable
                                @click:clear="clearMove(index, 'third')"
                              ></v-autocomplete>
                            </v-row>
                          </v-col>
                          <v-col class="pl-3" cols="6">
                            <v-row no-gutters>
                              <v-autocomplete
                                v-model="pokemon.moves.fourth"
                                :items="getMoves"
                                item-value="formattedName"
                                item-title="formattedName"
                                return-object
                                density="compact"
                                hide-details
                                variant="outlined"
                                clearable
                                @click:clear="clearMove(index, 'fourth')"
                              ></v-autocomplete>
                            </v-row>
                          </v-col>
                        </v-row>
                      </template>
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
import { Moves } from "../store/interfaces/index";
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
      getMoves: "GET_MOVES",
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
              codedName: "",
              formattedName: "",
            },
            moves: {
              first: {
                codedName: "",
                formattedName: "",
              },
              second: {
                codedName: "",
                formattedName: "",
              },
              third: {
                codedName: "",
                formattedName: "",
              },
              fourth: {
                codedName: "",
                formattedName: "",
              },
            },
          },
          {
            pokemon: null,
            item: {
              sprite: "",
              codedName: "",
              formattedName: "",
            },
            moves: {
              first: {
                codedName: "",
                formattedName: "",
              },
              second: {
                codedName: "",
                formattedName: "",
              },
              third: {
                codedName: "",
                formattedName: "",
              },
              fourth: {
                codedName: "",
                formattedName: "",
              },
            },
          },
          {
            pokemon: null,
            item: {
              sprite: "",
              codedName: "",
              formattedName: "",
            },
            moves: {
              first: {
                codedName: "",
                formattedName: "",
              },
              second: {
                codedName: "",
                formattedName: "",
              },
              third: {
                codedName: "",
                formattedName: "",
              },
              fourth: {
                codedName: "",
                formattedName: "",
              },
            },
          },
          {
            pokemon: null,
            item: {
              sprite: "",
              codedName: "",
              formattedName: "",
            },
            moves: {
              first: {
                codedName: "",
                formattedName: "",
              },
              second: {
                codedName: "",
                formattedName: "",
              },
              third: {
                codedName: "",
                formattedName: "",
              },
              fourth: {
                codedName: "",
                formattedName: "",
              },
            },
          },
          {
            pokemon: null,
            item: {
              sprite: "",
              codedName: "",
              formattedName: "",
            },
            moves: {
              first: {
                codedName: "",
                formattedName: "",
              },
              second: {
                codedName: "",
                formattedName: "",
              },
              third: {
                codedName: "",
                formattedName: "",
              },
              fourth: {
                codedName: "",
                formattedName: "",
              },
            },
          },
          {
            pokemon: null,
            item: {
              sprite: "",
              codedName: "",
              formattedName: "",
            },
            moves: {
              first: {
                codedName: "",
                formattedName: "",
              },
              second: {
                codedName: "",
                formattedName: "",
              },
              third: {
                codedName: "",
                formattedName: "",
              },
              fourth: {
                codedName: "",
                formattedName: "",
              },
            },
          },
        ],
      },
      loadingItems: false,
      loadingMoves: false,
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

    if (this.getMoves.length === 0) {
      this.loadingMoves = true;
      this.fetchMoves().then(() => {
        this.loadingMoves = false;
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
      fetchMoves: "FETCH_MOVES",
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
      this.fetchItem(this.team.pokemon[index].item.codedName).then((res) => {
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
          codedName: "",
          formattedName: "",
        },
        moves: {
          first: {
            codedName: "",
            formattedName: "",
          },
          second: {
            codedName: "",
            formattedName: "",
          },
          third: {
            codedName: "",
            formattedName: "",
          },
          fourth: {
            codedName: "",
            formattedName: "",
          },
        },
      };
    },
    clearItem(index: number) {
      this.team.pokemon[index].item = {
        sprite: "",
        codedName: "",
        formattedName: "",
      };
    },
    clearMove(index: number, move: string) {
      this.team.pokemon[index].moves[move as keyof Moves] = {
        codedName: "",
        formattedName: "",
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
