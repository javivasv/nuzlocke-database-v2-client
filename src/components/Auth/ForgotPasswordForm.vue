<template>
  <v-row no-gutters>
    <v-form
      ref="forgotPasswordForm"
      class="w-100"
      @submit.prevent="sendEmail()"
    >
      <v-row no-gutters>
        <v-col>
          <MultiuseText :text="'Email'" />
          <v-row no-gutters>
            <v-text-field
              v-model="email"
              variant="outlined"
              color="secondary"
              density="compact"
              :rules="emailRules"
            ></v-text-field>
          </v-row>
          <v-row class="py-3" no-gutters align="center" justify="center">
            <v-btn color="primary" :loading="isLoading" type="submit"
              >Send email</v-btn
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
  name: "ForgotPasswordForm",
  mixins: [mixin],
  components: {
    MultiuseText,
  },
  data() {
    return {
      email: "",
      isLoading: false,
      emailRules: [
        (value: string) => this.required(value, "email"),
        (value: string) => this.validEmail(value),
      ],
    };
  },
  methods: {
    ...mapActions("auth", {
      forgotPassword: "FORGOT_PASSWORD",
    }),
    async sendEmail() {
      const { valid } = await (
        this.$refs.forgotPasswordForm as HTMLFormElement
      ).validate();

      if (!valid) {
        return;
      }

      this.isLoading = true;

      this.forgotPassword({ email: this.email })
        .then(() => {
          this.$emit("changeForm", 0);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
});
</script>

<style></style>
