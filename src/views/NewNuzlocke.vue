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
            <v-form ref="nuzlockeForm">
              <v-row no-gutters>
                <v-col>
                  <v-row class="py-1" no-gutters>
                    <v-text-field
                      v-model="nuzlocke.name"
                      placeholder="Name"
                      variant="outlined"
                      color="secondary"
                      :rules="nameRules"
                    ></v-text-field>
                  </v-row>
                  <v-row class="py-1" no-gutters>
                    <v-text-field
                      v-model="nuzlocke.game"
                      placeholder="Game"
                      variant="outlined"
                      color="secondary"
                      :rules="gameRules"
                    ></v-text-field>
                  </v-row>
                  <v-row class="py-1" no-gutters>
                    <v-textarea
                      v-model="nuzlocke.description"
                      placeholder="Description"
                      variant="outlined"
                      color="secondary"
                      no-resize
                    ></v-textarea>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-row>
      </v-col>
      <v-col class="pa-3" cols="4">
        <Card :type="'new-nuzlocke'" @createNuzlocke="createNuzlocke()" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
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
      nameRules: [(value: string) => this.required(value, "name")],
      gameRules: [(value: string) => this.required(value, "game")],
    };
  },
  methods: {
    ...mapActions("nuzlockes", {
      createNewNuzlocke: "CREATE_NUZLOCKE",
    }),
    toNuzlockes() {
      this.$router.push("nuzlockes");
    },
    required(value: string, type: string) {
      if (value) return true;
      return `You must enter a ${type}`;
    },
    async createNuzlocke() {
      console.log("CREATE NUZLOCKE");

      const { valid } = await (
        this.$refs.nuzlockeForm as HTMLFormElement
      ).validate();

      if (!valid) {
        return;
      }

      this.createNewNuzlocke(this.nuzlocke)
        .then((res) => {
          console.log("RES: ", res);
        })
        .catch((error) => {
          console.log("ERROR: ", error);
        });
    },
  },
});
</script>

<style></style>
