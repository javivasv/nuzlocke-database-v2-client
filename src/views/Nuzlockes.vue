<template>
  <div id="nuzlockes" class="content">
    <v-row class="h-100 w-100" no-gutters>
      <v-col class="pa-3" cols="8">
        <v-row no-gutters>
          <v-card class="pa-4 w-100">
            <NuzlockesTable />
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
import NuzlockesTable from "@/components/NuzlockesTable.vue";
import Card from "@/components/InfoActions/Card.vue";
export default defineComponent({
  name: "Nuzlockes",
  components: {
    NuzlockesTable,
    Card,
  },
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlockes: "GET_NUZLOCKES",
    }),
  },
  mounted() {
    if (this.getNuzlockes.length === 0) {
      this.isLoading = true;
      this.fetchNuzlockes().finally(() => {
        this.isLoading = false;
      });
    }
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("nuzlockes", {
      fetchNuzlockes: "FETCH_NUZLOCKES",
    }),
  },
});
</script>

<style></style>
