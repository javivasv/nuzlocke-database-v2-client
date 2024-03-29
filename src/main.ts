import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { aliases, md } from "vuetify/iconsets/md";
import mixin from "@/mixin";

// Vuetify
import "vuetify/styles";
import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "@/style/global.less";

const customLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#EE1515",
    secondary: "#1685C5",
    /*
    background: "#FFFFFF",
    surface: "#FFFFFF",
    "primary-darken-1": "#3700B3",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    */
  },
};

const customDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: "#EE1515",
    secondary: "#1685C5",
    /*
    background: "#FFFFFF",
    surface: "#FFFFFF",
    "primary-darken-1": "#3700B3",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    */
  },
};

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "md",
    aliases,
    sets: {
      md,
    },
  },
  theme: {
    defaultTheme: "customLightTheme",
    themes: {
      customLightTheme,
      customDarkTheme,
    },
  },
});

createApp({ extends: App, mixins: [mixin] })
  .use(store)
  .use(router)
  .use(vuetify)
  .mount("#app");
