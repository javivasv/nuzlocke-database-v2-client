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
            <template v-for="(team, index) in filteredTeams()" :key="team._id">
              <v-row
                class="team-row py-5"
                no-gutters
                @click="toEditTeam(team._id)"
              >
                <v-col>
                  <v-row no-gutters>
                    <v-col cols="3">
                      <v-row
                        class="h-100"
                        no-gutters
                        align="center"
                        justify="center"
                      >
                        <span class="table-text">
                          {{ team.name }}
                        </span>
                      </v-row>
                    </v-col>
                    <v-col cols="3">
                      <v-row
                        class="h-100"
                        no-gutters
                        align="center"
                        justify="center"
                      >
                        <span class="table-text">
                          {{ team.vs }}
                        </span>
                      </v-row>
                    </v-col>
                    <v-col cols="6">
                      <v-row
                        class="h-100"
                        no-gutters
                        align="center"
                        justify="center"
                      >
                        <span class="table-text">
                          {{ team.description }}
                        </span>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row no-gutters align="center" justify="center">
                    <template
                      v-for="(pokemon, index) in team.pokemon"
                      :key="index"
                    >
                      <v-col v-if="pokemon.pokemonId !== ''" cols="4">
                        <v-row no-gutters align="center" justify="center">
                          <v-img
                            :src="pokemonData(pokemon.pokemonId, 'sprite')"
                            height="100px"
                          >
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
                          <span class="table-text">
                            {{ pokemonData(pokemon.pokemonId, "nickname") }}
                          </span>
                        </v-row>
                        <v-row
                          v-if="pokemon.item.sprite !== ''"
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
                        <v-row no-gutters align="center" justify="center">
                          <span class="table-text">
                            {{ pokemon.item.name.formattedName }}
                          </span>
                        </v-row>
                      </v-col>
                    </template>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider
                v-if="index + 1 !== filteredTeams().length"
                class="my-3"
              ></v-divider>
            </template>
          </v-col>
        </v-row>
      </template>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { Pokemon, Team } from "../store/interfaces/index";
export default defineComponent({
  name: "TeamsTable",
  components: {},
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
      search: "",
      headers: [
        {
          name: "name",
          text: "Name",
          cols: 3,
        },
        {
          name: "vs",
          text: "Vs",
          cols: 3,
        },
        {
          name: "pokemon",
          text: "Pokemon",
          cols: 6,
        },
      ],
    };
  },
  methods: {
    filteredTeams() {
      let list = this.getNuzlocke.teams.filter((team: Team) => {
        if (this.search !== "" && !team.name.includes(this.search)) {
          return false;
        }

        return true;
      });

      return list;
    },
    pokemonData(pokemonId: string, type: string) {
      let pokemon = this.getNuzlocke.pokemon.find(
        (pokemon: Pokemon) => pokemon._id === pokemonId
      );

      if (pokemon) {
        if (type === "sprite") {
          return pokemon.sprite;
        }

        return pokemon.nickname !== ""
          ? pokemon.nickname
          : pokemon.species.formattedName;
      }

      return "";
    },
    toEditTeam(id: string) {
      this.$router.push({
        name: "edit-team-form",
        params: {
          nuzlockeId: this.$route.params.nuzlockeId,
          teamId: id,
        },
      });
    },
  },
});
</script>

<style>
.team-row {
  cursor: pointer;
}
.team-row:hover {
  background-color: #9e9e9e4d;
}
</style>
