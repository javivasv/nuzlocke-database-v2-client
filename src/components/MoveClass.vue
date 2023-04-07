<template>
  <div
    class="move-class"
    :style="{ 'background-image': `url(${moveClass()})` }"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import mixin from "@/mixin";
export default defineComponent({
  name: "MoveClass",
  mixins: [mixin],
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    moveClass() {
      let moveClass;

      if (this.type === "physical") {
        moveClass = "move_physical";
      } else if (this.type === "special") {
        moveClass = "move_special";
      } else {
        moveClass = "move_status";
      }

      return require(`../assets/${moveClass}.png`);
    },
  },
});
</script>

<style></style>
