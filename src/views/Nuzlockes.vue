<template>
  <div class="content nuzlockes">
    <v-row class="h-100 w-100" no-gutters>
      <v-col class="pa-3" cols="8">
        <v-row no-gutters>
          <v-card class="pa-4 w-100">
            <v-col>
              <v-row no-gutters>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
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
                    v-for="nuzlocke in getNuzlockes"
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
          </v-card>
        </v-row>
      </v-col>
      <v-col class="pa-3" cols="4"></v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import { Nuzlocke } from "../store/interfaces";
export default defineComponent({
  name: "Nuzlockes",
  components: {},
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlockes: "GET_NUZLOCKES",
    }),
  },
  mounted() {
    this.fetchNuzlockes();
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
    checkNuzlocke(nuzlocke: Nuzlocke) {
      console.log("NUZLOCKE: ", { ...nuzlocke });
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
