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
          id="content"
          class="h-100"
          no-gutters
          style="background-repeat: repeat"
          :style="{ backgroundImage: `url(${background})` }"
        >
          <Home v-if="currentView === 'home'" />
          <Nuzlockes v-if="currentView === 'nuzlockes'" />
          <About v-if="currentView === 'about'" />
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Home from "@/views/Home.vue";
import Nuzlockes from "@/views/Nuzlockes.vue";
import About from "@/views/About.vue";

export default defineComponent({
  name: "Dashboard",
  components: {
    Sidebar,
    Home,
    Nuzlockes,
    About,
  },
  data() {
    return {
      currentView: "home",
      background: require("../assets/pokeball_pattern_opaque.png"),
      backgroundDark: require("../assets/pokeball_pattern_dark_opaque.png"),
    };
  },
  methods: {
    changeView(view: string) {
      this.currentView = view;
    },
  },
});
</script>

<style></style>
