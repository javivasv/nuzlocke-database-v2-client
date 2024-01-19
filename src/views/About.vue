<template>
  <div id="about" class="content">
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
import MainContent from "@/components/About/MainContent.vue";
import SecondaryContent from "@/components/About/SecondaryContent.vue";
export default defineComponent({
  name: "About",
  components: {
    MainContent,
    SecondaryContent,
  },
});
</script>
