<template>
  <v-row class="py-3" no-gutters align="center" justify="center">
    <v-btn color="secondary" @click="submitTeam()">
      {{ $route.name === "edit-team-form" ? "Update team" : "Add team" }}
    </v-btn>
  </v-row>
  <v-row
    v-if="$route.name === 'edit-team-form'"
    class="py-3"
    no-gutters
    align="center"
    justify="center"
  >
    <v-btn color="error" variant="outlined" @click="showDeleteDialog = true">
      Delete team
    </v-btn>
  </v-row>
  <v-divider class="my-3"></v-divider>
  <v-card-text>
    <v-row no-gutters>
      <v-col>
        <v-row class="py-1" no-gutters>
          <span class="card-text">
            <strong>Name:</strong>
            The name of the team
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="card-text">
            <strong>Vs:</strong>
            The trainer or pokemon the team is going to be used against
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="card-text">
            <strong>Description:</strong>
            Relevant information of the team, such as strategies
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="card-text">
            <strong>Pokemon:</strong>
            A member of the team. The options depend on the pokemon obtained
            during the playthrough and the current species of the pokemon
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="card-text">
            <strong>Held item:</strong>
            An item to be held by the pokemon during the battle
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="card-text">
            <strong>Moves:</strong>
            The moves the pokemon has during the battle
          </span>
        </v-row>
      </v-col>
    </v-row>
  </v-card-text>
  <v-divider class="my-3"></v-divider>
  <v-card-text>
    <v-row no-gutters>
      <v-col>
        <v-row class="py-1" no-gutters align="center" justify="center">
          <span>
            Not all the items listed have a sprite. The pokemon data, moves and
            items come from the
            <a
              class="website-link"
              href="https://pokeapi.co/docs/v2"
              target="_blank"
              >PokeAPI V2</a
            >
          </span>
        </v-row>
      </v-col>
    </v-row>
  </v-card-text>
  <v-divider class="my-3"></v-divider>
  <v-card-text>
    <v-row no-gutters>
      <v-col>
        <v-row class="py-1" no-gutters align="center" justify="center">
          <span>
            The species of the pokemon selected will be the current one at the
            moment of the team building. In case of needing to update the
            species, the pokemon will have to be selected again
          </span>
        </v-row>
      </v-col>
    </v-row>
  </v-card-text>
  <DeleteDialog
    :name="teamName"
    :show-dialog="showDeleteDialog"
    @delete="deleteTeam()"
    @close="showDeleteDialog = false"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import DeleteDialog from "@/components/DeleteDialog.vue";
import { Team } from "@/interface";
export default defineComponent({
  name: "InfoActionsTeamForm",
  emits: ["submitTeam"],
  components: {
    DeleteDialog,
  },
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlocke: "GET_NUZLOCKE",
    }),
  },
  data() {
    return {
      teamName: "",
      showDeleteDialog: false,
    };
  },
  mounted() {
    if (this.getNuzlocke) {
      let toDeleteTeam: Team;
      toDeleteTeam = this.getNuzlocke.teams.find(
        (team: Team) => team._id === this.$route.params.teamId
      );

      if (toDeleteTeam) {
        this.teamName = toDeleteTeam.name;
      }
    }
  },
  methods: {
    ...mapActions("teams", {
      deleteExistingTeam: "DELETE_TEAM",
    }),
    ...mapActions("nuzlockes", {
      fetchNuzlocke: "FETCH_NUZLOCKE",
    }),
    submitTeam() {
      this.$emit("submitTeam");
    },
    toNuzlocke() {
      this.$router.push({
        name: "nuzlocke",
        params: {
          nuzlockeId: this.$route.params.nuzlockeId,
        },
      });
    },
    deleteTeam() {
      const data = {
        nuzlockeId: this.$route.params.nuzlockeId,
        teamId: this.$route.params.teamId,
      };

      this.deleteExistingTeam(data).then(() => {
        this.fetchNuzlocke(this.$route.params.nuzlockeId).then(() => {
          this.toNuzlocke();
        });
      });
    },
  },
});
</script>

<style></style>
