<template>
  <v-row :class="$vuetify.display.smAndDown ? 'pt-3' : ''" no-gutters>
    <v-card class="pa-4 mb-4 w-100">
      <MultiuseText :text="'Nuzlocke Basic Rules'" :justify="'center'" />
      <v-row no-gutters>
        <v-card-text>
          <v-row class="mb-5" no-gutters>
            <span>
              Any Pokémon that faints is considered dead, and must be released
              or put in the Pokémon Storage System permanently (or may be
              transferred to another game, as long as the Pokémon is never able
              to be used again during this run).
            </span>
          </v-row>
          <v-row no-gutters>
            <span>
              The player may only catch the first wild Pokémon encountered in
              each area, and none else. If the first wild Pokémon encountered
              faints or flees, there are no second chances. If the first
              encounter in the area is a double battle, the player is free to
              choose which of the two wild Pokémon they would like to catch but
              may only catch one of them. This restriction does not apply to
              Pokémon able to be captured during static encounters, nor to Shiny
              Pokémon
            </span>
          </v-row>
        </v-card-text>
      </v-row>
    </v-card>
    <v-card class="pa-4 w-100">
      <MultiuseText
        :text="'Commonly accepted extra rules'"
        :justify="'center'"
      />
      <v-card-text>
        <v-row class="mb-5" no-gutters>
          <span>
            The two basic rules are not in effect until the player has gained
            their first Poké Balls and thus the ability to catch Pokémon
          </span>
        </v-row>
        <v-row class="mb-5" no-gutters>
          <span>
            The player must nickname all of their Pokémon, for the sake of
            forming stronger emotional bonds
          </span>
        </v-row>
        <v-row class="mb-5" no-gutters>
          <span>
            Species/Dupes Clause: The "first wild Pokémon in each area" rule
            does not apply in an area until a species or evolution line is
            encountered that has not been caught yet
          </span>
        </v-row>
        <v-row class="mb-5" no-gutters>
          <span>
            Shiny Clause: Shiny Pokémon do not need to be released if they faint
          </span>
        </v-row>
        <v-row no-gutters>
          <span>
            If the player has no Pokémon that can use a field move that is
            required to continue the game, they may catch another Pokémon that
            can learn the required field move. However, this Pokémon cannot be
            used in battle for any reason, and must be released, permanently put
            into a PC box, or migrated as soon as it is no longer needed or if
            the player catches another Pokémon that can use this field move
          </span>
        </v-row>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MultiuseText from "@/components/MultiuseText.vue";
export default defineComponent({
  name: "HomeSecondaryContent",
  components: {
    MultiuseText,
  },
});
</script>

<style></style>
