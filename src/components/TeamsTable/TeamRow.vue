<template>
  <v-row class="table-row py-5" no-gutters @click="toEditTeam(team._id)">
    <v-col>
      <v-row no-gutters>
        <v-col cols="3">
          <v-row class="h-100" no-gutters align="center" justify="center">
            <span class="table-text">
              {{ team.name !== "" ? team.name : "-" }}
            </span>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-row class="h-100" no-gutters align="center" justify="center">
            <span class="table-text">
              {{ team.vs !== "" ? team.vs : "-" }}
            </span>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row class="h-100" no-gutters align="center" justify="center">
            <span class="table-text">
              {{ team.description !== "" ? team.description : "-" }}
            </span>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="3">
          <v-row class="px-3 my-3" no-gutters>
            <v-divider></v-divider>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-row class="px-3 my-3" no-gutters>
            <v-divider></v-divider>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row class="px-3 my-3" no-gutters>
            <v-divider></v-divider>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters align="center" justify="center">
        <template v-for="(member, index) in team.members" :key="index">
          <TeamMember :team="team" :member="member" :index="index" />
        </template>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TeamMember from "@/components/TeamMember.vue";
export default defineComponent({
  name: "TeamRow",
  components: {
    TeamMember,
  },
  props: {
    team: {
      type: Object,
      default: () => {
        return {};
      },
    },
    index: {
      type: Number,
      default: -1,
    },
  },
  methods: {
    toEditTeam(id: string) {
      this.$emit("toEditTeam", id);
    },
  },
});
</script>

<style></style>
