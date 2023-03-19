<template>
  <div id="nuzlockes" class="content">
    <v-row class="h-100 w-100" no-gutters>
      <v-col class="pa-3" cols="8">
        <v-row no-gutters>
          <v-card class="pa-4 w-100">
            <v-row no-gutters>
              <v-col>
                <v-row no-gutters>
                  <v-text-field
                    v-model="search"
                    prepend-inner-icon="search"
                    placeholder="Search"
                    hide-details
                    variant="outlined"
                    color="secondary"
                  ></v-text-field>
                </v-row>
                <v-row no-gutters>
                  <v-col>
                    <v-row class="py-5" no-gutters>
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
                      v-for="nuzlocke in filteredNuzlockes()"
                      :key="nuzlocke._id"
                      class="nuzlocke-row py-3"
                      no-gutters
                      @click="checkNuzlocke(nuzlocke)"
                    >
                      <v-col cols="6">
                        <v-row no-gutters align="center" justify="center">
                          {{ nuzlocke.name }}
                        </v-row>
                      </v-col>
                      <v-col cols="3">
                        <v-row no-gutters align="center" justify="center">
                          {{ nuzlocke.game }}
                        </v-row>
                      </v-col>
                      <v-col cols="3">
                        <v-row no-gutters align="center" justify="center">
                          {{ nuzlocke.status }}
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
      <v-col class="pa-3" cols="4">
        <Card :type="'nuzlockes'" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import { Nuzlocke } from "../store/interfaces";
import Card from "../components/InfoActions/Card.vue";
export default defineComponent({
  name: "Nuzlockes",
  components: {
    Card,
  },
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlockes: "GET_NUZLOCKES",
    }),
  },
  mounted() {
    if (this.getNuzlockes.length === 0) {
      this.fetchNuzlockes();
    }
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
    ...mapActions("nuzlockes", {
      fetchNuzlockes: "FETCH_NUZLOCKES",
    }),
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
          id: nuzlocke._id,
        },
      });
    },
  },
});
</script>

<style>
.nuzlocke-row {
  cursor: pointer;
}
.nuzlocke-row:hover {
  background-color: #9e9e9e4d;
}
</style>
