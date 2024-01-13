<template>
  <v-row no-gutters>
    <v-col>
      <v-row
        v-if="isLoading"
        class="py-5"
        no-gutters
        align="center"
        justify="center"
      >
        <v-progress-circular
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-row>
      <template v-else>
        <template v-if="getNuzlockes.length === 0">
          <v-row class="py-3" no-gutters align="center" justify="center">
            <h2>There are no nuzlockes registered yet</h2>
          </v-row>
        </template>
        <template v-else>
          <v-row class="mb-3" no-gutters>
            <v-text-field
              v-model="search"
              prepend-inner-icon="search"
              placeholder="Search"
              hide-details
              variant="outlined"
              color="secondary"
              density="compact"
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <v-row class="py-5 table-header" no-gutters>
                <v-col
                  v-for="header in headers"
                  :key="header.name"
                  :cols="header.cols"
                >
                  <v-row no-gutters align="center" justify="center">
                    {{ header.text }}
                  </v-row>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  class="thin-scrollbar"
                  :style="{
                    'max-height': $vuetify.display.height - 172 + 'px',
                  }"
                >
                  <template
                    v-for="nuzlocke in filteredNuzlockes()"
                    :key="nuzlocke._id"
                  >
                    <NuzlockeRow
                      :nuzlocke="nuzlocke"
                      @checkNuzlocke="checkNuzlocke"
                    />
                  </template>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </template>
      </template>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import NuzlockeRow from "@/components/NuzlockesTable/NuzlockeRow.vue";
import { Nuzlocke } from "@/interface";
export default defineComponent({
  name: "NuzlockesTable",
  components: {
    NuzlockeRow,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlockes: "GET_NUZLOCKES",
    }),
  },
  data() {
    return {
      search: "",
      headers: [
        {
          name: "name",
          text: "Name",
          cols: 6,
        },
        {
          name: "game",
          text: "Game",
          cols: 3,
        },
        {
          name: "status",
          text: "Status",
          cols: 3,
        },
      ],
    };
  },
  methods: {
    filteredNuzlockes() {
      if (this.search === "") {
        return this.getNuzlockes;
      }

      return this.getNuzlockes.filter(
        (nuzlocke: Nuzlocke) =>
          nuzlocke.name.toLowerCase().includes(this.search) ||
          nuzlocke.game.toLowerCase().includes(this.search)
      );
    },
    checkNuzlocke(nuzlocke: Nuzlocke) {
      this.$router.push({
        name: "nuzlocke",
        params: {
          nuzlockeId: nuzlocke._id,
        },
      });
    },
  },
});
</script>

<style></style>
