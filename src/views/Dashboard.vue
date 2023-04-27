<template>
  <div id="dashboard" class="h-100">
    <v-row class="h-100" no-gutters>
      <v-col cols="2">
        <v-row class="h-100" no-gutters>
          <Sidebar @changeView="changeView" />
        </v-row>
      </v-col>
      <v-col cols="10">
        <v-row
          class="h-100"
          no-gutters
          style="background-repeat: repeat"
          :style="{
            backgroundImage: `url(${background})`,
          }"
        >
          <router-view />
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "@/components/Sidebar.vue";
export default defineComponent({
  name: "Dashboard",
  components: {
    Sidebar,
  },
  computed: {
    background() {
      let background: string;

      background = require(`@/assets/background_${
        this.$vuetify.theme.name === "customLightTheme" ? "light" : "dark"
      }_transparent.png`);

      return background;
    },
  },
  methods: {
    changeView(view: string) {
      this.$router.push({
        name: view,
      });
    },
  },
});
</script>

<style></style>
