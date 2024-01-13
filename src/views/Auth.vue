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
          <v-card class="auth-card pa-6">
            <LoginForm v-if="formType === 0" />
            <RegisterForm v-else-if="formType === 1" @changeForm="changeForm" />
            <ForgotPasswordForm
              v-else-if="formType === 2"
              @changeForm="changeForm"
            />
            <ResetPasswordForm
              v-else-if="formType === 3"
              @changeForm="changeForm"
            />
            <v-row
              v-if="formType === 0"
              class="pt-3"
              no-gutters
              align="center"
              justify="center"
            >
              <span class="form-action" @click="changeForm(2)">
                Forgot password
              </span>
            </v-row>
            <v-row class="pt-3" no-gutters align="center" justify="center">
              <span v-if="formType === 0">
                Don't have an account?
                <span class="form-action" @click="changeForm(1)">
                  Register
                </span>
              </span>
              <span v-else>
                <template v-if="formType === 1">
                  Already have an account?
                </template>
                <span class="form-action" @click="changeForm(0)"> Login </span>
              </span>
              <v-divider class="mx-3" vertical></v-divider>
              <span class="form-action" @click="goHome()"> Home </span>
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
import LoginForm from "@/components/Auth/LoginForm.vue";
import RegisterForm from "@/components/Auth/RegisterForm.vue";
import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm.vue";
import ResetPasswordForm from "@/components/Auth/ResetPasswordForm.vue";
export default defineComponent({
  name: "Auth",
  components: {
    LoginForm,
    RegisterForm,
    ForgotPasswordForm,
    ResetPasswordForm,
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

    if (this.$route.name === "reset-password") {
      this.formType = 3;
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
