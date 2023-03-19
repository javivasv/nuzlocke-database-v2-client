<template>
  <v-card-title>
    <v-btn color="secondary" @click="toAddPokemon()">Add pokemon</v-btn>
  </v-card-title>
  <v-divider class="my-3"></v-divider>
  <v-card-subtitle>
    <span><strong>Status:</strong> {{ getNuzlocke.status }}</span>
  </v-card-subtitle>
  <v-divider class="my-3"></v-divider>
  <v-card-text>
    <v-row no-gutters>
      <v-col>
        <v-row no-gutters align="center" justify="center">
          <span>{{ getNuzlocke.description }}</span>
        </v-row>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "InfoActionsNuzlocke",
  components: {},
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlocke: "GET_NUZLOCKE",
    }),
  },
  data() {
    return {};
  },
  methods: {
    toAddPokemon() {
      this.$router.push({
        name: "pokemon-form",
        params: {
          id: this.$route.params.id,
        },
      });
    },
  },
});
</script>

<style></style>
