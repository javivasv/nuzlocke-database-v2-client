<template>
  <v-card class="settings-card pa-4 mt-3" width="420px">
    <MultiuseText :text="'Settings'" />
    <v-row no-gutters>
      <v-col v-for="setting in settings" :key="setting.value" cols="12">
        <v-checkbox
          v-model="setting.on"
          :class="{ 'dark-mode': $vuetify.theme.name === 'customDarkTheme' }"
          :label="setting.name"
          hide-details
          color="secondary"
          @update:modelValue="updateSetting()"
        ></v-checkbox>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MultiuseText from "@/components/MultiuseText.vue";
export default defineComponent({
  name: "SettingsMenu",
  components: {
    MultiuseText,
  },
  data() {
    return {
      settings: [
        {
          name: "Show as obtained",
          value: "show_as_obtained",
          on: false,
        },
      ],
    };
  },
  methods: {
    updateSetting() {
      this.$emit("updateSetting", this.settings[0].on);
    },
  },
});
</script>

<style></style>
