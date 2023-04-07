<template>
  <div class="pokemon-type" :style="{ 'background-color': typeColor() }">
    <span>
      {{ typeName() }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import mixin from "../mixin";
export default defineComponent({
  name: "PokemonType",
  mixins: [mixin],
  components: {},
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
    typeName() {
      const type =
        this.pokemonTypes.find(
          (type) => type.name.toLowerCase() === this.type
        ) || this.pokemonTypes[0];

      return type.name;
    },
    typeColor() {
      const type =
        this.pokemonTypes.find(
          (type) => type.name.toLowerCase() === this.type
        ) || this.pokemonTypes[0];

      return type.color;
    },
  },
});
</script>

<style></style>
