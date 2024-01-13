<template>
  <MultiuseText
    :text="getNuzlocke.name + ' - ' + getNuzlocke.game"
    :justify="'center'"
  />
  <v-divider class="my-3"></v-divider>
  <v-row class="py-3" no-gutters align="center" justify="center">
    <v-btn color="secondary" @click="toEditNuzlocke()">Update nuzlocke</v-btn>
  </v-row>
  <v-row class="py-3" no-gutters align="center" justify="center">
    <v-btn color="error" variant="outlined" @click="showDeleteDialog = true">
      Delete nuzlocke
    </v-btn>
  </v-row>
  <v-divider class="my-3"></v-divider>
  <v-row class="py-2" no-gutters align="center" justify="center">
    <v-btn class="ma-2" color="secondary" @click="toAddPokemon()">
      Add pokemon
    </v-btn>
    <v-btn v-if="false" class="ma-2" color="secondary" @click="toAddTeam()">
      Add team
    </v-btn>
  </v-row>
  <v-divider class="my-3"></v-divider>
  <v-row class="py-2" no-gutters align="center" justify="space-around">
    <v-btn
      class="ma-2"
      :class="getNuzlocke.status === 'started' ? 'current-status' : ''"
      color="secondary"
      :variant="getNuzlocke.status !== 'started' ? 'outlined' : 'flat'"
      @click="updateNuzlockeStatus('started')"
    >
      Started
    </v-btn>
    <v-btn
      class="ma-2"
      :class="getNuzlocke.status === 'completed' ? 'current-status' : ''"
      color="success"
      :variant="getNuzlocke.status !== 'completed' ? 'outlined' : 'elevated'"
      @click="updateNuzlockeStatus('completed')"
    >
      Completed
    </v-btn>
    <v-btn
      class="ma-2"
      :class="getNuzlocke.status === 'lost' ? 'current-status' : ''"
      color="error"
      :variant="getNuzlocke.status !== 'lost' ? 'outlined' : 'elevated'"
      @click="updateNuzlockeStatus('lost')"
    >
      Lost
    </v-btn>
  </v-row>
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
  <DeleteDialog
    :name="getNuzlocke.name"
    :show-dialog="showDeleteDialog"
    :is-loading="isLoading"
    @delete="deleteNuzlocke()"
    @close="showDeleteDialog = false"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import MultiuseText from "@/components/MultiuseText.vue";
import DeleteDialog from "@/components/DeleteDialog.vue";
export default defineComponent({
  name: "InfoActionsNuzlocke",
  components: {
    MultiuseText,
    DeleteDialog,
  },
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlocke: "GET_NUZLOCKE",
    }),
  },
  data() {
    return {
      showDeleteDialog: false,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("nuzlockes", {
      updateExistingNuzlocke: "UPDATE_NUZLOCKE",
      deleteExistingNuzlocke: "DELETE_NUZLOCKE",
      fetchNuzlockes: "FETCH_NUZLOCKES",
    }),
    toEditNuzlocke() {
      this.$router.push({
        name: "edit-nuzlocke-form",
        params: {
          nuzlockeId: this.$route.params.nuzlockeId,
        },
      });
    },
    toAddPokemon() {
      this.$router.push({
        name: "pokemon-form",
        params: {
          nuzlockeId: this.$route.params.nuzlockeId,
        },
      });
    },
    updateNuzlockeStatus(status: string) {
      const data = {
        nuzlockeId: this.$route.params.nuzlockeId,
        nuzlocke: {
          status,
        },
      };

      this.updateExistingNuzlocke(data).then(() => {
        this.fetchNuzlockes();
      });
    },
    deleteNuzlocke() {
      this.isLoading = true;

      this.deleteExistingNuzlocke(this.$route.params.nuzlockeId).then(() => {
        this.fetchNuzlockes()
          .then(() => {
            this.$router.push({
              name: "nuzlockes",
            });
          })
          .finally(() => {
            this.isLoading = false;
          });
      });
    },
    toAddTeam() {
      this.$router.push({
        name: "team-form",
        params: {
          nuzlockeId: this.$route.params.nuzlockeId,
        },
      });
    },
  },
});
</script>

<style></style>
