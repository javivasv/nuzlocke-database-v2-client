<template>
  <div
    id="login"
    class="h-100 w-100"
    :style="{ 'background-image': `url(${background})` }"
  >
    <v-row class="h-100 w-100" no-gutters>
      <v-col align-self="center">
        <v-row class="w-100" no-gutters align="center" justify="center">
          <v-card id="login-card" class="pa-6">
            <v-row v-if="newUser" no-gutters>
              <v-form
                ref="registerForm"
                class="w-100"
                @submit.prevent="register()"
              >
                <v-row no-gutters>
                  <v-col>
                    <v-row class="py-1" no-gutters>
                      <v-text-field
                        v-model="newUserData.username"
                        label="Username"
                        variant="outlined"
                        :rules="usernameRules"
                      ></v-text-field>
                    </v-row>
                    <v-row class="py-1" no-gutters>
                      <v-text-field
                        v-model="newUserData.password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        :rules="passwordRules"
                      ></v-text-field>
                    </v-row>
                    <v-row class="py-1" no-gutters>
                      <v-text-field
                        v-model="newUserData.passwordConfirmation"
                        label="Password confirmation"
                        variant="outlined"
                        type="password"
                        :rules="passwordConfirmationRules"
                      ></v-text-field>
                    </v-row>
                    <v-row
                      class="py-3"
                      no-gutters
                      align="center"
                      justify="center"
                    >
                      <v-btn color="primary" type="submit">Register</v-btn>
                    </v-row>
                    <v-row
                      class="pt-3"
                      no-gutters
                      align="center"
                      justify="center"
                    >
                      <span
                        >Already have an account?
                        <span
                          class="form-action text-primary"
                          @click="changeForm(false)"
                          >Login</span
                        ></span
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-form>
            </v-row>
            <v-row v-else no-gutters>
              <v-form ref="loginForm" class="w-100" @submit.prevent="login()">
                <v-row no-gutters>
                  <v-col>
                    <v-row class="py-1" no-gutters>
                      <v-text-field
                        v-model="userData.username"
                        label="Username"
                        variant="outlined"
                        :rules="usernameRules"
                      ></v-text-field>
                    </v-row>
                    <v-row class="py-1" no-gutters>
                      <v-text-field
                        v-model="userData.password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        :rules="passwordRules"
                      ></v-text-field>
                    </v-row>
                    <v-row
                      class="py-3"
                      no-gutters
                      align="center"
                      justify="center"
                    >
                      <v-btn color="primary" type="submit">Login</v-btn>
                    </v-row>
                    <v-row
                      class="pt-3"
                      no-gutters
                      align="center"
                      justify="center"
                    >
                      <span
                        >Don't have an account?
                        <span
                          class="form-action text-primary"
                          @click="changeForm(true)"
                          >Register</span
                        ></span
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-form>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations } from "vuex";
export default defineComponent({
  name: "Login",
  components: {},
  data() {
    return {
      background: require("../assets/login-background.png"),
      userData: {
        username: "",
        password: "",
      },
      newUser: false,
      newUserData: {
        username: "",
        password: "",
        passwordConfirmation: "",
      },
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
      registerUser: "REGISTER_USER",
    }),
    ...mapMutations("notifications", {
      setSnackbarText: "SET_SNACKBAR_TEXT",
    }),
    async login() {
      const { valid } = await (
        this.$refs.loginForm as HTMLFormElement
      ).validate();

      if (!valid) {
        return;
      }

      this.doLogin(this.userData)
        .then(() => {
          this.$router.push("home");
        })
        .catch((error) => {
          this.setSnackbarText(error.data.msg);
        });
    },
    async register() {
      const { valid } = await (
        this.$refs.registerForm as HTMLFormElement
      ).validate();

      if (!valid) {
        return;
      }

      const userData = {
        username: this.newUserData.username,
        password: this.newUserData.password,
      };

      this.registerUser(userData)
        .then((res) => {
          this.setSnackbarText(res.msg);
          this.changeForm(false);
        })
        .catch((error) => {
          this.setSnackbarText(error.data.msg);
        });
    },
    changeForm(val: boolean) {
      this.newUser = val;

      this.userData = {
        username: "",
        password: "",
      };

      this.newUserData = {
        username: "",
        password: "",
        passwordConfirmation: "",
      };
    },
    required(value: string, type: string) {
      if (value) return true;
      return `You must enter a ${type}`;
    },
    passwordMatch(value: string) {
      if (value === this.newUserData.password) return true;
      return "The passwords must match";
    },
  },
});
</script>

<style>
#login {
  background-size: cover;
}
#login-card {
  width: 30%;
}
.form-action {
  cursor: pointer;
}
</style>
