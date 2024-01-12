<template>
  <div id="about" class="content">
    <v-row class="h-100 w-100" no-gutters>
      <v-col class="pa-3" cols="8">
        <v-card class="pa-4 mb-4 w-100">
          <v-card-title>
            <h2>About</h2>
          </v-card-title>
          <v-card-text>
            My name is Javier Vivas and I am a Computer/Software Engineer
            graduated at Universidad Simón Bolívar in Caracas, Venezuela. I live
            in the USA and currently work as a Frontend Engineer.
          </v-card-text>
          <v-card-text>
            In 2020 I got to know what a nuzlocke is from videos on Youtube. At
            first I did not know how people liked it, but it grew on me over
            time and I really enjoy it now. I have done a couple myself, some
            finished, some lost, but either way, in the end, is very fun to play
            them. I started following some Youtubers and learning and getting
            better because of them.
          </v-card-text>
          <v-card-text>
            As I played, I found uncomfortable to keep track of my nuzlockes. I
            decided to develop an app that would meet my needs as a player and
            that can be as inclusive as possible in terms of different types of
            games a player can play. At first I thought about providing lists of
            locations and encounters based on the games, but that ended up
            restricting the players freedom to play the nuzlocke with the rules
            they wanted to play with. In the end, I decided to let the player
            type manually some of the information in order to make it as free as
            possible. This gives the player the opportunity to keep track of any
            nuzlocke of any type of Pokemon game.
          </v-card-text>
        </v-card>
        <v-card class="pa-4 mb-4 w-100">
          <v-card-text>
            Pokemon sprites, Pokemon names, Pokemon types and Pokemon abilities
            are taken from
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
        </v-card>
        <v-card class="pa-4">
          <v-card-text>
            This website/app is a fan-made project and is not affiliated with,
            endorsed, sponsored, or specifically approved by Nintendo, Game
            Freak, or The Pokémon Company. Pokémon and its trademarks are the
            property of Nintendo, Game Freak, and The Pokémon Company.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="pa-3" cols="4">
        <v-card class="pa-4 mb-4">
          <MultiuseText :text="'Feedback'" :justify="'center'" />
          <v-row no-gutters>
            <v-form ref="suggestionForm" class="w-100" @submit.prevent="send()">
              <v-row no-gutters>
                <v-col>
                  <MultiuseText :text="'Name'" />
                  <v-row class="mb-5" no-gutters>
                    <v-text-field
                      v-model="suggestion.name"
                      variant="outlined"
                      hide-details
                      color="secondary"
                      density="compact"
                    >
                    </v-text-field>
                  </v-row>
                  <MultiuseText :text="'Suggestions'" />
                  <v-row no-gutters>
                    <v-textarea
                      v-model="suggestion.text"
                      variant="outlined"
                      hide-details
                      color="secondary"
                      density="compact"
                      no-resize
                      rows="5"
                    ></v-textarea>
                  </v-row>
                  <v-row
                    class="py-3"
                    no-gutters
                    align="center"
                    justify="center"
                  >
                    <v-btn color="secondary" type="submit" :loading="isLoading">
                      Send
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-row>
        </v-card>
        <v-card class="pa-4">
          <MultiuseText :text="'Contact'" :justify="'center'" />
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
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import MultiuseText from "@/components/MultiuseText.vue";
export default defineComponent({
  name: "About",
  components: {
    MultiuseText,
  },
  data() {
    return {
      suggestion: {
        name: "",
        text: "",
      },
      isLoading: false,
      websites: [
        {
          name: "Personal website",
          url: "https://javivasv.com/",
        },
        {
          name: "Github",
          url: "https://github.com/javivasv",
        },
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/javier-vivas-veliz/",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", {
      getUser: "GET_USER",
    }),
  },
  methods: {
    ...mapActions("suggestions", {
      sendSuggestion: "SEND_SUGGESTION",
    }),
    async send() {
      if (this.suggestion.text === "") {
        return;
      }

      this.isLoading = true;

      const data = {
        ...this.suggestion,
        email: this.getUser ? this.getUser.email : null,
        username: this.getUser ? this.getUser.username : null,
      };

      this.sendSuggestion(data)
        .then(() => {
          this.suggestion.name = "";
          this.suggestion.text = "";
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
});
</script>
