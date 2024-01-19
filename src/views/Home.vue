<template>
  <div id="home" class="content">
    <v-row class="h-100 w-100" no-gutters>
      <template v-if="$vuetify.display.mdAndUp">
        <v-col class="pa-3" cols="8">
          <MainContent />
        </v-col>
        <v-col class="pa-3" cols="4">
          <SecondaryContent />
        </v-col>
      </template>
      <template v-else>
        <v-col class="pa-3" cols="12">
          <MainContent />
          <SecondaryContent />
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import MainContent from "@/components/Home/MainContent.vue";
import SecondaryContent from "@/components/Home/SecondaryContent.vue";
export default defineComponent({
  name: "Home",
  components: {
    MainContent,
    SecondaryContent,
  },
  computed: {
    ...mapGetters("videos", {
      getVideos: "GET_VIDEOS",
    }),
  },
  mounted() {
    if (this.getVideos.length === 0) {
      this.fetchVideos();
    }
  },
  data() {
    return {
      currentVideo: 0,
    };
  },
  methods: {
    ...mapActions("videos", {
      fetchVideos: "FETCH_VIDEOS",
    }),
  },
});
</script>

<style></style>
