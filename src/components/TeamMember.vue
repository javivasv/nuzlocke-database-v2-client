<template>
  <v-col v-if="member.pokemon.id !== ''" cols="4">
    <v-row
      :style="{
        'margin-top': member.item.name.formattedName === '' ? '37px' : '',
      }"
      no-gutters
      align="center"
      justify="center"
    >
      <v-img
        v-if="!pokemonData(member.pokemon, 'originalSpecies')"
        :src="pokemonData(member.pokemon, 'sprite')"
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
    <v-row
      :style="{
        'margin-top': pokemonData(member.pokemon, 'originalSpecies')
          ? '50px'
          : '',
        'margin-bottom': pokemonData(member.pokemon, 'originalSpecies')
          ? '50px'
          : '',
      }"
      no-gutters
      align="center"
      justify="center"
    >
      <span class="table-text">
        {{ pokemonData(member.pokemon, "nickname") }}
      </span>
    </v-row>
    <v-row
      v-if="member.item.sprite !== ''"
      no-gutters
      align="center"
      justify="center"
    >
      <v-img :src="member.item.sprite" height="50px">
        <template #placeholder>
          <v-row class="h-100" no-gutters align="center" justify="center">
            <v-progress-circular
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-row> </template
      ></v-img>
    </v-row>
    <v-row
      :style="{
        'margin-bottom': member.item.name.formattedName === '' ? '37px' : '',
      }"
      no-gutters
      align="center"
      justify="center"
    >
      <span class="table-text">
        {{ member.item.name.formattedName }}
      </span>
    </v-row>
    <v-row
      v-if="team.members.length > 3 && index < 3"
      class="px-3 my-3"
      no-gutters
    >
      <v-divider></v-divider>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { Pokemon, TeamMemberInfo } from "@/interface";
export default defineComponent({
  name: "TeamMember",
  props: {
    team: {
      type: Object,
      default: () => {
        return {};
      },
    },
    member: {
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
    pokemonData(pokemonData: TeamMemberInfo, type: string) {
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
        } else if (type === "nickname") {
          if (pokemon.nickname !== "") {
            pokemon.nickname;
          }

          if (pokemon.species.codedName === pokemonData.species.codedName) {
            return pokemon.species.formattedName;
          } else {
            return pokemonData.species.formattedName;
          }
        } else {
          return pokemon.originalSpecies;
        }
      }

      return "";
    },
  },
});
</script>

<style></style>
