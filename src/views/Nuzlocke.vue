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
                <v-row
                  class="mb-3"
                  no-gutters
                  aria-kbdshortcuts="center"
                  justify="center"
                >
                  <v-text-field
                    v-model="search"
                    prepend-inner-icon="search"
                    placeholder="Search"
                    hide-details
                    variant="outlined"
                    color="secondary"
                  ></v-text-field>
                  <v-menu :close-on-content-click="false" location="left" eager>
                    <template #activator="{ props }">
                      <v-btn class="ml-3" icon v-bind="props">
                        <v-icon icon="filter_list"></v-icon>
                      </v-btn>
                    </template>
                    <FiltersMenu @updateFilter="updateFilter" />
                  </v-menu>
                </v-row>
                <v-row no-gutters>
                  <v-col>
                    <v-row class="py-5 table-header" no-gutters>
                      <v-col
                        v-for="header in headers"
                        :key="header.name"
                        :cols="header.cols"
                      >
                        <v-row no-gutters align="center" justify="center">
                          {{ header.text }}
                        </v-row>
                      </v-col>
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
                    <template v-else>
                      <v-row v-if="getNuzlocke" no-gutters>
                        <v-col
                          style="overflow: auto"
                          :style="{
                            'max-height': $vuetify.display.height - 260 + 'px',
                          }"
                        >
                          <v-row
                            v-for="pokemon in filteredPokemon()"
                            :key="pokemon._id"
                            class="pokemon-row"
                            :class="pokemon.sprite === '' ? 'py-5' : 'py-3'"
                            no-gutters
                            @click="toEditPokemon(pokemon._id)"
                          >
                            <v-col cols="2">
                              <v-row
                                v-if="pokemon.sprite !== ''"
                                no-gutters
                                align="center"
                                justify="center"
                              >
                                <v-img :src="pokemon.sprite" height="100px">
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
                              <v-row no-gutters align="center" justify="center">
                                <template
                                  v-for="type in pokemon.types"
                                  :key="type"
                                >
                                  <PokemonType
                                    v-if="type !== ''"
                                    :type="type"
                                  />
                                </template>
                              </v-row>
                            </v-col>
                            <v-col cols="2">
                              <v-row
                                class="h-100"
                                no-gutters
                                align="center"
                                justify="center"
                              >
                                <span class="table-text">
                                  {{
                                    pokemon.nickname !== ""
                                      ? pokemon.nickname
                                      : "-"
                                  }}
                                </span>
                              </v-row>
                            </v-col>
                            <v-col cols="2">
                              <v-row
                                class="h-100"
                                no-gutters
                                align="center"
                                justify="center"
                              >
                                <span class="table-text">
                                  {{ pokemon.species.formattedSpecies }}
                                </span>
                              </v-row>
                            </v-col>
                            <v-col cols="2">
                              <v-row
                                class="h-100"
                                no-gutters
                                align="center"
                                justify="center"
                              >
                                <span class="table-text">
                                  {{ pokemon.location }}
                                </span>
                              </v-row>
                            </v-col>
                            <v-col cols="2">
                              <v-row
                                class="h-100"
                                no-gutters
                                align="center"
                                justify="center"
                              >
                                <v-icon
                                  :icon="obtainedIcon(pokemon.obtained)"
                                ></v-icon>
                              </v-row>
                            </v-col>
                            <v-col cols="2">
                              <v-row
                                class="h-100"
                                no-gutters
                                align="center"
                                justify="center"
                              >
                                <v-icon
                                  v-if="pokemon.obtained !== 'not'"
                                  :icon="
                                    pokemon.fainted
                                      ? 'heart_broken'
                                      : 'favorite'
                                  "
                                ></v-icon>
                                <span v-else>-</span>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </template>
                  </v-col>
                </v-row>
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
import Card from "../components/InfoActions/Card.vue";
import FiltersMenu from "../components/FiltersMenu.vue";
import PokemonType from "../components/PokemonType.vue";
import { Pokemon, Filters } from "../store/interfaces/index";
export default defineComponent({
  name: "Nuzlocke",
  components: {
    Card,
    FiltersMenu,
    PokemonType,
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
      isLoading: false,
      search: "",
      headers: [
        {
          name: "sprite",
          text: "",
          cols: 2,
        },
        {
          name: "nickname",
          text: "Nickname",
          cols: 2,
        },
        {
          name: "species",
          text: "Species",
          cols: 2,
        },
        {
          name: "location",
          text: "Location",
          cols: 2,
        },
        {
          name: "obtained",
          text: "Obtained",
          cols: 2,
        },
        {
          name: "status",
          text: "Status",
          cols: 2,
        },
      ],
      filters: {
        alive: false,
        fainted: false,
        caught: false,
        gifted: false,
        hatched: false,
        traded: false,
        not: false,
      },
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
    filteredPokemon() {
      let list = this.getNuzlocke.pokemon.filter((pokemon: Pokemon) => {
        if (
          this.search !== "" &&
          !pokemon.nickname.includes(this.search) &&
          !pokemon.species.formattedSpecies.includes(this.search) &&
          !pokemon.location.includes(this.search)
        ) {
          return false;
        }

        if (
          (this.filters.alive && !this.filters.fainted && pokemon.fainted) ||
          (this.filters.fainted && !this.filters.alive && !pokemon.fainted)
        ) {
          return false;
        }

        if (
          ((this.filters.caught && pokemon.obtained !== "caught") ||
            (this.filters.gifted && pokemon.obtained !== "gifted") ||
            (this.filters.hatched && pokemon.obtained !== "hatched") ||
            (this.filters.traded && pokemon.obtained !== "traded") ||
            (this.filters.not && pokemon.obtained !== "not")) &&
          !this.filters[pokemon.obtained as keyof Filters]
        ) {
          return false;
        }

        return true;
      });

      return list;
    },
    updateFilter(filter: string) {
      this.filters[filter as keyof Filters] =
        !this.filters[filter as keyof Filters];
    },
    obtainedIcon(obtained: string) {
      if (obtained === "caught") {
        return "catching_pokemon";
      } else if (obtained === "gifted") {
        return "card_giftcard";
      } else if (obtained === "hatched") {
        return "egg";
      } else if (obtained === "traded") {
        return "sync_alt";
      } else {
        return "block";
      }
    },
    toEditPokemon(id: string) {
      this.$router.push({
        name: "edit-pokemon-form",
        params: {
          nuzlockeId: this.$route.params.nuzlockeId,
          pokemonId: id,
        },
      });
    },
  },
});
</script>

<style>
.pokemon-row {
  cursor: pointer;
}
.pokemon-row:hover {
  background-color: #9e9e9e4d;
}
</style>
