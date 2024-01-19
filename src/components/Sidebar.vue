<template>
  <div id="sidebar" class="h-100 w-100">
    <v-card
      class="h-100 w-100 pa-2 sidebar-card"
      :style="{
        backgroundImage: `url(${background})`,
        'background-position':
          this.$vuetify.theme.name === 'customLightTheme' ? 'right' : 'left',
      }"
    >
      <v-row class="h-100" no-gutters>
        <v-col>
          <div class="sidebar-content-container">
            <div>
              <v-row class="py-6" no-gutters align="center" justify="center">
                <h2>
                  {{ $vuetify.display.lgAndUp ? "Nuzlocke DataBase" : "NDB" }}
                </h2>
              </v-row>
              <template v-if="getUser">
                <v-divider class="my-3"></v-divider>
                <v-row no-gutters align="center" justify="center">
                  <span v-if="$vuetify.display.lgAndUp">
                    {{ getUser.username }}
                  </span>
                  <v-tooltip v-else :text="getUser.username">
                    <template #activator="{ props }">
                      <v-avatar v-bind="props" color="primary">J</v-avatar>
                    </template>
                  </v-tooltip>
                </v-row>
              </template>
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
                  <v-icon
                    :class="$vuetify.display.lgAndUp ? 'mr-2' : ''"
                    :icon="item.icon"
                  ></v-icon>
                  <span v-if="$vuetify.display.lgAndUp">{{ item.title }}</span>
                </v-row>
              </template>
              <v-row
                :class="$vuetify.display.lgAndUp ? 'pr-3' : ''"
                no-gutters
                align="center"
                :justify="$vuetify.display.width ? 'center' : 'end'"
              >
                <div>
                  <v-switch
                    v-model="darkTheme"
                    :class="{
                      'dark-mode': $vuetify.theme.name === 'customDarkTheme',
                    }"
                    :label="$vuetify.display.lgAndUp ? 'Dark mode' : ''"
                    :append-icon="
                      $vuetify.display.lgAndUp || $vuetify.display.width <= 480
                        ? ''
                        : 'dark_mode'
                    "
                    color="primary"
                    density="compact"
                    hide-details
                    @change="changeTheme()"
                  ></v-switch>
                </div>
              </v-row>
              <v-row
                v-if="$vuetify.display.width <= 480"
                no-gutters
                align="center"
                justify="center"
              >
                <v-icon icon="dark_mode" style="opacity: 0.6"></v-icon>
              </v-row>
            </div>
            <div class="empty-space" style="flex-grow: 1"></div>
            <div>
              <v-row class="py-4" no-gutters align="center" justify="center">
                <v-btn v-if="getUser" color="primary" block @click="logout()">
                  <v-icon
                    :class="$vuetify.display.lgAndUp ? 'mr-2' : ''"
                    icon="logout"
                  ></v-icon>
                  <span v-if="$vuetify.display.lgAndUp">Logout</span>
                </v-btn>
                <v-btn v-else color="primary" block @click="login()">
                  <v-icon
                    :class="$vuetify.display.lgAndUp ? 'mr-2' : ''"
                    icon="login"
                  ></v-icon>
                  <span v-if="$vuetify.display.lgAndUp">Login</span>
                </v-btn>
              </v-row>
            </div>
          </div>
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
    background() {
      let background: string;

      background = require(`@/assets/${
        this.$vuetify.theme.name === "customLightTheme"
          ? "sidebar_light"
          : "sidebar_dark"
      }.png`);

      return background;
    },
  },
  data() {
    return {
      darkTheme: false,
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
      this.darkTheme = true;

      if (this.$vuetify.theme.name !== "customDarkTheme") {
        this.changeTheme();
      }
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
