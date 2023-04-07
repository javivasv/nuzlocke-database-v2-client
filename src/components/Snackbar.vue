<template>
  <v-snackbar v-model="show" timeout="3000">
    {{ text }}
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";
export default defineComponent({
  name: "Snackbar",
  computed: {
    ...mapGetters("notifications", {
      getSnackbarText: "GET_SNACKBAR_TEXT",
    }),
  },
  watch: {
    getSnackbarText(val) {
      if (val !== "") {
        this.text = val;
        this.show = true;
      }
    },
    show(val) {
      if (!val) {
        this.setSnackbarText("");
      }
    },
  },
  data() {
    return {
      show: false,
      text: "",
    };
  },
  methods: {
    ...mapMutations("notifications", {
      setSnackbarText: "SET_SNACKBAR_TEXT",
    }),
  },
});
</script>

<style></style>
