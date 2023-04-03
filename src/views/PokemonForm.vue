<template>
  <div v-if="getNuzlocke" id="pokemon-form" class="content">
    <v-row class="h-100 w-100" no-gutters>
      <v-col class="pa-3" cols="8">
        <v-row class="py-3" no-gutters>
          <v-btn icon @click="toNuzlocke()">
            <v-icon icon="arrow_back"></v-icon>
          </v-btn>
        </v-row>
        <v-row no-gutters>
          <v-card class="pa-4 w-100">
            <v-form ref="pokemonForm">
              <v-row no-gutters>
                <v-col>
                  <v-row
                    v-if="loadingPokemonData"
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
                  <template v-else>
                    <v-row v-if="pokemon.sprite !== ''" class="py-1" no-gutters>
                      <v-img :src="pokemon.sprite" height="150px"></v-img>
                    </v-row>
                  </template>
                  <v-row
                    v-if="shinySpriteUrl"
                    class="py-1"
                    style="padding-left: 45%"
                    no-gutters
                  >
                    <v-checkbox
                      v-model="shiny"
                      label="Shiny"
                      hide-details
                      color="secondary"
                      @update:modelValue="pokemonShiny()"
                    ></v-checkbox>
                  </v-row>
                  <v-row
                    class="py-3"
                    no-gutters
                    align="center"
                    justify="center"
                  >
                    <v-col>
                      <v-row class="pr-3" no-gutters>
                        <v-select
                          v-model="pokemon.types.first"
                          :items="filteredTypesSelection('first')"
                          item-value="name"
                          item-title="name"
                          hide-details
                          variant="outlined"
                        ></v-select>
                      </v-row>
                    </v-col>
                    <v-col>
                      <v-row class="pl-3" no-gutters>
                        <v-select
                          v-model="pokemon.types.second"
                          :items="filteredTypesSelection('second')"
                          item-value="name"
                          item-title="name"
                          hide-details
                          variant="outlined"
                          clearable
                          @click:clear.stop="clearSecondType()"
                        ></v-select>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row class="py-1" no-gutters>
                    <v-col cols="9">
                      <v-row no-gutters align="center" justify="center">
                        <template v-if="loadingPokemonList">
                          <v-progress-circular
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                        </template>
                        <template v-else>
                          <v-text-field
                            v-if="pokemon.originalSpecies"
                            v-model="pokemon.species.codedSpecies"
                            placeholder="Species"
                            variant="outlined"
                            color="secondary"
                            :rules="speciesRules()"
                          ></v-text-field>
                          <v-autocomplete
                            v-else
                            v-model="pokemon.species"
                            placeholder="Species"
                            variant="outlined"
                            color="secondary"
                            :items="getPokemon"
                            item-title="formattedSpecies"
                            item-value="codedSpecies"
                            return-object
                            :rules="speciesRules()"
                            @update:modelValue="fetchPokemonData()"
                          ></v-autocomplete>
                        </template>
                      </v-row>
                    </v-col>
                    <v-col cols="3">
                      <v-row class="pl-3" no-gutters>
                        <v-checkbox
                          v-model="pokemon.originalSpecies"
                          label="Original species"
                          hide-details
                          color="secondary"
                          @update:modelValue="pokemonOriginal()"
                        ></v-checkbox>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row class="py-1" no-gutters>
                    <v-col cols="9">
                      <v-row no-gutters>
                        <v-text-field
                          v-if="pokemon.originalAbility"
                          v-model="pokemon.ability.codedSpecies"
                          placeholder="Ability"
                          variant="outlined"
                          color="secondary"
                          hide-details
                        ></v-text-field>
                        <v-autocomplete
                          v-else
                          v-model="pokemon.ability"
                          placeholder="Ability"
                          variant="outlined"
                          color="secondary"
                          :items="formattedAbilities()"
                          item-title="formattedAbility"
                          item-value="codedAbility"
                          return-object
                          hide-details
                          clearable
                          @click:clear="clearAbility()"
                        ></v-autocomplete>
                      </v-row>
                    </v-col>
                    <v-col cols="3">
                      <v-row class="pl-3" no-gutters>
                        <v-checkbox
                          v-model="pokemon.originalAbility"
                          label="Original ability"
                          hide-details
                          color="secondary"
                          @update:modelValue="pokemonAbility()"
                        ></v-checkbox>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row class="py-3" no-gutters>
                    <v-text-field
                      v-model="pokemon.nickname"
                      placeholder="Nickname"
                      variant="outlined"
                      color="secondary"
                      hide-details
                    ></v-text-field>
                  </v-row>
                  <v-row class="py-1" no-gutters>
                    <v-text-field
                      v-model="pokemon.location"
                      placeholder="Location"
                      variant="outlined"
                      color="secondary"
                      :rules="locationRules()"
                    ></v-text-field>
                  </v-row>
                  <v-row class="py-1" no-gutters>
                    <v-select
                      v-model="pokemon.obtained"
                      placeholder="Obtained"
                      variant="outlined"
                      color="secondary"
                      :items="obtained"
                      :rules="obtainedRules()"
                    ></v-select>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-row>
      </v-col>
      <v-col class="pa-3" cols="4">
        <Card :type="'pokemon-form'" @submitPokemon="submitPokemon()" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import Card from "../components/InfoActions/Card.vue";
