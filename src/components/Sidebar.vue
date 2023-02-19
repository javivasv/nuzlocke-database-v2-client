<template>
  <div id="sidebar">
    <v-card
      class="h-100 w-100 pa-2 sidebar-card"
      :style="{ 'background-image': `url(${background})` }"
    >
      <v-row no-gutters>
        <v-col>
          <v-row class="py-6" no-gutters align="center" justify="center">
            <span>PNDB</span>
          </v-row>
          <v-divider class="my-3"></v-divider>
          <v-row
            v-for="item in sidebarItems"
            :key="item.name"
            class="py-4 pl-12 sidebar-item"
            align="center"
            no-gutters
            v-ripple
            @click="changeView(item.name)"
          >
            <v-icon class="mr-2" :icon="item.icon"></v-icon>
            <span>{{ item.title }}</span>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Sidebar",
  components: {},
  data() {
    return {
      background: require("../assets/sidebar-background.png"),
      sidebarItems: [
        {
          title: "Home",
          name: "home",
          icon: "home",
        },
        {
          title: "Nuzlockes",
          name: "nuzlockes",
          icon: "list",
        },
        {
          title: "About",
          name: "about",
          icon: "info_outline",
        },
      ],
    };
  },
  methods: {
    changeView(view: string) {
      this.$emit("changeView", view);
    },
  },
});
</script>

<style>
#sidebar {
  height: 100%;
  width: 100%;
}
.sidebar-card {
  background-size: cover !important;
}
.sidebar-item {
  cursor: pointer;
}
</style>
