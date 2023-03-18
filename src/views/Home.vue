<template>
  <div id="home" class="content">
    <v-row class="h-100 w-100" no-gutters>
      <v-col class="pa-3" cols="8">
        <v-card class="pa-4 mb-4 w-100">
          <v-card-title>
            <h2>Welcome to the Pokemon Nuzlocke DataBase!</h2>
          </v-card-title>
          <v-card-text>
            Here you can keep track of all of your pokemon nuzlockes. You will
            be able to register a nuzlocke of a preexisting game, a romhack or a
            completely original game. You will also be able to register every
            pokemon you obtain (or not) during the run, as well as change its
            status (alive or dead), in order to keep it organized and updated.
          </v-card-text>
          <v-card-subtitle>
            <strong>What is a Nuzlocke?</strong>
          </v-card-subtitle>
          <v-card-text>
            A Nuzlocke is a set of rules intended to create a higher level of
            difficulty while playing the Pokémon games. Many challengers feel
            that the rules also serve the purpose of encouraging the use of
            Pokémon the player would not normally choose, and promoting closer
            bonds with the player's Pokémon. The rules are not an in-game
            function, but are self-imposed on the part of the player, and thus
            subject to variation.
          </v-card-text>
        </v-card>
        <v-card class="pa-4">
          <v-card-title>
            <h2>Relevant Nuzlocke Videos</h2>
          </v-card-title>
          <v-row no-gutters>
            <v-carousel v-model="currentVideo">
              <v-carousel-item
                v-for="(video, index) in randomizedVideos"
                :key="video.url"
              >
                <iframe
                  v-if="currentVideo === index"
                  class="video-iframe"
                  :src="`https://www.youtube.com/embed/${video.url}`"
                  :title="video.name"
                  allowfullscreen
                  style="border: none"
                ></iframe>
              </v-carousel-item>
            </v-carousel>
          </v-row>
        </v-card>
      </v-col>
      <v-col class="pa-3" cols="4">
        <v-card class="pa-4 mb-4">
          <v-card-subtitle>
            <strong> Nuzlocke Basic Rules </strong>
          </v-card-subtitle>
          <v-row no-gutters>
            <v-card-text>
              <ul>
                <li>
                  <p>
                    Any Pokémon that faints is considered dead, and must be
                    released or put in the Pokémon Storage System permanently
                    (or may be transferred to another game, as long as the
                    Pokémon is never able to be used again during this run)
                  </p>
                </li>
                <li>
                  <p>
                    The player may only catch the first wild Pokémon encountered
                    in each area, and none else. If the first wild Pokémon
                    encountered faints or flees, there are no second chances. If
                    the first encounter in the area is a double battle, the
                    player is free to choose which of the two wild Pokémon they
                    would like to catch but may only catch one of them. This
                    restriction does not apply to Pokémon able to be captured
                    during static encounters, nor to Shiny Pokémon
                  </p>
                </li>
              </ul>
            </v-card-text>
          </v-row>
        </v-card>
        <v-card class="pa-4">
          <v-card-subtitle>
            <strong>Commonly accepted extra rules</strong>
          </v-card-subtitle>
          <v-card-text>
            <ul>
              <li>
                <p>
                  The two basic rules are not in effect until the player has
                  gained their first Poké Balls and thus the ability to catch
                  Pokémon
                </p>
              </li>
              <li>
                <p>
                  The player must nickname all of their Pokémon, for the sake of
                  forming stronger emotional bonds
                </p>
              </li>
              <li>
                <p>
                  Species/Dupes Clause: The "first wild Pokémon in each area"
                  rule does not apply in an area until a species or evolution
                  line is encountered that has not been caught yet
                </p>
              </li>
              <li>
                <p>
                  Shiny Clause: Shiny Pokémon do not need to be released if they
                  faint
                </p>
              </li>
              <li>
                <p>
                  If the player has no Pokémon that can use a field move that is
                  required to continue the game, they may catch another Pokémon
                  that can learn the required field move. However, this Pokémon
                  cannot be used in battle for any reason, and must be released,
                  permanently put into a PC box, or migrated as soon as it is no
                  longer needed or if the player catches another Pokémon that
                  can use this field move
                </p>
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { Video } from "../store/interfaces/index";
export default defineComponent({
  name: "Home",
  components: {},
  computed: {
    ...mapGetters("videos", {
      getVideos: "GET_VIDEOS",
    }),
    randomizedVideos(): Array<Video> {
      return [...this.getVideos].sort(() => Math.random() - 0.5);
    },
  },
  data() {
    return {
      currentVideo: 0,
    };
  },
});
</script>

<style>
.video-iframe {
  width: 100%;
  height: calc(100% - 50px);
}
</style>
