<template>
  <v-row no-gutters>
    <v-card class="pa-4 mb-4 w-100">
      <v-card-title>
        <h2>Welcome to the Nuzlocke DataBase!</h2>
      </v-card-title>
      <v-card-text>
        Here you can keep track of all of your pokemon nuzlockes. You will be
        able to register a nuzlocke of a preexisting game, a romhack or a
        completely original game. You will also be able to register every
        pokemon you obtain (or not) during the run, as well as change its status
        (alive or fainted), in order to keep it organized and updated.
      </v-card-text>
      <MultiuseText :text="'What is a nuzlocke?'" :justify="'center'" />
      <v-card-text>
        A nuzlocke is a set of rules intended to create a higher level of
        difficulty while playing the Pokémon games. Many challengers feel that
        the rules also serve the purpose of encouraging the use of Pokémon the
        player would not normally choose, and promoting closer bonds with the
        player's Pokémon. The rules are not an in-game function, but are
        self-imposed on the part of the player, and thus subject to variation.
      </v-card-text>
    </v-card>
    <v-card class="pa-4 w-100">
      <v-card-title>
        <h2>Relevant Nuzlocke Videos</h2>
      </v-card-title>
      <v-row no-gutters>
        <v-carousel v-if="randomizedVideos.length > 0" v-model="currentVideo">
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
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import MultiuseText from "@/components/MultiuseText.vue";
import { Video } from "@/interface";
export default defineComponent({
  name: "HomeMainContent",
  components: {
    MultiuseText,
  },
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

<style></style>
