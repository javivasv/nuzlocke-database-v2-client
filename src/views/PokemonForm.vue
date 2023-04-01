<template>
  <div id="pokemon-form" class="content">
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
                  <v-row v-if="pokemon.sprite !== ''" class="py-1" no-gutters>
                    <v-img :src="pokemon.sprite" height="150px"></v-img>
                  </v-row>
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
                  <v-row class="py-1" no-gutters>
                    <v-col cols="9">
                      <v-row no-gutters>
                        <v-text-field
                          v-if="pokemon.original"
                          v-model="pokemon.species.codedSpecies"
                          placeholder="Species"
                          variant="outlined"
                          color="secondary"
                          :rules="speciesRules"
                        ></v-text-field>
                        <v-autocomplete
                          v-else
                          v-model="pokemon.species"
                          placeholder="Species"
                          variant="outlined"
                          color="secondary"
                          :items="formattedSpecies()"
                          item-title="formattedSpecies"
                          item-value="codedSpecies"
                          return-object
                          :rules="speciesRules"
                          @update:modelValue="pokemonSprite()"
                        ></v-autocomplete>
                      </v-row>
                    </v-col>
                    <v-col cols="3">
                      <v-row class="pl-3" no-gutters>
                        <v-checkbox
                          v-model="pokemon.original"
                          label="Original"
                          hide-details
                          color="secondary"
                          @update:modelValue="pokemonOriginal()"
                        ></v-checkbox>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row class="py-1" no-gutters>
                    <v-text-field
                      v-model="pokemon.nickname"
                      placeholder="Nickname"
                      variant="outlined"
                      color="secondary"
                    ></v-text-field>
                  </v-row>
                  <v-row class="py-1" no-gutters>
                    <v-text-field
                      v-model="pokemon.location"
                      placeholder="Location"
                      variant="outlined"
                      color="secondary"
                      :rules="locationRules"
                    ></v-text-field>
                  </v-row>
                  <v-row class="py-1" no-gutters>
                    <v-select
                      v-model="pokemon.obtained"
                      placeholder="Obtained"
                      variant="outlined"
                      color="secondary"
                      :items="obtained"
                      :rules="obtainedRules"
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
import { mapGetters, mapMutations, mapActions } from "vuex";
import Card from "../components/InfoActions/Card.vue";
import { Pokemon, PokemonSpeciesDataFromApi } from "../store/interfaces/index";
export default defineComponent({
  name: "PokemonForm",
  components: {
    Card,
  },
  computed: {
    ...mapGetters("pokeapi", {
      getPokemon: "GET_POKEMON",
    }),
    ...mapGetters("nuzlockes", {
      getNuzlocke: "GET_NUZLOCKE",
    }),
  },
  data() {
    return {
      pokemon: {
        species: {
          codedSpecies: "",
          formattedSpecies: "",
        },
        nickname: "",
        location: "",
        obtained: "Caught",
        original: false,
        sprite: "",
        fainted: false,
      },
      obtained: ["Caught", "Gifted", "Hatched", "Traded", "Not"],
      normalSpriteUrl: "",
      shinySpriteUrl: "",
      shiny: false,
      speciesRules: [(value: string) => this.required(value, "species")],
      locationRules: [(value: string) => this.required(value, "location")],
      obtainedRules: [(value: string) => this.required(value, "obtained")],
      editMode: false,
    };
  },
  mounted() {
    if (!this.getNuzlocke) {
      this.fetchNuzlocke(this.$route.params.nuzlockeId).then(() => {
        this.toEditPokemonData();
      });
    } else {
      this.toEditPokemonData();
    }

    if (this.getPokemon.length === 0) {
      this.fetchPokemonList().then(() => {
        this.defaultPokemon();
      });
    } else {
      this.defaultPokemon();
    }
  },
  methods: {
    ...mapMutations("notifications", {
      setSnackbarText: "SET_SNACKBAR_TEXT",
    }),
    ...mapActions("pokeapi", {
      fetchPokemonList: "FETCH_POKEMON_LIST",
      fetchPokemon: "FETCH_POKEMON",
    }),
    ...mapActions("pokemon", {
      addNewPokemon: "ADD_POKEMON",
      updateExistingPokemon: "UPDATE_POKEMON",
    }),
    ...mapActions("nuzlockes", {
      fetchNuzlocke: "FETCH_NUZLOCKE",
    }),
    toEditPokemonData() {
      if (this.$route.name === "edit-pokemon-form") {
        let toEditPokemon = {
          ...this.getNuzlocke.pokemon.find(
            (pokemon: Pokemon) => pokemon._id === this.$route.params.pokemonId
          ),
        };

        delete toEditPokemon._id;

        this.pokemon = toEditPokemon;
        this.pokemon.obtained =
          this.obtained.find(
            (option) => option.toLowerCase() === toEditPokemon.obtained
          ) || toEditPokemon.obtained;
        this.pokemonSprite();
      }
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

        this.pokemonSprite();
      }
    },
    pokemonSprite() {
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
        })
        .catch(() => {
          this.setSnackbarText("An error occured during the process");
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

      if (this.pokemon.original) {
        this.pokemon.species.formattedSpecies =
          this.pokemon.species.codedSpecies;
      }

      this.pokemon.obtained = this.pokemon.obtained.toLowerCase();

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

      this.addNewPokemon(data)
        .then(() => {
          this.toNuzlocke();
        })
        .catch((error) => {
          this.setSnackbarText(error.data.msg);
        });
    },
    required(value: string, type: string) {
      if (value) return true;
      return `You must enter a ${type}`;
    },
    formattedSpecies() {
      return this.getPokemon.map((pokemon: PokemonSpeciesDataFromApi) => {
        let unformattedSpecies = pokemon.name.split("-");

        unformattedSpecies = unformattedSpecies.map((word: string) => {
          return word.replace(word[0], word[0].toUpperCase());
        });

        return {
          codedSpecies: pokemon.name,
          formattedSpecies: unformattedSpecies.join(" "),
        };
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

      this.updateExistingPokemon(data)
        .then(() => {
          this.toNuzlocke();
        })
        .catch((error) => {
          this.setSnackbarText(error.data.msg);
        });
    },
  },
});
</script>

<style></style>
