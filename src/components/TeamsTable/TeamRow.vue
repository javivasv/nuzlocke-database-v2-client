<template>
  <v-row class="table-row py-5" no-gutters @click="toEditTeam(team._id)">
    <v-col>
      <v-row no-gutters>
        <v-col cols="3">
          <v-row class="h-100" no-gutters align="center" justify="center">
            <span class="table-text">
              {{ team.name !== "" ? team.name : "-" }}
            </span>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-row class="h-100" no-gutters align="center" justify="center">
            <span class="table-text">
              {{ team.vs !== "" ? team.vs : "-" }}
            </span>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row class="h-100" no-gutters align="center" justify="center">
            <span class="table-text">
              {{ team.description !== "" ? team.description : "-" }}
            </span>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="3">
          <v-row class="px-3 my-3" no-gutters>
            <v-divider></v-divider>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-row class="px-3 my-3" no-gutters>
            <v-divider></v-divider>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row class="px-3 my-3" no-gutters>
            <v-divider></v-divider>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters align="center" justify="center">
        <template v-for="(pokemon, index) in team.pokemon" :key="index">
          <v-col v-if="pokemon.pokemon.id !== ''" cols="4">
            <v-row no-gutters align="center" justify="center">
              <v-img
                :src="pokemonData(pokemon.pokemon, 'sprite')"
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
                {{ pokemonData(pokemon.pokemon, "nickname") }}
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
            <v-row
              v-if="
                (index === 0 && team.pokemon[3].pokemon.id !== '') ||
                (index === 1 && team.pokemon[4].pokemon.id !== '') ||
                (index === 2 && team.pokemon[5].pokemon.id !== '')
              "
              class="px-3 my-3"
              no-gutters
            >
              <v-divider></v-divider>
            </v-row>
          </v-col>
        </template>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { Pokemon, TeamPokemonInfo } from "@/interface";
export default defineComponent({
  name: "TeamRow",
  props: {
    team: {
      type: Object,
      default: () => {
        return {};
      },
    },
    index: {
      type: Number,
      default: -1,
    },
  },
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlocke: "GET_NUZLOCKE",
    }),
  },
  methods: {
    pokemonData(pokemonData: TeamPokemonInfo, type: string) {
      let pokemon = this.getNuzlocke.pokemon.find(
        (pokemon: Pokemon) => pokemon._id === pokemonData.id
      );

      if (pokemon) {
        if (type === "sprite") {
          if (pokemon.species.codedName === pokemonData.species.codedName) {
            return pokemon.sprite;
          } else {
            return pokemonData.sprite;
          }
        } else {
          if (pokemon.nickname !== "") {
            pokemon.nickname;
          }

          if (pokemon.species.codedName === pokemonData.species.codedName) {
            return pokemon.species.formattedName;
          } else {
            return pokemonData.species.formattedName;
          }
        }
      }

      return "";
    },
    toEditTeam(id: string) {
      this.$emit("toEditTeam", id);
    },
  },
});
</script>

<style></style>
