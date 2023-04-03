<template>
  <v-row class="py-3" no-gutters align="center" justify="center">
    <v-text-field
      v-model="search"
      prepend-inner-icon="search"
      placeholder="Search"
      hide-details
      variant="outlined"
      color="secondary"
      density="compact"
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
        <v-col v-for="header in headers" :key="header.name" :cols="header.cols">
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
        <v-row no-gutters>
          <v-col
            style="overflow: auto"
            :style="{
              'max-height': $vuetify.display.height - 304 + 'px',
            }"
          >
            <v-row
              v-for="pokemon in filteredPokemon()"
              :key="pokemon._id"
              :class="{
                'py-3': pokemon.sprite !== 0,
                'py-5': pokemon.sprite === 0,
                'pokemon-row': !pokemon.fainted,
                'fainted-pokemon-row': pokemon.fainted,
              }"
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
                  <template v-for="type in pokemon.types" :key="type">
                    <PokemonType v-if="type !== ''" :type="type" />
                  </template>
                </v-row>
              </v-col>
              <v-col cols="2">
                <v-row class="h-100" no-gutters align="center" justify="center">
                  <span class="table-text">
                    {{ pokemon.nickname !== "" ? pokemon.nickname : "-" }}
                  </span>
                </v-row>
              </v-col>
              <v-col cols="2">
                <v-row class="h-100" no-gutters align="center" justify="center">
                  <span class="table-text">
                    {{ pokemon.species.formattedSpecies }}
                  </span>
                </v-row>
              </v-col>
              <v-col cols="2">
                <v-row class="h-100" no-gutters align="center" justify="center">
                  <span class="table-text">
                    {{ pokemon.location }}
                  </span>
                </v-row>
              </v-col>
              <v-col cols="2">
                <v-row class="h-100" no-gutters align="center" justify="center">
                  <v-icon :icon="obtainedIcon(pokemon.obtained)"></v-icon>
                </v-row>
              </v-col>
              <v-col cols="2">
                <v-row class="h-100" no-gutters align="center" justify="center">
                  <v-hover v-if="pokemon.obtained !== 'not'">
                    <template #default="{ isHovering, props }">
                      <v-btn icon @click.stop="updatePokemonStatus(pokemon)">
                        <v-icon
                          v-if="isHovering"
                          :icon="!pokemon.fainted ? 'heart_broken' : 'favorite'"
                          v-bind="props"
                        ></v-icon>
                        <v-icon
                          v-else
                          :icon="pokemon.fainted ? 'heart_broken' : 'favorite'"
                          v-bind="props"
                        ></v-icon>
                      </v-btn>
                    </template>
                  </v-hover>
                  <span v-else>-</span>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import FiltersMenu from "../components/FiltersMenu.vue";
import PokemonType from "../components/PokemonType.vue";
import { Pokemon, Filters, Filter } from "../store/interfaces/index";
export default defineComponent({
  name: "Nuzlocke",
  components: {
    FiltersMenu,
    PokemonType,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlocke: "GET_NUZLOCKE",
    }),
  },
  data() {
    return {
      tab: 0,
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
        status: [],
        obtained: [],
        type: [],
      },
    };
  },
  methods: {
    ...mapActions("nuzlockes", {
      fetchNuzlocke: "FETCH_NUZLOCKE",
    }),
    ...mapActions("pokemon", {
      updateExistingPokemon: "UPDATE_POKEMON",
    }),
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

        const statusFilters: string[] = this.filters.status;
        if (statusFilters.length > 0) {
          if (!pokemon.fainted && !statusFilters.includes("alive")) {
            return false;
          }

          if (pokemon.fainted && !statusFilters.includes("fainted")) {
            return false;
          }
        }

        const obtainedFilters: string[] = this.filters.obtained;
        if (
          obtainedFilters.length > 0 &&
          !obtainedFilters.includes(pokemon.obtained)
        ) {
          return false;
        }

        const typeFilters: string[] = this.filters.type;
        if (
          typeFilters.length > 0 &&
          !typeFilters.includes(pokemon.types.first)
        ) {
          if (pokemon.types.second === "") {
            return false;
          }

          if (!typeFilters.includes(pokemon.types.second)) {
            return false;
          }
        }

        return true;
      });

      return list;
    },
    updateFilter(filter: Filter) {
      let filterList: string[] = this.filters[filter.type as keyof Filters];
      let index = filterList.indexOf(filter.value);

      if (index === -1) {
        filterList.push(filter.value);
      } else {
        filterList.splice(index, 1);
      }
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
    updatePokemonStatus(pokemon: Pokemon) {
      const data = {
        nuzlockeId: this.$route.params.nuzlockeId,
        pokemonId: pokemon._id,
        pokemon: {
          fainted: !pokemon.fainted,
        },
      };

      this.updateExistingPokemon(data);
    },
  },
});
</script>

<style>
.pokemon-row,
.fainted-pokemon-row {
  cursor: pointer;
}
.pokemon-row:hover {
  background-color: #9e9e9e4d;
}
.fainted-pokemon-row {
  background-color: #b000201a;
}
.fainted-pokemon-row:hover {
  background-color: #b0002033;
}
</style>
