<template>
  <div class="h-100" style="text-align: -webkit-center">
    <v-img
      class="pokeball"
      eager
      :src="require('../../assets/pokeball.png')"
    ></v-img>
    <v-card class="info-card px-4 pb-4 w-100">
      <Nuzlockes v-if="type === 'nuzlockes'" />
      <NewNuzlocke
        v-if="type === 'new-nuzlocke'"
        @createNuzlocke="createNuzlocke()"
      />
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Nuzlockes from "./Nuzlockes.vue";
import NewNuzlocke from "./NewNuzlocke.vue";
export default defineComponent({
  name: "InfoActionsCard",
  components: {
    Nuzlockes,
    NewNuzlocke,
  },
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    createNuzlocke() {
      this.$emit("createNuzlocke");
    },
  },
});
</script>

<style>
.pokeball {
  width: 195px;
  z-index: 100 !important;
}
.info-card {
  top: -97.5px;
  padding-top: 112.5px !important;
}
</style>
