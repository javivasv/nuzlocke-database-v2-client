<template>
  <v-card-title>
    <v-btn color="secondary" @click="toNewNuzlocke()">New nuzlocke</v-btn>
  </v-card-title>
  <v-divider class="my-3"></v-divider>
  <v-card-subtitle>
    <strong>Relevant websites</strong>
  </v-card-subtitle>
  <v-card-text>
    <v-row no-gutters>
      <v-col>
        <v-row
          v-for="website in websites"
          :key="website.url"
          class="py-1"
          no-gutters
          align="center"
          justify="center"
        >
          <a class="website-link" :href="website.url" target="_blank">
            {{ website.name }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "InfoActionsNuzlockes",
  components: {},
  computed: {},
  data() {
    return {
      websites: [
        {
          name: "Bulbapedia",
          url: "https://bulbapedia.bulbagarden.net/wiki/Main_Page",
        },
        {
          name: "Pokemon Showdown Damage Calculator",
          url: "https://calc.pokemonshowdown.com",
        },
        {
          name: "Serebii",
          url: "https://www.serebii.net/index2.shtml",
        },
      ],
    };
  },
  methods: {
    toNewNuzlocke() {
      this.$router.push({
        name: "new-nuzlocke",
      });
    },
  },
});
</script>

<style>
.website-link {
  text-decoration: none;
  color: #1685c5;
}
</style>
