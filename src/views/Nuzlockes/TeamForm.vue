<template>
  <v-row v-if="getNuzlocke" id="team-form" no-gutters>
    <v-card
      class="thin-scrollbar pa-4 w-100"
      :style="{
        'max-height': $vuetify.display.height - 96 + 'px',
      }"
    >
      <v-form ref="teamForm">
        <v-row no-gutters>
          <v-col>
            <MultiuseText :text="'Name'" />
            <v-row no-gutters>
              <v-text-field
                v-model="team.name"
                variant="outlined"
                color="secondary"
                density="compact"
                :rules="nameRules()"
              ></v-text-field>
            </v-row>
            <MultiuseText :text="'Vs'" />
            <v-row class="mb-5" no-gutters>
              <v-text-field
                v-model="team.vs"
                variant="outlined"
                color="secondary"
                density="compact"
                hide-details
              ></v-text-field>
            </v-row>
            <MultiuseText :text="'Description'" />
            <v-row class="mb-5" no-gutters>
              <v-textarea
                v-model="team.description"
                variant="outlined"
                color="secondary"
                no-resize
                density="compact"
                hide-details
                rows="2"
              ></v-textarea>
            </v-row>
            <v-row no-gutters align="center" justify="center">
              <v-btn
                color="secondary"
                :disabled="team.members.length === 6"
                @click="addTeamMember()"
              >
                Add team member
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
      <v-row no-gutters align="center" justify="center">
        <v-col>
          <template v-for="(member, index) in team.members" :key="index">
            <v-row no-gutters align="center" justify="end">
              <v-btn icon size="x-small" @click="removeTeamMember(index)">
                <v-icon icon="close"></v-icon>
              </v-btn>
            </v-row>
            <v-row no-gutters align="center" justify="center">
              <v-col cols="6">
                <v-row no-gutters align="center" justify="center">
                  <v-col
                    class="pr-3"
                    cols="6"
                    :align-self="
                      member.item.name.codedName !== '' ? 'end' : 'center'
                    "
                  >
                    <v-row
                      v-if="member.pokemon && member.pokemon.sprite !== ''"
                      class="py-2"
                      no-gutters
                      align="center"
                      justify="center"
                    >
                      <v-img :src="member.pokemon.sprite" height="100px">
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
                    <MultiuseText :text="'Pokemon'" />
                    <v-row no-gutters>
                      <v-autocomplete
                        v-model="member.pokemon"
                        :items="filteredPokemon()"
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
                    cols="6"
                    :align-self="member.pokemon ? 'end' : 'center'"
                  >
                    <v-row
                      v-if="member.item && member.item.sprite !== ''"
                      class="py-2"
                      no-gutters
                      align="center"
                      justify="center"
                    >
                      <v-img :src="member.item.sprite" height="50px">
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
                    <MultiuseText
                      :text="'Held item'"
                      :class="
                        member.pokemon && member.pokemon.sprite !== ''
                          ? 'mt-5'
                          : ''
                      "
                    />
                    <v-row no-gutters align="center" justify="center">
                      <v-progress-circular
                        v-if="loadingItems"
                        color="primary"
                        indeterminate
                      ></v-progress-circular>
                      <v-autocomplete
                        v-else
                        v-model="member.item.name"
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
                    <v-col class="pr-3" cols="6" align-self="end">
                      <v-row no-gutters align="center" justify="center">
                        <PokemonType
                          v-if="member.moves.first.type !== ''"
                          :type="member.moves.first.type"
                        />
                        <MoveClass
                          v-if="member.moves.first.class !== ''"
                          :type="member.moves.first.class"
                        />
                      </v-row>
                      <MultiuseText :text="'First move'" />
                      <v-row no-gutters>
                        <v-autocomplete
                          v-model="member.moves.first.name"
                          :items="getMoves"
                          item-value="formattedName"
                          item-title="formattedName"
                          return-object
                          density="compact"
                          hide-details
                          variant="outlined"
                          clearable
                          @click:clear="clearMove(index, 'first')"
                          @update:modelValue="fetchMoveData(index, 'first')"
                        ></v-autocomplete>
                      </v-row>
                    </v-col>
                    <v-col class="pl-3" cols="6" align-self="end">
                      <v-row no-gutters align="center" justify="center">
                        <PokemonType
                          v-if="member.moves.second.type !== ''"
                          :type="member.moves.second.type"
                        />
                        <MoveClass
                          v-if="member.moves.second.class !== ''"
                          :type="member.moves.second.class"
                        />
                      </v-row>
                      <MultiuseText :text="'Second move'" />
                      <v-row no-gutters>
                        <v-autocomplete
                          v-model="member.moves.second.name"
                          :items="getMoves"
                          item-value="formattedName"
                          item-title="formattedName"
                          return-object
                          density="compact"
                          hide-details
                          variant="outlined"
                          clearable
                          @click:clear="clearMove(index, 'second')"
                          @update:modelValue="fetchMoveData(index, 'second')"
                        ></v-autocomplete>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row class="py-2" no-gutters>
                    <v-col class="pr-3" cols="6" align-self="end">
                      <v-row no-gutters align="center" justify="center">
                        <PokemonType
                          v-if="member.moves.third.type !== ''"
                          :type="member.moves.third.type"
                        />
                        <MoveClass
                          v-if="member.moves.third.class !== ''"
                          :type="member.moves.third.class"
                        />
                      </v-row>
                      <MultiuseText :text="'Third move'" />
                      <v-row no-gutters>
                        <v-autocomplete
                          v-model="member.moves.third.name"
                          :items="getMoves"
                          item-value="formattedName"
                          item-title="formattedName"
                          return-object
                          density="compact"
                          hide-details
                          variant="outlined"
                          clearable
                          @click:clear="clearMove(index, 'third')"
                          @update:modelValue="fetchMoveData(index, 'third')"
                        ></v-autocomplete>
                      </v-row>
                    </v-col>
                    <v-col class="pl-3" cols="6" align-self="end">
                      <v-row no-gutters align="center" justify="center">
                        <PokemonType
                          v-if="member.moves.fourth.type !== ''"
                          :type="member.moves.fourth.type"
                        />
                        <MoveClass
                          v-if="member.moves.fourth.class !== ''"
                          :type="member.moves.fourth.class"
                        />
                      </v-row>
                      <MultiuseText :text="'Fourth move'" />
                      <v-row no-gutters>
                        <v-autocomplete
                          v-model="member.moves.fourth.name"
                          :items="getMoves"
                          item-value="formattedName"
                          item-title="formattedName"
                          return-object
                          density="compact"
                          hide-details
                          variant="outlined"
                          clearable
                          @click:clear="clearMove(index, 'fourth')"
                          @update:modelValue="fetchMoveData(index, 'fourth')"
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import MultiuseText from "@/components/MultiuseText.vue";
import PokemonType from "@/components/PokemonType.vue";
import MoveClass from "@/components/MoveClass.vue";
import mixin from "@/mixin";
import { Moves, Pokemon, TeamMember, Team } from "@/interface";
export default defineComponent({
  name: "TeamForm",
  mixins: [mixin],
  components: {
    MultiuseText,
    PokemonType,
    MoveClass,
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
        vs: "",
        description: "",
        members: [] as TeamMember[],
      },
      editMode: false,
      loadingItems: false,
      loadingMoves: false,
    };
  },
  mounted() {
    if (this.$route.name === "edit-team-form") {
      this.editMode = true;
    }

    if (!this.getNuzlocke) {
      this.fetchNuzlocke(this.$route.params.nuzlockeId).then(() => {
        if (this.editMode) {
          this.toEditTeamData();
        }
      });
    } else {
      if (this.editMode) {
        this.toEditTeamData();
      }
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
      fetchMove: "FETCH_MOVE",
    }),
    ...mapActions("teams", {
      addNewTeam: "ADD_TEAM",
      updateExistingTeam: "UPDATE_TEAM",
    }),
    toEditTeamData() {
      let toEditTeam = {
        ...this.getNuzlocke.teams.find(
          (team: Team) => team._id === this.$route.params.teamId
        ),
      };

      delete toEditTeam._id;

      this.team = {
        ...toEditTeam,
      };

      let pokemonList: TeamMember[] = [];
      toEditTeam.members.forEach((member: TeamMember) => {
        let teamPokemon = null;

        if (member.pokemon && member.pokemon.id !== "") {
          teamPokemon = {
            ...this.getNuzlocke.pokemon.find(
              (item: Pokemon) =>
                member.pokemon && item._id === member.pokemon.id
            ),
          };

          if (
            teamPokemon.species.codedName !== member.pokemon.species.codedName
          ) {
            teamPokemon.sprite = member.pokemon.sprite;
            teamPokemon.species = member.pokemon.species;
          }
        }

        pokemonList.push({
          pokemon: teamPokemon,
          item: {
            ...member.item,
          },
          moves: {
            ...member.moves,
          },
        });
      });

      this.team = {
        ...toEditTeam,
        pokemon: [...pokemonList],
      };
    },
    filteredPokemon() {
      let pokemonList = [...this.getNuzlocke.pokemon];

      this.team.members.forEach((teamMember) => {
        if (teamMember.pokemon) {
          const pokemon = pokemonList.find(
            (pokemonObject) =>
              teamMember.pokemon &&
              (pokemonObject._id === teamMember.pokemon._id ||
                pokemonObject._id === teamMember.pokemon.id)
          );

          const indexOfPokemon = pokemonList.indexOf(pokemon);
          pokemonList.splice(indexOfPokemon, 1);
        }
      });

      return pokemonList;
    },
    fetchItemData(index: number) {
      if (!this.team.members[index].item.name) {
        return;
      }

      this.fetchItem(this.team.members[index].item.name.codedName).then(
        (res) => {
          this.team.members[index].item.sprite = res.sprites.default
            ? res.sprites.default
            : "";
        }
      );
    },
    fetchMoveData(index: number, move: string) {
      if (!this.team.members[index].moves[move as keyof Moves].name) {
        return;
      }

      this.fetchMove(
        this.team.members[index].moves[move as keyof Moves].name.codedName
      ).then((res) => {
        this.team.members[index].moves[move as keyof Moves].type =
          res.type.name;

        this.team.members[index].moves[move as keyof Moves].class =
          res.damage_class.name;
      });
    },
    addTeamMember() {
      const teamMember: TeamMember = {
        pokemon: null,
        item: {
          name: {
            codedName: "",
            formattedName: "",
          },
          sprite: "",
        },
        moves: {
          first: {
            name: {
              codedName: "",
              formattedName: "",
            },
            class: "",
            type: "",
          },
          second: {
            name: {
              codedName: "",
              formattedName: "",
            },
            class: "",
            type: "",
          },
          third: {
            name: {
              codedName: "",
              formattedName: "",
            },
            class: "",
            type: "",
          },
          fourth: {
            name: {
              codedName: "",
              formattedName: "",
            },
            class: "",
            type: "",
          },
        },
      };

      this.team.members.push(teamMember);
    },
    removeTeamMember(index: number) {
      this.team.members.splice(index, 1);
    },
    clearPokemon(index: number) {
      this.team.members[index].pokemon = null;
    },
    clearItem(index: number) {
      this.team.members[index].item = {
        name: {
          codedName: "",
          formattedName: "",
        },
        sprite: "",
      };
    },
    clearMove(index: number, move: string) {
      this.team.members[index].moves[move as keyof Moves] = {
        name: {
          codedName: "",
          formattedName: "",
        },
        class: "",
        type: "",
      };
    },
    async submitTeam() {
      const { valid } = await (
        this.$refs.teamForm as HTMLFormElement
      ).validate();

      if (!valid) {
        return;
      }

      let pokemonList: TeamMember[] = [];

      this.team.members.forEach((member) => {
        let pokemonData = {
          id: member.pokemon
            ? member.pokemon.id
              ? member.pokemon.id
              : member.pokemon._id
            : "",
          sprite: member.pokemon ? member.pokemon.sprite : "",
          species: {
            codedName: member.pokemon ? member.pokemon.species.codedName : "",
            formattedName: member.pokemon
              ? member.pokemon.species.formattedName
              : "",
          },
        };

        pokemonList.push({
          pokemon: pokemonData,
          item: member.item,
          moves: member.moves,
        });
      });

      if (this.editMode) {
        this.updateTeam(pokemonList);
      } else {
        this.addTeam(pokemonList);
      }
    },
    async addTeam(pokemonList: Array<TeamMember>) {
      const data = {
        nuzlockeId: this.$route.params.nuzlockeId,
        team: {
          name: this.team.name,
          vs: this.team.vs,
          description: this.team.description,
          members: pokemonList,
        },
      };

      this.addNewTeam(data).then(() => {
        this.toNuzlocke();
      });
    },
    async updateTeam(pokemonList: Array<TeamMember>) {
      const data = {
        nuzlockeId: this.$route.params.nuzlockeId,
        teamId: this.$route.params.teamId,
        team: {
          name: this.team.name,
          vs: this.team.vs,
          description: this.team.description,
          members: pokemonList,
        },
      };

      this.updateExistingTeam(data).then(() => {
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
    required(value: string, type: string) {
      if (value) return true;
      return `You must enter a ${type}`;
    },
    nameRules() {
      return [(value: string) => this.required(value, "name")];
    },
  },
});
</script>

<style></style>
