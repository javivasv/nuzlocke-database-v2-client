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
          :style="{ backgroundImage: `url(${background})` }"
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
  data() {
    return {
      background: require("../assets/pokeball_pattern_opaque.png"),
      backgroundDark: require("../assets/pokeball_pattern_dark_opaque.png"),
    };
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

<style>
.content {
  width: 100%;
}
.table-header {
  color: #ffffff;
  background-color: #1685c5;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.table-text {
  word-break: break-word;
}
</style>
