<template>
  <v-row no-gutters>
    <v-form
      v-if="validResetToken"
      ref="resetPasswordForm"
      class="w-100"
      @submit.prevent="resetNewPassword()"
    >
      <v-row no-gutters>
        <v-col>
          <MultiuseText :text="'Password'" />
          <v-row no-gutters>
            <v-text-field
              v-model="newPassword.password"
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
              v-model="newPassword.passwordConfirmation"
              variant="outlined"
              type="password"
              color="secondary"
              density="compact"
              :rules="passwordConfirmationRules"
            ></v-text-field>
          </v-row>
          <v-row class="py-3" no-gutters align="center" justify="center">
            <v-btn color="primary" type="submit">Reset password</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
    <MultiuseText :text="errorMsg" :justify="'center'" />
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import MultiuseText from "@/components/MultiuseText.vue";
export default defineComponent({
  name: "ResetPasswordForm",
  components: {
    MultiuseText,
  },
  data() {
    return {
      email: "",
      validResetToken: true,
      errorMsg: "",
      newPassword: {
        password: "",
        passwordConfirmation: "",
      },
      passwordRules: [(value: string) => this.required(value, "password")],
      passwordConfirmationRules: [
        (value: string) => this.required(value, "password"),
        (value: string) => this.passwordMatch(value),
      ],
    };
  },
  mounted() {
    this.validateResetToken(this.$route.params.resetToken)
      .then((res) => {
        this.email = res.email;
      })
      .catch((error) => {
        this.validResetToken = false;
        this.errorMsg = error.data.msg;
      });
  },
  methods: {
    ...mapActions("auth", {
      validateResetToken: "VALIDATE_RESET_TOKEN",
      resetPassword: "RESET_PASSWORD",
    }),
    async resetNewPassword() {
      const { valid } = await (
        this.$refs.resetPasswordForm as HTMLFormElement
      ).validate();

      if (!valid) {
        return;
      }

      const data = {
        email: this.email,
        password: this.newPassword.password,
      };

      this.resetPassword(data).then(() => {
        this.$emit("changeForm", 0);
      });
    },
    required(value: string, type: string) {
      if (value) return true;
      return `You must enter ${type === "email" ? "an" : "a"} ${type}`;
    },
    passwordMatch(value: string) {
      if (value === this.newPassword.password) return true;
      return "The passwords must match";
    },
  },
});
</script>

<style></style>