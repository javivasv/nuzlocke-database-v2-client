<template>
  <div id="sidebar" class="h-100 w-100">
    <v-card
      class="h-100 w-100 pa-2 sidebar-card"
      :style="{ 'background-image': `url(${background})` }"
    >
      <v-row class="h-100" no-gutters>
        <v-col>
          <v-row class="py-6" no-gutters align="center" justify="center">
            <span>NDB</span>
          </v-row>
          <v-divider class="my-3"></v-divider>
          <template v-for="item in sidebarItems" :key="item.name">
            <v-row
              v-if="
                item.name !== 'nuzlockes' ||
                (item.name === 'nuzlockes' && getUser)
              "
              class="py-4 sidebar-item"
              :class="sidebarActiveItem(item.name)"
              no-gutters
              align="center"
              justify="center"
              v-ripple
              @click="changeView(item.name)"
            >
              <v-icon class="mr-2" :icon="item.icon"></v-icon>
              <span>{{ item.title }}</span>
            </v-row>
          </template>
          <v-row class="pr-3" no-gutters align="center" justify="end">
            <v-flex>
              <v-switch
                v-model="darkTheme"
                :class="{
                  'dark-mode': $vuetify.theme.name === 'customDarkTheme',
                }"
                label="Dark mode"
                color="primary"
                density="compact"
                hide-details
                @change="changeTheme()"
              ></v-switch>
            </v-flex>
          </v-row>
          <v-row
            :class="getUser ? 'empty-space-1' : 'empty-space-2'"
            no-gutters
          ></v-row>
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
import { useTheme } from "vuetify";
export default defineComponent({
  name: "Sidebar",
  computed: {
    ...mapGetters("auth", {
      getUser: "GET_USER",
    }),
  },
  data() {
    return {
      darkTheme: false,
      background: require("../assets/sidebar_background.png"),
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
  setup() {
    const theme = useTheme();

    return {
      theme,
      toggleTheme: () =>
        (theme.global.name.value = theme.global.current.value.dark
          ? "customLightTheme"
          : "customDarkTheme"),
    };
  },
  mounted() {
    const theme = window.localStorage.getItem("ndb_theme");

    if (theme === "customDarkTheme") {
      this.changeTheme();
      this.darkTheme = true;
    }
  },
  methods: {
    ...mapActions("auth", {
      doLogout: "LOGOUT",
    }),
    changeView(view: string) {
      this.$emit("changeView", view);
    },
    login() {
      this.$router.push({
        name: "login",
      });
    },
    logout() {
      this.doLogout();
      this.$router.push({
        name: "home",
      });
    },
    sidebarActiveItem(itemName: string) {
      if (this.$route.name === itemName) {
        return "sidebar-item-active";
      }

      if (
        itemName === "nuzlockes" &&
        this.$route.name !== "home" &&
        this.$route.name !== "about"
      ) {
        return "sidebar-item-active";
      }

      return "";
    },
    changeTheme() {
      this.toggleTheme();
      window.localStorage.setItem("ndb_theme", this.$vuetify.theme.name);
    },
  },
});
</script>

<style></style>