import { Pokemon, BasicDataFromApi } from "../store/interfaces/index";
import mixin from "../mixin";
export default defineComponent({
  name: "PokemonForm",
  mixins: [mixin],
  components: {
    Card,
  },
  computed: {
    ...mapGetters("pokeapi", {
      getPokemon: "GET_POKEMON",
      getAbilities: "GET_ABILITIES",
    }),
    ...mapGetters("nuzlockes", {
      getNuzlocke: "GET_NUZLOCKE",
    }),
  },
  data() {
    return {
      loadingPokemonList: false,
      loadingPokemonData: false,
      pokemon: {
        originalSpecies: false,
        species: {
          codedSpecies: "",
          formattedSpecies: "",
        },
        nickname: "",
        location: "",
        obtained: "Caught",
        sprite: "",
        fainted: false,
        types: {
          first: "",
          second: "",
        },
        originalAbility: false,
        ability: {
          codedAbility: "",
          formattedAbility: "",
        },
      },
      obtained: ["Caught", "Gifted", "Hatched", "Traded", "Not"],
      normalSpriteUrl: "",
      shinySpriteUrl: "",
      shiny: false,
      editMode: false,
    };
  },
  mounted() {
    if (this.$route.name === "edit-pokemon-form") {
      this.editMode = true;
    }

    if (!this.getNuzlocke) {
      this.fetchNuzlocke(this.$route.params.nuzlockeId).then(() => {
        if (this.editMode) {
          this.toEditPokemonData();
        }
      });
    } else {
      if (this.editMode) {
        this.toEditPokemonData();
      }
    }

    if (this.getPokemon.length === 0) {
      this.loadingPokemonList = true;
      this.fetchPokemonList().then(() => {
        this.loadingPokemonList = false;
        this.defaultPokemon();
      });
    } else {
      this.defaultPokemon();
    }

    if (this.getAbilities.length === 0) {
      this.fetchAbilities().then(() => {
        this.defaultAbility();
      });
    } else {
      this.defaultAbility();
    }
  },
  methods: {
    ...mapActions("pokeapi", {
      fetchPokemonList: "FETCH_POKEMON_LIST",
      fetchPokemon: "FETCH_POKEMON",
      fetchAbilities: "FETCH_ABILITIES",
    }),
    ...mapActions("pokemon", {
      addNewPokemon: "ADD_POKEMON",
      updateExistingPokemon: "UPDATE_POKEMON",
    }),
    ...mapActions("nuzlockes", {
      fetchNuzlocke: "FETCH_NUZLOCKE",
    }),
    toEditPokemonData() {
      let toEditPokemon = {
        ...this.getNuzlocke.pokemon.find(
          (pokemon: Pokemon) => pokemon._id === this.$route.params.pokemonId
        ),
      };

      delete toEditPokemon._id;

      this.pokemon = {
        ...toEditPokemon,
      };

      this.pokemon = {
        ...toEditPokemon,
        species: {
          ...toEditPokemon.species,
        },
        types: {
          ...toEditPokemon.types,
        },
        ability: {
          ...toEditPokemon.ability,
        },
      };

      this.pokemon.obtained =
        this.obtained.find(
          (option) => option.toLowerCase() === toEditPokemon.obtained
        ) || toEditPokemon.obtained;

      const firstType =
        this.pokemonTypes.find(
          (type) => type.name.toLowerCase() === toEditPokemon.types.first
        ) || this.pokemonTypes[0];

      this.pokemon.types.first = firstType.name;

      if (this.pokemon.types.second !== "") {
        const secondType =
          this.pokemonTypes.find(
            (type) => type.name.toLowerCase() === toEditPokemon.types.second
          ) || this.pokemonTypes[0];

        this.pokemon.types.second = secondType.name;
      } else {
        this.pokemon.types.second = "";
      }

      this.fetchPokemonData();
    },
    toNuzlocke() {
      this.$router.push({
        name: "nuzlocke",
        params: {
          nuzlockeId: this.$route.params.nuzlockeId,
        },
      });
    },
    defaultPokemon() {
      if (!this.editMode) {
        this.pokemon.species = {
          codedSpecies: "bulbasaur",
          formattedSpecies: "Bulbasaur",
        };

        this.fetchPokemonData();
      }
    },
    defaultAbility() {
      if (!this.editMode) {
        this.pokemon.ability = {
          codedAbility: "",
          formattedAbility: "",
        };
      }
    },
    fetchPokemonData() {
      this.loadingPokemonData = true;
      this.fetchPokemon(this.pokemon.species.codedSpecies)
        .then((res) => {
          this.normalSpriteUrl = res.sprites.front_default
            ? res.sprites.front_default
            : "";
          this.shinySpriteUrl = res.sprites.front_shiny
            ? res.sprites.front_shiny
            : "";

          if (this.editMode) {
            this.shiny = this.shinySpriteUrl === this.pokemon.sprite;
          }

          if (this.shinySpriteUrl === "") {
            this.shiny = false;
          }

          this.pokemonShiny();

          if (!this.editMode) {
            const firstType =
              this.pokemonTypes.find(
                (type) => type.name.toLowerCase() === res.types[0].type.name
              ) || this.pokemonTypes[0];

            this.pokemon.types.first = firstType.name;

            if (res.types[1]) {
              const secondType =
                this.pokemonTypes.find(
                  (type) => type.name.toLowerCase() === res.types[1].type.name
                ) || this.pokemonTypes[0];

              this.pokemon.types.second = secondType.name;
            } else {
              this.pokemon.types.second = "";
            }
          }
        })
        .finally(() => {
          this.loadingPokemonData = false;
        });
    },
    pokemonOriginal() {
      this.pokemon.species.codedSpecies = "";
      this.pokemon.species.formattedSpecies = "";
      this.pokemon.sprite = "";
      this.normalSpriteUrl = "";
      this.shinySpriteUrl = "";
      this.shiny = false;
    },
    pokemonAbility() {
      this.pokemon.ability.codedAbility = "";
      this.pokemon.ability.formattedAbility = "";
    },
    pokemonShiny() {
      this.pokemon.sprite = this.shiny
        ? this.shinySpriteUrl
        : this.normalSpriteUrl;
    },
    async submitPokemon() {
      const { valid } = await (
        this.$refs.pokemonForm as HTMLFormElement
      ).validate();

      if (!valid) {
        return;
      }

      if (this.pokemon.originalSpecies) {
        this.pokemon.species.formattedSpecies =
          this.pokemon.species.codedSpecies;
      }

      if (this.pokemon.originalAbility) {
        this.pokemon.ability.formattedAbility =
          this.pokemon.ability.codedAbility;
      }

      this.pokemon.obtained = this.pokemon.obtained.toLowerCase();
      this.pokemon.types.first = this.pokemon.types.first.toLowerCase();
      this.pokemon.types.second = this.pokemon.types.second.toLowerCase();

      if (this.editMode) {
        this.updatePokemon();
      } else {
        this.addPokemon();
      }
    },
    async addPokemon() {
      const data = {
        nuzlockeId: this.$route.params.nuzlockeId,
        pokemon: {
          ...this.pokemon,
        },
      };

      this.addNewPokemon(data).then(() => {
        this.toNuzlocke();
      });
    },
    formattedAbilities() {
      return this.getAbilities.map((ability: BasicDataFromApi) => {
        let unformattedAbility = ability.name.split("-");

        unformattedAbility = unformattedAbility.map((word: string) => {
          return word[0] ? word.replace(word[0], word[0].toUpperCase()) : word;
        });

        return {
          codedAbility: ability.name,
          formattedAbility: unformattedAbility.join(" "),
        };
      });
    },
    clearAbility() {
      this.pokemon.ability = {
        codedAbility: "",
        formattedAbility: "",
      };
    },
    async updatePokemon() {
      const data = {
        nuzlockeId: this.$route.params.nuzlockeId,
        pokemonId: this.$route.params.pokemonId,
        pokemon: {
          ...this.pokemon,
        },
      };

      this.updateExistingPokemon(data).then(() => {
        this.toNuzlocke();
      });
    },
    filteredTypesSelection(type: string) {
      if (type === "first") {
        if (this.pokemon.types.second !== "") {
          return this.pokemonTypes.filter(
            (type) => type.name !== this.pokemon.types.second
          );
        }

        return this.pokemonTypes;
      }

      return this.pokemonTypes.filter(
        (type) => type.name !== this.pokemon.types.first
      );
    },
    clearSecondType() {
      this.pokemon.types.second = "";
    },
    required(value: string, type: string) {
      if (value) return true;
      return `You must enter a ${type}`;
    },
    speciesRules() {
      return [(value: string) => this.required(value, "species")];
    },
    locationRules() {
      return [(value: string) => this.required(value, "location")];
    },
    obtainedRules() {
      return [(value: string) => this.required(value, "obtained")];
    },
  },
});
</script>

<style></style>
