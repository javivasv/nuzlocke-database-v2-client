<template>
  <v-dialog v-model="show" persistent max-width="500px">
    <v-card class="pa-4">
      <v-card-text class="mb-3">
        <span>
          <span>Are you sure you want to delete </span>
          <strong>{{ name }}</strong>
          <span>?</span>
        </span>
      </v-card-text>
      <v-row no-gutters align="center" justify="space-around">
        <v-btn color="secondary" :loading="isLoading" @click="doDelete()"
          >Delete</v-btn
        >
        <v-btn
          color="error"
          variant="outlined"
          :disabled="isLoading"
          @click="cancel()"
        >
          Cancel
        </v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DeleteDialog",
  props: {
    name: {
      type: String,
      default: "",
    },
    showDialog: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showDialog(val) {
      this.show = val;
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    doDelete() {
      this.$emit("delete");
    },
    cancel() {
      this.$emit("close");
    },
  },
});
</script>

<style></style>
