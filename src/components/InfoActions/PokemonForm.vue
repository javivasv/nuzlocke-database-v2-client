<template>
  <v-row class="py-3" no-gutters align="center" justify="center">
    <v-btn color="secondary" @click="submitPokemon()">
      {{
        $route.name === "edit-pokemon-form" ? "Update pokemon" : "Add pokemon"
      }}
    </v-btn>
  </v-row>
  <v-row
    v-if="$route.name === 'edit-pokemon-form'"
    class="py-3"
    no-gutters
    align="center"
    justify="center"
  >
    <v-btn color="error" variant="outlined" @click="showDeleteDialog = true">
      Delete pokemon
    </v-btn>
  </v-row>
  <v-divider class="my-3"></v-divider>
  <v-card-text>
    <v-row no-gutters>
      <v-col>
        <v-row class="py-1" no-gutters>
          <span class="pokemon-form-info">
            <strong>Species:</strong>
            The species of the pokemon
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="pokemon-form-info">
            <strong>Original species:</strong>
            In case of being an original pokemon species or being a species not
            existing in any previous game or region
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="pokemon-form-info">
            <strong>Ability:</strong>
            The ability of the pokemon, if it has one
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="pokemon-form-info">
            <strong>Original ability:</strong>
            In case of being an original pokemon ability or being an ability not
            existing in any previous game or region
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="pokemon-form-info">
            <strong>Nickname:</strong>
            The nickname given to the pokemon, if given one
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="pokemon-form-info">
            <strong>Location:</strong>
            The location in which the pokemon was obtained or encountered
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="pokemon-form-info">
            <strong>Obtained:</strong>
            The way in which the pokemon was obtained, or if it was obtained
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="pokemon-form-info">
            <strong>Shiny:</strong>
            The species sprite is shown with the shiny coloration, if there is
            one
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
            Not all the pokemon listed have a sprite and not all the pokemon
            that have one, have a sprite with the shiny coloration. This data
            comes from the
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
  <DeleteDialog
    :name="pokemon"
    :show-dialog="showDeleteDialog"
    @delete="deletePokemon()"
    @close="showDeleteDialog = false"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import DeleteDialog from "../DeleteDialog.vue";
import { Pokemon } from "../../store/interfaces/index";
export default defineComponent({
  name: "InfoActionsPokemonForm",
  emits: ["submitPokemon"],
  components: {
    DeleteDialog,
  },
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlocke: "GET_NUZLOCKE",
    }),
    pokemon() {
      if (this.getNuzlocke) {
        const toDeletePokemon = this.getNuzlocke.pokemon.find(
          (pokemon: Pokemon) => pokemon._id === this.$route.params.pokemonId
        );

        if (toDeletePokemon) {
          return toDeletePokemon.nickname !== ""
            ? toDeletePokemon.nickname
            : toDeletePokemon.species.formattedName;
        }
      }

      return "";
    },
  },
  data() {
    return {
      showDeleteDialog: false,
    };
  },
  methods: {
    ...mapActions("pokemon", {
      deleteExistingPokemon: "DELETE_POKEMON",
    }),
    ...mapActions("nuzlockes", {
      fetchNuzlocke: "FETCH_NUZLOCKE",
    }),
    submitPokemon() {
      this.$emit("submitPokemon");
    },
    toNuzlocke() {
      this.$router.push({
        name: "nuzlocke",
        params: {
          nuzlockeId: this.$route.params.nuzlockeId,
        },
      });
    },
    deletePokemon() {
      const data = {
        nuzlockeId: this.$route.params.nuzlockeId,
        pokemonId: this.$route.params.pokemonId,
      };

      this.deleteExistingPokemon(data).then(() => {
        this.fetchNuzlocke(this.$route.params.nuzlockeId).then(() => {
          this.toNuzlocke();
        });
      });
    },
  },
});
</script>

<style>
.pokemon-form-info {
  text-align: start;
}
</style>
