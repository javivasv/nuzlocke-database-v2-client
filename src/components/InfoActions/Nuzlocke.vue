<template>
  <v-row class="py-3" no-gutters align="center" justify="center">
    <v-btn color="secondary" @click="toEditNuzlocke()">Update nuzlocke</v-btn>
  </v-row>
  <v-row class="py-3" no-gutters align="center" justify="center">
    <v-btn color="error" variant="outlined" @click="deleteNuzlocke()">
      Delete nuzlocke
    </v-btn>
  </v-row>
  <v-divider class="my-3"></v-divider>
  <v-row class="py-3" no-gutters align="center" justify="center">
    <v-btn color="secondary" @click="toAddPokemon()">Add pokemon</v-btn>
  </v-row>
  <v-divider class="my-3"></v-divider>
  <v-row class="py-4" no-gutters align="center" justify="space-around">
    <v-btn
      :class="getNuzlocke.status === 'started' ? 'current-status' : ''"
      color="secondary"
      :variant="getNuzlocke.status !== 'started' ? 'outlined' : 'flat'"
      @click="updateNuzlockeStatus('started')"
    >
      Started
    </v-btn>
    <v-btn
      :class="getNuzlocke.status === 'completed' ? 'current-status' : ''"
      color="success"
      :variant="getNuzlocke.status !== 'completed' ? 'outlined' : 'elevated'"
      @click="updateNuzlockeStatus('completed')"
    >
      Completed
    </v-btn>
    <v-btn
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
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
    ...mapMutations("notifications", {
      setSnackbarText: "SET_SNACKBAR_TEXT",
    }),
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

      this.updateExistingNuzlocke(data)
        .then(() => {
          this.fetchNuzlockes();
        })
        .catch((error) => {
          this.setSnackbarText(error.data.msg);
        });
    },
    deleteNuzlocke() {
      this.deleteExistingNuzlocke(this.$route.params.nuzlockeId)
        .then(() => {
          this.fetchNuzlockes().then(() => {
            this.$router.push({
              name: "nuzlockes",
            });
          });
        })
        .catch((error) => {
          this.setSnackbarText(error.data.msg);
        });
    },
  },
});
</script>

<style>
.current-status {
  pointer-events: none;
  cursor: default;
}
</style>
