<template>
  <v-row class="py-3" no-gutters align="center" justify="center">
    <v-btn color="secondary" :loading="isLoading" @click="submitPokemon()">
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
          <span class="card-text">
            <strong>Species:</strong>
            The species of the pokemon
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="card-text">
            <strong>Original species:</strong>
            In case of being an original pokemon species or being a species not
            existing in any previous game or region
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="card-text">
            <strong>Type(s):</strong>
            The type(s) of the pokemon
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="card-text">
            <strong>Ability:</strong>
            The ability of the pokemon, if it has one
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="card-text">
            <strong>Original ability:</strong>
            In case of being an original pokemon ability or being an ability not
            existing in any previous game or region
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="card-text">
            <strong>Nickname:</strong>
            The nickname given to the pokemon, if given one
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="card-text">
            <strong>Location:</strong>
            The location in which the pokemon was obtained or encountered
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="card-text">
            <strong>Obtained:</strong>
            The way in which the pokemon was obtained, or if it was obtained
          </span>
        </v-row>
        <v-row class="py-1" no-gutters>
          <span class="card-text">
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
            that have one, have a sprite with the shiny coloration. The pokemon
            data and abilities come from the
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
    :name="pokemonName"
    :show-dialog="showDeleteDialog"
    :is-loading="isLoading"
    @delete="deletePokemon()"
    @close="showDeleteDialog = false"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import DeleteDialog from "@/components/DeleteDialog.vue";
import { Pokemon } from "@/interface";
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
  },
  data() {
    return {
      pokemonName: "",
      showDeleteDialog: false,
      isLoading: false,
    };
  },
  mounted() {
    if (this.getNuzlocke) {
      let toDeletePokemon: Pokemon;
      toDeletePokemon = this.getNuzlocke.pokemon.find(
        (pokemon: Pokemon) => pokemon._id === this.$route.params.pokemonId
      );

      if (toDeletePokemon) {
        this.pokemonName =
          toDeletePokemon.nickname !== ""
            ? toDeletePokemon.nickname
            : toDeletePokemon.species.formattedName;
      }
    }
  },
  methods: {
    ...mapActions("pokemon", {
      deleteExistingPokemon: "DELETE_POKEMON",
    }),
    ...mapActions("nuzlockes", {
      fetchNuzlocke: "FETCH_NUZLOCKE",
    }),
    submitPokemon() {
      this.isLoading = true;
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

      this.isLoading = true;

      this.deleteExistingPokemon(data)
        .then(() => {
          this.fetchNuzlocke(this.$route.params.nuzlockeId).then(() => {
            this.toNuzlocke();
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
});
</script>

<style></style>
