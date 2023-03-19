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
                          v-model="pokemon.species"
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
                          :items="getPokemon"
                          item-title="name"
                          item-value="name"
                          :return-object="false"
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
        <Card :type="'pokemon-form'" @addPokemon="addPokemon()" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import Card from "../components/InfoActions/Card.vue";
export default defineComponent({
  name: "PokemonForm",
  components: {
    Card,
  },
  computed: {
    ...mapGetters("pokeapi", {
      getPokemon: "GET_POKEMON",
    }),
  },
  data() {
    return {
      pokemon: {
        species: "",
        nickname: "",
        location: "",
        obtained: "caught",
        original: false,
        sprite: "",
        fainted: false,
      },
      obtained: ["caught", "gifted", "hatched", "traded", "not"],
      normalSpriteUrl: "",
      shinySpriteUrl: "",
      shiny: false,
      speciesRules: [(value: string) => this.required(value, "species")],
      locationRules: [(value: string) => this.required(value, "location")],
      obtainedRules: [(value: string) => this.required(value, "obtained")],
    };
  },
  mounted() {
    if (this.getPokemon.length === 0) {
      this.fetchPokemonList();
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
    }),
    toNuzlocke() {
      this.$router.push({
        name: "nuzlocke",
        params: {
          id: this.$route.params.id,
        },
      });
    },
    pokemonSprite() {
      this.fetchPokemon(this.pokemon.species)
        .then((res) => {
          this.normalSpriteUrl = res.sprites.front_default
            ? res.sprites.front_default
            : "";
          this.shinySpriteUrl = res.sprites.front_shiny
            ? res.sprites.front_shiny
            : "";

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
      this.pokemon.species = "";
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
    async addPokemon() {
      const { valid } = await (
        this.$refs.pokemonForm as HTMLFormElement
      ).validate();

      if (!valid) {
        return;
      }

      const data = {
        id: this.$route.params.id,
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
  },
});
</script>

<style></style>
