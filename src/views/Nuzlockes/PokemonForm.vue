<template>
  <v-row v-if="getNuzlocke" id="pokemon-form" no-gutters>
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
                class="type-1"
                :class="{
                  'dark-mode': $vuetify.theme.name === 'customDarkTheme',
                }"
                label="Shiny"
                hide-details
                color="secondary"
                density="compact"
                @update:modelValue="pokemonShinyChange()"
              ></v-checkbox>
            </v-row>
            <MultiuseText :text="'Species'" />
            <v-row no-gutters>
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
                      v-model="pokemon.species.codedName"
                      variant="outlined"
                      color="secondary"
                      density="compact"
                      :rules="speciesRules()"
                    ></v-text-field>
                    <v-autocomplete
                      v-else
                      v-model="pokemon.species"
                      variant="outlined"
                      color="secondary"
                      :items="getPokemon"
                      item-title="formattedName"
                      item-value="codedName"
                      return-object
                      density="compact"
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
                    class="type-1"
                    :class="{
                      'dark-mode': $vuetify.theme.name === 'customDarkTheme',
                    }"
                    label="Original species"
                    hide-details
                    color="secondary"
                    density="compact"
                    @update:modelValue="pokemonOriginalReset()"
                  ></v-checkbox>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="mb-5" no-gutters align="center" justify="center">
              <v-col>
                <MultiuseText :text="'First type'" />
                <v-row class="pr-3" no-gutters>
                  <v-select
                    v-model="pokemon.types.first"
                    :items="filteredTypesSelection('first')"
                    item-value="name"
                    item-title="name"
                    hide-details
                    variant="outlined"
                    density="compact"
                  ></v-select>
                </v-row>
              </v-col>
              <v-col>
                <MultiuseText :text="'Second type'" class="pl-3" />
                <v-row class="pl-3" no-gutters>
                  <v-select
                    v-model="pokemon.types.second"
                    :items="filteredTypesSelection('second')"
                    item-value="name"
                    item-title="name"
                    hide-details
                    variant="outlined"
                    clearable
                    density="compact"
                    @click:clear="clearSecondType()"
                  ></v-select>
                </v-row>
              </v-col>
            </v-row>
            <MultiuseText :text="'Ability'" />
            <v-row class="mb-5" no-gutters>
              <v-col cols="9">
                <v-row no-gutters align="center" justify="center">
                  <template v-if="loadingPokemonAbilities">
                    <v-progress-circular
                      color="primary"
                      indeterminate
                    ></v-progress-circular>
                  </template>
                  <template v-else>
                    <v-text-field
                      v-if="pokemon.originalAbility"
                      v-model="pokemon.ability.codedName"
                      variant="outlined"
                      color="secondary"
                      hide-details
                      density="compact"
                    ></v-text-field>
                    <v-autocomplete
                      v-else
                      v-model="pokemon.ability"
                      variant="outlined"
                      color="secondary"
                      :items="getAbilities"
                      item-title="formattedName"
                      item-value="codedName"
                      return-object
                      hide-details
                      clearable
                      density="compact"
                      @click:clear="clearAbility()"
                    ></v-autocomplete>
                  </template>
                </v-row>
              </v-col>
              <v-col cols="3">
                <v-row class="pl-3" no-gutters>
                  <v-checkbox
                    v-model="pokemon.originalAbility"
                    class="type-1"
                    :class="{
                      'dark-mode': $vuetify.theme.name === 'customDarkTheme',
                    }"
                    label="Original ability"
                    hide-details
                    color="secondary"
                    density="compact"
                    @update:modelValue="pokemonAbilityReset()"
                  ></v-checkbox>
                </v-row>
              </v-col>
            </v-row>
            <MultiuseText :text="'Nickname'" />
            <v-row class="mb-5" no-gutters>
              <v-text-field
                v-model="pokemon.nickname"
                variant="outlined"
                color="secondary"
                hide-details
                density="compact"
              ></v-text-field>
            </v-row>
            <MultiuseText :text="'Location'" />
            <v-row no-gutters>
              <v-text-field
                v-model="pokemon.location"
                variant="outlined"
                color="secondary"
                density="compact"
                :rules="locationRules()"
              ></v-text-field>
            </v-row>
            <MultiuseText :text="'Obtained'" />
            <v-row no-gutters>
              <v-select
                v-model="pokemon.obtained"
                variant="outlined"
                color="secondary"
                hide-details=""
                :items="obtained"
                density="compact"
              ></v-select>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import MultiuseText from "@/components/MultiuseText.vue";
import { Pokemon } from "@/interface";
import mixin from "@/mixin";
export default defineComponent({
  name: "PokemonForm",
  mixins: [mixin],
  components: {
    MultiuseText,
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
      loadingPokemonAbilities: false,
      pokemon: {
        originalSpecies: false,
        species: {
          codedName: "",
          formattedName: "",
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
          codedName: "",
          formattedName: "",
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
      this.loadingPokemonAbilities = true;
      this.fetchAbilities().then(() => {
        this.loadingPokemonAbilities = false;
      });
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

      // Set obtained selector value
      this.pokemon.obtained =
        this.obtained.find(
          (option) => option.toLowerCase() === toEditPokemon.obtained
        ) || toEditPokemon.obtained;

      // Set first type selector value
      const firstType =
        this.pokemonTypes.find(
          (type) => type.name.toLowerCase() === toEditPokemon.types.first
        ) || this.pokemonTypes[0];

      this.pokemon.types.first = firstType.name;

      // Set second type selector value
      if (this.pokemon.types.second !== "") {
        const secondType =
          this.pokemonTypes.find(
            (type) => type.name.toLowerCase() === toEditPokemon.types.second
          ) || this.pokemonTypes[0];

        this.pokemon.types.second = secondType.name;
      } else {
        this.pokemon.types.second = "";
      }

      // Fetch to get info about the sprites
      if (!this.pokemon.originalSpecies) {
        this.fetchPokemonData();
      }
    },
    defaultPokemon() {
      if (!this.editMode) {
        this.pokemon.species = {
          codedName: "bulbasaur",
          formattedName: "Bulbasaur",
        };

        this.fetchPokemonData();
      }
    },
    fetchPokemonData() {
      this.loadingPokemonData = true;
      this.fetchPokemon(this.pokemon.species.codedName)
        .then((res) => {
          // Processing of the sprites (normal and shiny)
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

          this.pokemonShinyChange();

          // Set the types of the new pokemon being added
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
    pokemonOriginalReset() {
      this.pokemon.species.codedName = "";
      this.pokemon.species.formattedName = "";
      this.pokemon.sprite = "";
      this.normalSpriteUrl = "";
      this.shinySpriteUrl = "";
      this.shiny = false;
    },
    pokemonAbilityReset() {
      this.pokemon.ability.codedName = "";
      this.pokemon.ability.formattedName = "";
    },
    pokemonShinyChange() {
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
        this.pokemon.species.formattedName = this.pokemon.species.codedName;
      }

      if (this.pokemon.originalAbility) {
        this.pokemon.ability.formattedName = this.pokemon.ability.codedName;
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
    toNuzlocke() {
      this.$router.push({
        name: "nuzlocke",
        params: {
          nuzlockeId: this.$route.params.nuzlockeId,
        },
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
    clearAbility() {
      this.pokemon.ability = {
        codedName: "",
        formattedName: "",
      };
    },
    // Inputs validations
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
  },
});
</script>

<style></style>
