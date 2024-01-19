<template>
  <v-row :class="$vuetify.display.smAndDown ? 'pt-3' : ''" no-gutters>
    <v-card class="pa-4 mb-4 w-100">
      <MultiuseText :text="'Feedback'" :justify="'center'" />
      <v-row no-gutters>
        <v-form ref="suggestionForm" class="w-100" @submit.prevent="send()">
          <v-row no-gutters>
            <v-col>
              <MultiuseText :text="'Name'" />
              <v-row class="mb-5" no-gutters>
                <v-text-field
                  v-model="suggestion.name"
                  variant="outlined"
                  hide-details
                  color="secondary"
                  density="compact"
                >
                </v-text-field>
              </v-row>
              <MultiuseText :text="'Suggestions'" />
              <v-row no-gutters>
                <v-textarea
                  v-model="suggestion.text"
                  variant="outlined"
                  hide-details
                  color="secondary"
                  density="compact"
                  no-resize
                  rows="5"
                ></v-textarea>
              </v-row>
              <v-row class="py-3" no-gutters align="center" justify="center">
                <v-btn color="secondary" type="submit" :loading="isLoading">
                  Send
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-row>
    </v-card>
    <v-card class="pa-4 w-100">
      <MultiuseText :text="'Contact'" :justify="'center'" />
      <v-card-text>
        <v-row no-gutters>
          <v-col>
            <v-row
              v-for="website in websites"
              :key="website.url"
              class="py-1"
              no-gutters
              align="center"
              justify="center"
            >
              <a class="website-link" :href="website.url" target="_blank">
                {{ website.name }}
              </a>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import MultiuseText from "@/components/MultiuseText.vue";
export default defineComponent({
  name: "AboutSecondaryContent",
  components: {
    MultiuseText,
  },
  data() {
    return {
      suggestion: {
        name: "",
        text: "",
      },
      isLoading: false,
      websites: [
        {
          name: "Personal website",
          url: "https://javivasv.com/",
        },
        {
          name: "Buy Me a Coffee",
          url: "https://www.buymeacoffee.com/javivasv",
        },
        {
          name: "Github",
          url: "https://github.com/javivasv",
        },
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/javier-vivas-veliz/",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", {
      getUser: "GET_USER",
    }),
  },
  methods: {
    ...mapActions("suggestions", {
      sendSuggestion: "SEND_SUGGESTION",
    }),
    async send() {
      if (this.suggestion.text === "") {
        return;
      }

      this.isLoading = true;

      const data = {
        ...this.suggestion,
        email: this.getUser ? this.getUser.email : null,
        username: this.getUser ? this.getUser.username : null,
      };

      this.sendSuggestion(data)
        .then(() => {
          this.suggestion.name = "";
          this.suggestion.text = "";
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
});
</script>
