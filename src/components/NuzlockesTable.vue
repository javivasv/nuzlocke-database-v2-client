<template>
  <v-row no-gutters>
    <v-col>
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
          <v-row v-else no-gutters>
            <v-col
              class="thin-scrollbar"
              :style="{
                'max-height': $vuetify.display.height - 172 + 'px',
              }"
            >
              <v-row
                v-for="nuzlocke in filteredNuzlockes()"
                :key="nuzlocke._id"
                class="table-row py-5"
                no-gutters
                @click="checkNuzlocke(nuzlocke)"
              >
                <v-col cols="6">
                  <v-row no-gutters align="center" justify="center">
                    <span class="table-text">
                      {{ nuzlocke.name }}
                    </span>
                  </v-row>
                </v-col>
                <v-col cols="3">
                  <v-row no-gutters align="center" justify="center">
                    <span class="table-text">
                      {{ nuzlocke.game }}
                    </span>
                  </v-row>
                </v-col>
                <v-col cols="3">
                  <v-row no-gutters align="center" justify="center">
                    <v-icon
                      :icon="
                        nuzlocke.status === 'started'
                          ? 'flag'
                          : nuzlocke.status === 'completed'
                          ? 'done'
                          : 'close'
                      "
                    ></v-icon>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { Nuzlocke } from "@/interface";
export default defineComponent({
  name: "NuzlockesTable",
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
          nuzlocke.name.includes(this.search) ||
          nuzlocke.game.includes(this.search)
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
