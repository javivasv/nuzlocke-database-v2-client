<template>
  <div id="nuzlocke-form" class="content">
    <v-row class="h-100 w-100" no-gutters>
      <v-col class="pa-3" cols="8">
        <v-row class="py-3" no-gutters>
          <v-btn icon @click="to()">
            <v-icon icon="arrow_back"></v-icon>
          </v-btn>
        </v-row>
        <v-row no-gutters>
          <v-card class="pa-4 w-100">
            <v-form ref="nuzlockeForm">
              <v-row no-gutters>
                <v-col>
                  <MultiuseText :text="'Name'" />
                  <v-row no-gutters>
                    <v-text-field
                      v-model="nuzlocke.name"
                      variant="outlined"
                      color="secondary"
                      density="compact"
                      :rules="nameRules"
                    ></v-text-field>
                  </v-row>
                  <MultiuseText :text="'Game'" />
                  <v-row no-gutters>
                    <v-text-field
                      v-model="nuzlocke.game"
                      variant="outlined"
                      color="secondary"
                      density="compact"
                      :rules="gameRules"
                    ></v-text-field>
                  </v-row>
                  <MultiuseText :text="'Description'" />
                  <v-row no-gutters>
                    <v-textarea
                      v-model="nuzlocke.description"
                      variant="outlined"
                      color="secondary"
                      no-resize
                      density="compact"
                      hide-details
                      rows="2"
                    ></v-textarea>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-row>
      </v-col>
      <v-col class="pa-3" cols="4">
        <Card :type="'nuzlocke-form'" @submitNuzlocke="submitNuzlocke()" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import MultiuseText from "@/components/MultiuseText.vue";
import Card from "@/components/InfoActions/Card.vue";
export default defineComponent({
  name: "NuzlockeForm",
  components: {
    MultiuseText,
    Card,
  },
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlocke: "GET_NUZLOCKE",
    }),
  },
  data() {
    return {
      nuzlocke: {
        name: "",
        game: "",
        description: "",
      },
      nameRules: [(value: string) => this.required(value, "name")],
      gameRules: [(value: string) => this.required(value, "game")],
      editMode: false,
    };
  },
  mounted() {
    if (this.$route.name === "edit-nuzlocke-form") {
      this.editMode = true;

      this.fetchNuzlocke(this.$route.params.nuzlockeId).then(() => {
        this.nuzlocke = {
          name: this.getNuzlocke.name,
          game: this.getNuzlocke.game,
          description: this.getNuzlocke.description,
        };
      });
    }
  },
  methods: {
    ...mapActions("nuzlockes", {
      createNewNuzlocke: "CREATE_NUZLOCKE",
      fetchNuzlocke: "FETCH_NUZLOCKE",
      updateExistingNuzlocke: "UPDATE_NUZLOCKE",
    }),
    to() {
      if (this.editMode) {
        this.toNuzlocke();
      } else {
        this.toNuzlockes();
      }
    },
    toNuzlocke() {
      this.$router.push({
        name: "nuzlocke",
        params: {
          nuzlockeId: this.$route.params.nuzlockeId,
        },
      });
    },
    toNuzlockes() {
      this.$router.push({
        name: "nuzlockes",
      });
    },
    required(value: string, type: string) {
      if (value) return true;
      return `You must enter a ${type}`;
    },
    async submitNuzlocke() {
      const { valid } = await (
        this.$refs.nuzlockeForm as HTMLFormElement
      ).validate();

      if (!valid) {
        return;
      }

      if (this.editMode) {
        this.updateNuzlocke();
      } else {
        this.createNuzlocke();
      }
    },
    async createNuzlocke() {
      this.createNewNuzlocke(this.nuzlocke).then(() => {
        this.toNuzlockes();
      });
    },
    async updateNuzlocke() {
      const data = {
        nuzlockeId: this.$route.params.nuzlockeId,
        nuzlocke: {
          ...this.nuzlocke,
        },
      };

      this.updateExistingNuzlocke(data).then(() => {
        this.toNuzlocke();
      });
    },
  },
});
</script>

<style></style>
