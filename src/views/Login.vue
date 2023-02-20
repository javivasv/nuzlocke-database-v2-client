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
              <v-col>
                <v-row no-gutters>
                  <v-text-field
                    v-model="newUserData.username"
                    label="Username"
                    variant="outlined"
                  ></v-text-field>
                </v-row>
                <v-row no-gutters>
                  <v-text-field
                    v-model="newUserData.password"
                    label="Password"
                    variant="outlined"
                    type="password"
                  ></v-text-field>
                </v-row>
                <v-row no-gutters>
                  <v-text-field
                    v-model="newUserData.passwordConfirmation"
                    label="Password confirmation"
                    variant="outlined"
                    type="password"
                  ></v-text-field>
                </v-row>
                <v-row class="py-3" no-gutters align="center" justify="center">
                  <v-btn color="primary" @click="register()">Register</v-btn>
                </v-row>
                <v-row class="pt-3" no-gutters align="center" justify="center">
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
            <v-row v-else no-gutters>
              <v-col>
                <v-row no-gutters>
                  <v-text-field
                    v-model="userData.username"
                    label="Username"
                    variant="outlined"
                  ></v-text-field>
                </v-row>
                <v-row no-gutters>
                  <v-text-field
                    v-model="userData.password"
                    label="Password"
                    variant="outlined"
                    type="password"
                  ></v-text-field>
                </v-row>
                <v-row class="py-3" no-gutters align="center" justify="center">
                  <v-btn color="primary" @click="login()">Login</v-btn>
                </v-row>
                <v-row class="pt-3" no-gutters align="center" justify="center">
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
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
    };
  },
  methods: {
    login() {
      console.log("LOGIN");
    },
    register() {
      console.log("REGISTER");
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
