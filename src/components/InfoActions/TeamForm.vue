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
          <span class="team-form-info">
            <strong>Name:</strong>
            The name of the team
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="team-form-info">
            <strong>Description:</strong>
            Relevant information of the team, such as who is going to be used
            against
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
            Not all the items listed have a sprite. This data comes from the
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
  <!--
  <DeleteDialog
    :name="pokemon"
    :show-dialog="showDeleteDialog"
    @delete="deletePokemon()"
    @close="showDeleteDialog = false"
  />
  -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
//import DeleteDialog from "../DeleteDialog.vue";
import { Pokemon } from "../../store/interfaces/index";
export default defineComponent({
  name: "InfoActionsTeamForm",
  emits: ["submitTeam"],
  components: {
    //DeleteDialog,
  },
  computed: {},
  data() {
    return {
      showDeleteDialog: false,
    };
  },
  methods: {
    submitTeam() {
      this.$emit("submitTeam");
    },
  },
});
</script>

<style>
.team-form-info {
  text-align: start;
}
</style>
