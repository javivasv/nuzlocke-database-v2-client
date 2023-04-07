<template>
  <v-card class="filters-card pa-4 mt-3" width="420px">
    <TextFieldName :text="'Status filters'" />
    <v-row no-gutters>
      <v-col v-for="filter in statusFilters" :key="filter.value" cols="4">
        <v-checkbox
          v-model="filter.on"
          :label="filter.name"
          hide-details
          color="secondary"
          @update:modelValue="updateFilter(filter.value, 'status')"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-divider class="my-3"></v-divider>
    <TextFieldName :text="'Obtained filters'" />
    <v-row no-gutters>
      <v-col v-for="filter in obtainedFilters" :key="filter.value" cols="4">
        <v-checkbox
          v-model="filter.on"
          :label="filter.name"
          hide-details
          color="secondary"
          @update:modelValue="updateFilter(filter.value, 'obtained')"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-divider class="my-3"></v-divider>
    <TextFieldName :text="'Type filters'" />
    <v-row no-gutters>
      <v-col v-for="filter in typeFilters" :key="filter.value" cols="4">
        <v-checkbox
          v-model="filter.on"
          :label="filter.name"
          hide-details
          :color="getTypeColor(filter.name)"
          @update:modelValue="updateFilter(filter.value, 'type')"
        ></v-checkbox>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TextFieldName from "@/components/TextFieldName.vue";
import mixin from "../mixin";
export default defineComponent({
  name: "Filters",
  mixins: [mixin],
  components: {
    TextFieldName,
  },
  props: {},
  computed: {},
  data() {
    return {
      statusFilters: [
        {
          name: "Alive",
          value: "alive",
          on: false,
        },
        {
          name: "Fainted",
          value: "fainted",
          on: false,
        },
      ],
      obtainedFilters: [
        {
          name: "Caught",
          value: "caught",
          on: false,
        },
        {
          name: "Gifted",
          value: "gifted",
          on: false,
        },
        {
          name: "Hatched",
          value: "hatched",
          on: false,
        },
        {
          name: "Traded",
          value: "traded",
          on: false,
        },
        {
          name: "Not caught",
          value: "not",
          on: false,
        },
      ],
      typeFilters: [
        {
          name: "Normal",
          value: "normal",
          on: false,
        },
        {
          name: "Fighting",
          value: "fighting",
          on: false,
        },
        {
          name: "Flying",
          value: "flying",
          on: false,
        },
        {
          name: "Poison",
          value: "poison",
          on: false,
        },
        {
          name: "Ground",
          value: "ground",
          on: false,
        },
        {
          name: "Rock",
          value: "rock",
          on: false,
        },
        {
          name: "Bug",
          value: "bug",
          on: false,
        },
        {
          name: "Ghost",
          value: "ghost",
          on: false,
        },
        {
          name: "Steel",
          value: "steel",
          on: false,
        },
        {
          name: "Fire",
          value: "fire",
          on: false,
        },
        {
          name: "Water",
          value: "water",
          on: false,
        },
        {
          name: "Grass",
          value: "grass",
          on: false,
        },
        {
          name: "Electric",
          value: "electric",
          on: false,
        },
        {
          name: "Psychic",
          value: "psychic",
          on: false,
        },
        {
          name: "Ice",
          value: "ice",
          on: false,
        },
        {
          name: "Dragon",
          value: "dragon",
          on: false,
        },
        {
          name: "Dark",
          value: "dark",
          on: false,
        },
        {
          name: "Fairy",
          value: "fairy",
          on: false,
        },
      ],
    };
  },
  methods: {
    updateFilter(value: string, type: string) {
      this.$emit("updateFilter", {
        value,
        type,
      });
    },
    getTypeColor(typeName: string) {
      let color = "secondary";
      let type = this.pokemonTypes.find((type) => type.name === typeName);

      if (type) {
        color = type.color;
      }

      return color;
    },
  },
});
</script>

<style></style>
