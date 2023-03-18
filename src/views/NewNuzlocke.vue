<template>
  <div id="new-nuzlocke" class="content">
    <v-row class="h-100 w-100" no-gutters>
      <v-col class="pa-3" cols="8">
        <v-row class="py-3" no-gutters>
          <v-btn icon @click="toNuzlockes()">
            <v-icon icon="arrow_back"></v-icon>
          </v-btn>
        </v-row>
        <v-row no-gutters>
          <v-card class="pa-4 w-100">
            <v-form>
              <v-row no-gutters>
                <v-col>
                  <v-row no-gutters>
                    <v-text-field
                      v-model="nuzlocke.name"
                      placeholder="Name"
                      variant="outlined"
                      color="secondary"
                    ></v-text-field>
                  </v-row>
                  <v-row no-gutters>
                    <v-text-field
                      v-model="nuzlocke.game"
                      placeholder="Game"
                      variant="outlined"
                      color="secondary"
                    ></v-text-field>
                  </v-row>
                  <v-row no-gutters>
                    <v-textarea
                      v-model="nuzlocke.description"
                      placeholder="Description"
                      variant="outlined"
                      color="secondary"
                    ></v-textarea>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-row>
      </v-col>
      <v-col class="pa-3" cols="4">
        <Card :type="'new-nuzlocke'" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "../components/InfoActions/Card.vue";
export default defineComponent({
  name: "NewNuzlocke",
  components: {
    Card,
  },
  computed: {},
  data() {
    return {
      nuzlocke: {
        name: "",
        game: "",
        description: "",
      },
    };
  },
  methods: {
    toNuzlockes() {
      this.$router.push("nuzlockes");
    },
  },
});
</script>

<style></style>
