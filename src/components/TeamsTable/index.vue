<template>
  <v-row no-gutters>
    <v-col>
      <template v-if="getNuzlocke.teams.length === 0">
        <v-row class="py-3" no-gutters align="center" justify="center">
          <h2>There are no teams registered yet</h2>
        </v-row>
      </template>
      <template v-else>
        <v-row class="py-3" no-gutters align="center" justify="center">
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
                  'max-height': $vuetify.display.height - 304 + 'px',
                }"
              >
                <template
                  v-for="(team, index) in filteredTeams()"
                  :key="team._id"
                >
                  <TeamRow
                    :team="team"
                    :index="index"
                    @toEditTeam="toEditTeam"
                  />
                  <v-divider
                    v-if="index + 1 !== filteredTeams().length"
                    class="my-3"
                  ></v-divider>
                </template>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import TeamRow from "@/components/TeamsTable/TeamRow.vue";
import { Team } from "@/interface";
export default defineComponent({
  name: "TeamsTable",
  components: {
    TeamRow,
  },
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlocke: "GET_NUZLOCKE",
    }),
  },
  data() {
    return {
      search: "",
      headers: [
        {
          name: "name",
          text: "Name",
          cols: 3,
        },
        {
          name: "vs",
          text: "Vs",
          cols: 3,
        },
        {
          name: "description",
          text: "Description",
          cols: 6,
        },
      ],
    };
  },
  methods: {
    filteredTeams() {
      let list = this.getNuzlocke.teams.filter((team: Team) => {
        if (
          this.search !== "" &&
          !team.name.toLowerCase().includes(this.search) &&
          !team.vs.toLowerCase().includes(this.search) &&
          !team.description.toLowerCase().includes(this.search)
        ) {
          return false;
        }

        return true;
      });

      return list;
    },
    toEditTeam(id: string) {
      this.$router.push({
        name: "edit-team-form",
        params: {
          nuzlockeId: this.$route.params.nuzlockeId,
          teamId: id,
        },
      });
    },
  },
});
</script>

<style></style>
