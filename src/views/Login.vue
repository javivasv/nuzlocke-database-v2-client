<template>
  <div
    id="login"
    class="h-100 w-100"
    :style="{
      'background-image': `url(${require('@/assets/login_background.png')})`,
    }"
  >
    <v-row class="h-100 w-100" no-gutters>
      <v-col align-self="center">
        <v-row class="w-100" no-gutters align="center" justify="center">
          <v-card class="login-card pa-6">
            <LoginForm v-if="formType === 0" @changeForm="changeForm" />
            <RegisterForm v-else-if="formType === 1" @changeForm="changeForm" />
            <v-row class="pt-3" no-gutters align="center" justify="center">
              <template v-if="formType === 0">
                <span
                  >Don't have an account?
                  <span class="form-action" @click="changeForm(1)"
                    >Register</span
                  >
                </span>
              </template>
              <template v-else-if="formType === 1">
                <span
                  >Already have an account?
                  <span class="form-action" @click="changeForm(0)"
                    >Login</span
                  ></span
                >
              </template>
              <v-divider class="mx-3" vertical></v-divider>
              <span class="form-action" @click="goHome()"> Go home </span>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTheme } from "vuetify";
import LoginForm from "@/components/Login/LoginForm.vue";
import RegisterForm from "@/components/Login/RegisterForm.vue";
export default defineComponent({
  name: "Login",
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      formType: 0,
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
      if (this.$vuetify.theme.name !== "customDarkTheme") {
        this.changeTheme();
      }
    }
  },
  methods: {
    changeForm(val: number) {
      this.formType = val;
    },
    goHome() {
      this.$router.push({
        name: "home",
      });
    },
    changeTheme() {
      this.toggleTheme();
      window.localStorage.setItem("ndb_theme", this.$vuetify.theme.name);
    },
  },
});
</script>

<style></style>
