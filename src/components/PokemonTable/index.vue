<template>
  <v-row no-gutters>
    <v-col>
      <template v-if="getNuzlocke.pokemon.length === 0">
        <v-row class="py-3" no-gutters align="center" justify="center">
          <h2>There are no pokemon registered yet</h2>
        </v-row>
      </template>
      <template v-else>
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
          <v-menu :close-on-content-click="false" location="left" eager>
            <template #activator="{ props }">
              <v-btn class="ml-3" icon v-bind="props">
                <v-icon icon="settings"></v-icon>
              </v-btn>
            </template>
            <SettingsMenu @updateSetting="updateSetting" />
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
            <v-row no-gutters>
              <v-col
                class="thin-scrollbar"
                :style="{
                  'max-height': $vuetify.display.height - 312 + 'px',
                }"
              >
                <template
                  v-for="(pokemon, index) in filteredPokemon()"
                  :key="pokemon._id"
                >
                  <PokemonRow
                    :pokemon="pokemon"
                    :index="index"
                    :settings="settings"
                    @toEditPokemon="toEditPokemon"
                    @updatePokemonStatus="updatePokemonStatus"
                  />
                  <v-divider
                    v-if="index + 1 !== filteredPokemon().length"
                    class="my-3"
                  ></v-divider>
                </template>
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
import { mapGetters, mapActions } from "vuex";
import FiltersMenu from "@/components/PokemonTable/FiltersMenu.vue";
import SettingsMenu from "@/components/PokemonTable/SettingsMenu.vue";
import PokemonRow from "@/components/PokemonTable/PokemonRow.vue";
import { Pokemon, Filters, Filter } from "@/interface";
export default defineComponent({
  name: "PokemonTable",
  components: {
    FiltersMenu,
    SettingsMenu,
    PokemonRow,
  },
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlocke: "GET_NUZLOCKE",
    }),
  },
  data() {
    return {
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
          name: "ability",
          text: "Ability",
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
      settings: {
        showAsObtained: false,
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
          !pokemon.nickname.toLowerCase().includes(this.search) &&
          !pokemon.species.formattedName.toLowerCase().includes(this.search) &&
          !pokemon.location.toLowerCase().includes(this.search)
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
    updateSetting(val: boolean) {
      this.settings.showAsObtained = val;
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

<style></style>
