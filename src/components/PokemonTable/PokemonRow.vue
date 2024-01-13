<template>
  <v-row
    :class="{
      'py-3': settings.showAsObtained
        ? pokemon.obtainedAs.sprite !== ''
        : pokemon.sprite !== '',
      'py-5': settings.showAsObtained
        ? pokemon.obtainedAs.sprite === ''
        : pokemon.sprite === '',
      'table-row': !pokemon.fainted,
      'fainted-pokemon-row': pokemon.fainted,
    }"
    no-gutters
    @click="toEditPokemon(pokemon._id)"
  >
    <v-col cols="2">
      <v-row
        v-if="
          settings.showAsObtained
            ? pokemon.obtainedAs.sprite !== ''
            : pokemon.sprite !== ''
        "
        no-gutters
        align="center"
        justify="center"
      >
        <v-img
          :src="
            settings.showAsObtained ? pokemon.obtainedAs.sprite : pokemon.sprite
          "
          height="100px"
        >
          <template #placeholder>
            <v-row class="h-100" no-gutters align="center" justify="center">
              <v-progress-circular
                color="primary"
                indeterminate
              ></v-progress-circular>
            </v-row> </template
        ></v-img>
      </v-row>
      <v-row no-gutters align="center" justify="center">
        <span>{{
          settings.showAsObtained
            ? pokemon.obtainedAs.species.formattedName
            : pokemon.species.formattedName
        }}</span>
      </v-row>
      <v-row no-gutters align="center" justify="center">
        <template
          v-for="type in settings.showAsObtained
            ? pokemon.obtainedAs.types
            : pokemon.types"
          :key="type"
        >
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
          {{
            settings.showAsObtained
              ? pokemon.obtainedAs.ability.formattedName === ""
                ? "-"
                : pokemon.obtainedAs.ability.formattedName
              : pokemon.ability.formattedName === ""
              ? "-"
              : pokemon.ability.formattedName
          }}
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
            <v-btn
              icon
              :loading="isLoading"
              @click.stop="updatePokemonStatus(pokemon)"
            >
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PokemonType from "@/components/PokemonType.vue";
import { Pokemon } from "@/interface";
export default defineComponent({
  name: "PokemonRow",
  components: {
    PokemonType,
  },
  props: {
    pokemon: {
      type: Object,
      default: () => {
        return {};
      },
    },
    index: {
      type: Number,
      default: -1,
    },
    settings: {
      type: Object,
      default: () => {
        return {};
      },
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
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
      if (this.isLoading) return;
      this.$emit("toEditPokemon", id);
    },
    updatePokemonStatus(pokemon: Pokemon) {
      this.$emit("updatePokemonStatus", pokemon);
    },
  },
});
</script>

<style></style>
