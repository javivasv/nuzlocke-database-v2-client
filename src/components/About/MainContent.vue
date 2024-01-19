<template>
  <v-row no-gutters>
    <v-card class="pa-4 mb-4 w-100">
      <v-card-title>
        <h2>About</h2>
      </v-card-title>
      <v-card-text>
        My name is Javier Vivas and I am a Computer/Software Engineer graduated
        at Universidad Simón Bolívar in Caracas, Venezuela. I live in the USA
        and currently work as a Frontend Engineer.
      </v-card-text>
      <v-card-text>
        In 2020 I got to know what a nuzlocke is from videos on Youtube. At
        first I did not know how people liked it, but it grew on me over time
        and I really enjoy it now. I have done a couple myself, some finished,
        some lost, but either way, in the end, is very fun to play them. I
        started following some Youtubers and learning and getting better because
        of them.
      </v-card-text>
      <v-card-text>
        As I played, I found uncomfortable to keep track of my nuzlockes. I
        decided to develop an app that would meet my needs as a player and that
        can be as inclusive as possible in terms of different types of games a
        player can play. At first I thought about providing lists of locations
        and encounters based on the games, but that ended up restricting the
        players freedom to play the nuzlocke with the rules they wanted to play
        with. In the end, I decided to let the player type manually some of the
        information in order to make it as free as possible. This gives the
        player the opportunity to keep track of any nuzlocke of any type of
        Pokemon game.
      </v-card-text>
      <v-card-text>
        This is a side project that I made on my free time, however, I would
        appreciate any donation that could be done in order to try and keep the
        site running and updated. You can do so here:
        <a
          class="website-link"
          :href="'https://www.buymeacoffee.com/javivasv'"
          target="_blank"
        >
          Buy Me a Coffee
        </a>
      </v-card-text>
    </v-card>
    <v-card class="pa-4 mb-4 w-100">
      <v-card-text>
        Pokemon sprites, Pokemon names, Pokemon types and Pokemon abilities are
        taken from
        <a
          class="website-link"
          href="https://pokeapi.co/docs/v2"
          target="_blank"
        >
          PokeAPI V2</a
        >, a website dedicated to provide data related to Pokemon games.
      </v-card-text>
      <v-card-text>
        Nuzlocke rules and general information are taken from
        <a
          class="website-link"
          href="https://bulbapedia.bulbagarden.net/wiki/Main_Page"
          target="_blank"
        >
          Bulbapedia</a
        >.
      </v-card-text>
      <v-card-text>
        Login background art was made by
        <a class="website-link" href="https://openai.com/" target="_blank">
          OpenAI</a
        >.
      </v-card-text>
    </v-card>
    <v-card class="pa-4">
      <v-card-text>
        This website/app is a fan-made project and is not affiliated with,
        endorsed, sponsored, or specifically approved by Nintendo, Game Freak,
        or The Pokémon Company. Pokémon and its trademarks are the property of
        Nintendo, Game Freak, and The Pokémon Company.
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AboutMainContent",
});
</script>
