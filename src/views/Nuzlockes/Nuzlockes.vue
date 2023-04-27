<template>
  <v-row id="nuzlockes" no-gutters>
    <v-card class="pa-4 w-100">
      <NuzlockesTable />
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import NuzlockesTable from "@/components/NuzlockesTable.vue";
export default defineComponent({
  name: "Nuzlockes",
  components: {
    NuzlockesTable,
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
