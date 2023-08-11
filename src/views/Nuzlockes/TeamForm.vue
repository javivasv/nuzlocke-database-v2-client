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
            <TeamFormMember
              :member="member"
              :index="index"
              :filtered-pokemon="filteredPokemon"
              :loading-items="loadingItems"
              :loading-moves="loadingMoves"
              @updatePokemon="updatePokemon"
              @clearPokemon="clearPokemon"
              @removeTeamMember="removeTeamMember"
              @fetchItemData="fetchItemData"
              @clearItem="clearItem"
              @fetchMoveData="fetchMoveData"
              @clearMove="clearMove"
            />
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
import TeamFormMember from "@/components/TeamFormMember.vue";
import MultiuseText from "@/components/MultiuseText.vue";
import mixin from "@/mixin";
import { Moves, Pokemon, TeamMember, Team } from "@/interface";
export default defineComponent({
  name: "TeamForm",
  mixins: [mixin],
  components: {
    TeamFormMember,
    MultiuseText,
  },
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlocke: "GET_NUZLOCKE",
    }),
    ...mapGetters("pokeapi", {
      getItems: "GET_ITEMS",
      getMoves: "GET_MOVES",
    }),
    filteredPokemon(): Array<Pokemon> {
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
    updatePokemon({ index, pokemon }: { index: number; pokemon: Pokemon }) {
      this.team.members[index].pokemon = pokemon;
    },
    clearPokemon(index: number) {
      this.team.members[index].pokemon = null;
    },
    removeTeamMember(index: number) {
      this.team.members.splice(index, 1);
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
    clearItem(index: number) {
      this.team.members[index].item = {
        name: {
          codedName: "",
          formattedName: "",
        },
        sprite: "",
      };
    },
    fetchMoveData({ index, move }: { index: number; move: string }) {
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
    clearMove({ index, move }: { index: number; move: string }) {
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
