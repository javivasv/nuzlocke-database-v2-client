<template>
  <div id="sidebar">
    <v-card
      class="h-100 w-100 pa-2 sidebar-card"
      :style="{ 'background-image': `url(${background})` }"
    >
      <v-row class="h-100" no-gutters>
        <v-col>
          <v-row class="py-6" no-gutters align="center" justify="center">
            <span>PNDB</span>
          </v-row>
          <v-divider class="my-3"></v-divider>
          <v-row
            v-for="item in sidebarItems"
            :key="item.name"
            class="py-4 pl-12 sidebar-item"
            no-gutters
            align="center"
            v-ripple
            @click="changeView(item.name)"
          >
            <v-icon class="mr-2" :icon="item.icon"></v-icon>
            <span>{{ item.title }}</span>
          </v-row>
          <v-row class="py-4" no-gutters align="center" justify="center">
            <v-btn
              v-if="isAuthenticated"
              color="primary"
              block
              @click="logut()"
            >
              <v-icon class="mr-2" icon="logout"></v-icon>
              <span>Logout</span>
            </v-btn>
            <v-btn v-else color="primary" block @click="login()">
              <v-icon class="mr-2" icon="login"></v-icon>
              <span>Login</span>
            </v-btn>
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
      isAuthenticated: true,
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
    login() {
      console.log("LOGIN");
    },
    logout() {
      console.log("LOGOUT");
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
