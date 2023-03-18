<template>
  <div id="sidebar" class="h-100 w-100">
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
          <template v-for="item in sidebarItems" :key="item.name">
            <v-row
              v-if="
                item.name !== 'nuzlockes' ||
                (item.name === 'nuzlockes' && getUser)
              "
              class="py-4 pl-12 sidebar-item"
              no-gutters
              align="center"
              v-ripple
              @click="changeView(item.name)"
            >
              <v-icon class="mr-2" :icon="item.icon"></v-icon>
              <span>{{ item.title }}</span>
            </v-row>
          </template>
          <v-row class="py-4" no-gutters align="center" justify="center">
            <v-btn v-if="getUser" color="primary" block @click="logout()">
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
import { mapGetters, mapActions } from "vuex";
export default defineComponent({
  name: "Sidebar",
  components: {},
  computed: {
    ...mapGetters("auth", {
      getUser: "GET_USER",
    }),
  },
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
    ...mapActions("auth", {
      doLogout: "LOGOUT",
    }),
    changeView(view: string) {
      this.$emit("changeView", view);
    },
    login() {
      this.$router.push("login");
    },
    logout() {
      this.doLogout();
    },
  },
});
</script>

<style>
.sidebar-card {
  background-size: cover !important;
}
.sidebar-item {
  cursor: pointer;
}
</style>
