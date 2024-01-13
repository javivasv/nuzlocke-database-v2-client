<template>
  <v-row no-gutters>
    <v-form ref="loginForm" class="w-100" @submit.prevent="login()">
      <v-row no-gutters>
        <v-col>
          <MultiuseText :text="'Email'" />
          <v-row no-gutters>
            <v-text-field
              v-model="userData.email"
              variant="outlined"
              color="secondary"
              density="compact"
              :rules="emailRules"
            ></v-text-field>
          </v-row>
          <MultiuseText :text="'Password'" />
          <v-row no-gutters>
            <v-text-field
              v-model="userData.password"
              variant="outlined"
              type="password"
              color="secondary"
              density="compact"
              :rules="passwordRules"
            ></v-text-field>
          </v-row>
          <v-row class="py-3" no-gutters align="center" justify="center">
            <v-btn color="primary" type="submit">Login</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import MultiuseText from "@/components/MultiuseText.vue";
export default defineComponent({
  name: "LoginForm",
  components: {
    MultiuseText,
  },
  data() {
    return {
      userData: {
        email: "",
        password: "",
      },
      emailRules: [
        (value: string) => this.required(value, "email"),
        (value: string) => this.validEmail(value),
      ],
      usernameRules: [(value: string) => this.required(value, "username")],
      passwordRules: [(value: string) => this.required(value, "password")],
      passwordConfirmationRules: [
        (value: string) => this.required(value, "password"),
        (value: string) => this.passwordMatch(value),
      ],
    };
  },
  methods: {
    ...mapActions("auth", {
      doLogin: "LOGIN",
    }),
    async login() {
      const { valid } = await (
        this.$refs.loginForm as HTMLFormElement
      ).validate();

      if (!valid) {
        return;
      }

      this.doLogin(this.userData).then(() => {
        this.$router.push({
          name: "home",
        });
      });
    },
    required(value: string, type: string) {
      if (value) return true;
      return `You must enter ${type === "email" ? "an" : "a"} ${type}`;
    },
    validEmail(value: string) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      if (emailRegex.test(value)) return true;
      return `You must enter a valid email`;
    },
  },
});
</script>

<style></style>
