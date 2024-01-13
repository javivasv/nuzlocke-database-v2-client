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
            <v-btn color="primary" :loading="isLoading" type="submit"
              >Login</v-btn
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
import mixin from "@/mixin";
import MultiuseText from "@/components/MultiuseText.vue";
export default defineComponent({
  name: "LoginForm",
  mixins: [mixin],
  components: {
    MultiuseText,
  },
  data() {
    return {
      userData: {
        email: "",
        password: "",
      },
      isLoading: false,
      emailRules: [
        (value: string) => this.required(value, "email"),
        (value: string) => this.validEmail(value),
      ],
      passwordRules: [(value: string) => this.required(value, "password")],
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

      this.isLoading = true;

      this.doLogin(this.userData)
        .then(() => {
          this.$router.push({
            name: "home",
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
});
</script>

<style></style>
