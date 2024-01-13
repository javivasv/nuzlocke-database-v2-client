<template>
  <v-row no-gutters>
    <v-form ref="registerForm" class="w-100" @submit.prevent="register()">
      <v-row no-gutters>
        <v-col>
          <MultiuseText :text="'Email'" />
          <v-row no-gutters>
            <v-text-field
              v-model="newUserData.email"
              variant="outlined"
              color="secondary"
              density="compact"
              :rules="emailRules"
            ></v-text-field>
          </v-row>
          <MultiuseText :text="'Username'" />
          <v-row no-gutters>
            <v-text-field
              v-model="newUserData.username"
              variant="outlined"
              color="secondary"
              density="compact"
              :rules="usernameRules"
            ></v-text-field>
          </v-row>
          <MultiuseText :text="'Password'" />
          <v-row no-gutters>
            <v-text-field
              v-model="newUserData.password"
              variant="outlined"
              type="password"
              color="secondary"
              density="compact"
              :rules="passwordRules"
            ></v-text-field>
          </v-row>
          <MultiuseText :text="'Password confirmation'" />
          <v-row no-gutters>
            <v-text-field
              v-model="newUserData.passwordConfirmation"
              variant="outlined"
              type="password"
              color="secondary"
              density="compact"
              :rules="passwordConfirmationRules"
            ></v-text-field>
          </v-row>
          <v-row class="py-3" no-gutters align="center" justify="center">
            <v-btn color="primary" :loading="isLoading" type="submit"
              >Register</v-btn
            >
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
  name: "RegisterForm",
  components: {
    MultiuseText,
  },
  data() {
    return {
      newUserData: {
        email: "",
        username: "",
        password: "",
        passwordConfirmation: "",
      },
      isLoading: false,
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
      registerUser: "REGISTER_USER",
    }),
    async register() {
      const { valid } = await (
        this.$refs.registerForm as HTMLFormElement
      ).validate();

      if (!valid) {
        return;
      }

      const userData = {
        email: this.newUserData.email,
        username: this.newUserData.username,
        password: this.newUserData.password,
      };

      this.isLoading = true;

      this.registerUser(userData)
        .then(() => {
          this.$emit("changeForm", 0);
        })
        .finally(() => {
          this.isLoading = false;
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
    passwordMatch(value: string) {
      if (value === this.newUserData.password) return true;
      return "The passwords must match";
    },
  },
});
</script>

<style></style>
