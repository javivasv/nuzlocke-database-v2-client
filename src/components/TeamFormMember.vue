<template>
  <v-row v-if="Object.keys(teamMember).length > 0" no-gutters>
    <v-col>
      <v-row no-gutters align="center" justify="end">
        <v-btn icon size="x-small" @click="removeTeamMember(index)">
          <v-icon icon="close"></v-icon>
        </v-btn>
      </v-row>
      <v-row no-gutters align="center" justify="center">
        <v-col cols="6">
          <v-row no-gutters align="center" justify="center">
            <v-col
              class="pr-3"
              cols="6"
              :align-self="
                teamMember.item.name.codedName !== '' ? 'end' : 'center'
              "
            >
              <v-row
                v-if="teamMember.pokemon && teamMember.pokemon.sprite !== ''"
                class="py-2"
                no-gutters
                align="center"
                justify="center"
              >
                <v-img :src="teamMember.pokemon.sprite" height="100px">
                  <template #placeholder>
                    <v-row
                      class="h-100"
                      no-gutters
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        color="primary"
                        indeterminate
                      ></v-progress-circular>
                    </v-row> </template
                ></v-img>
              </v-row>
              <MultiuseText :text="'Pokemon'" />
              <v-row no-gutters>
                <v-autocomplete
                  v-model="teamMember.pokemon"
                  :items="filteredPokemon"
                  item-value="species.formattedName"
                  item-title="species.formattedName"
                  density="compact"
                  hide-details
                  return-object
                  variant="outlined"
                  clearable
                  @update:modelValue="updatePokemon(index)"
                  @click:clear="clearPokemon(index)"
                ></v-autocomplete>
              </v-row>
            </v-col>
            <v-col
              class="px-3"
              cols="6"
              :align-self="teamMember.pokemon ? 'end' : 'center'"
            >
              <v-row
                v-if="teamMember.item && teamMember.item.sprite !== ''"
                class="py-2"
                no-gutters
                align="center"
                justify="center"
              >
                <v-img :src="teamMember.item.sprite" height="50px">
                  <template #placeholder>
                    <v-row
                      class="h-100"
                      no-gutters
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        color="primary"
                        indeterminate
                      ></v-progress-circular>
                    </v-row> </template
                ></v-img>
              </v-row>
              <MultiuseText
                :text="'Held item'"
                :class="
                  teamMember.pokemon && teamMember.pokemon.sprite !== ''
                    ? 'mt-5'
                    : ''
                "
              />
              <v-row no-gutters align="center" justify="center">
                <v-progress-circular
                  v-if="loadingItems"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
                <v-autocomplete
                  v-else
                  v-model="teamMember.item.name"
                  :items="getItems"
                  item-value="formattedName"
                  item-title="formattedName"
                  density="compact"
                  hide-details
                  return-object
                  variant="outlined"
                  clearable
                  @click:clear="clearItem(index)"
                  @update:modelValue="fetchItemData(index)"
                ></v-autocomplete>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="pl-3" cols="6">
          <v-row v-if="loadingMoves" no-gutters align="center" justify="center">
            <v-progress-circular
              color="primary"
              indeterminate
            ></v-progress-circular
          ></v-row>
          <template v-else>
            <v-row class="py-2" no-gutters>
              <v-col class="pr-3" cols="6" align-self="end">
                <v-row no-gutters align="center" justify="center">
                  <PokemonType
                    v-if="teamMember.moves.first.type !== ''"
                    :type="teamMember.moves.first.type"
                  />
                  <MoveClass
                    v-if="teamMember.moves.first.class !== ''"
                    :type="teamMember.moves.first.class"
                  />
                </v-row>
                <MultiuseText :text="'First move'" />
                <v-row no-gutters>
                  <v-autocomplete
                    v-model="teamMember.moves.first.name"
                    :items="getMoves"
                    item-value="formattedName"
                    item-title="formattedName"
                    return-object
                    density="compact"
                    hide-details
                    variant="outlined"
                    clearable
                    @click:clear="clearMove(index, 'first')"
                    @update:modelValue="fetchMoveData(index, 'first')"
                  ></v-autocomplete>
                </v-row>
              </v-col>
              <v-col class="pl-3" cols="6" align-self="end">
                <v-row no-gutters align="center" justify="center">
                  <PokemonType
                    v-if="teamMember.moves.second.type !== ''"
                    :type="teamMember.moves.second.type"
                  />
                  <MoveClass
                    v-if="teamMember.moves.second.class !== ''"
                    :type="teamMember.moves.second.class"
                  />
                </v-row>
                <MultiuseText :text="'Second move'" />
                <v-row no-gutters>
                  <v-autocomplete
                    v-model="teamMember.moves.second.name"
                    :items="getMoves"
                    item-value="formattedName"
                    item-title="formattedName"
                    return-object
                    density="compact"
                    hide-details
                    variant="outlined"
                    clearable
                    @click:clear="clearMove(index, 'second')"
                    @update:modelValue="fetchMoveData(index, 'second')"
                  ></v-autocomplete>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="py-2" no-gutters>
              <v-col class="pr-3" cols="6" align-self="end">
                <v-row no-gutters align="center" justify="center">
                  <PokemonType
                    v-if="teamMember.moves.third.type !== ''"
                    :type="teamMember.moves.third.type"
                  />
                  <MoveClass
                    v-if="teamMember.moves.third.class !== ''"
                    :type="teamMember.moves.third.class"
                  />
                </v-row>
                <MultiuseText :text="'Third move'" />
                <v-row no-gutters>
                  <v-autocomplete
                    v-model="teamMember.moves.third.name"
                    :items="getMoves"
                    item-value="formattedName"
                    item-title="formattedName"
                    return-object
                    density="compact"
                    hide-details
                    variant="outlined"
                    clearable
                    @click:clear="clearMove(index, 'third')"
                    @update:modelValue="fetchMoveData(index, 'third')"
                  ></v-autocomplete>
                </v-row>
              </v-col>
              <v-col class="pl-3" cols="6" align-self="end">
                <v-row no-gutters align="center" justify="center">
                  <PokemonType
                    v-if="teamMember.moves.fourth.type !== ''"
                    :type="teamMember.moves.fourth.type"
                  />
                  <MoveClass
                    v-if="teamMember.moves.fourth.class !== ''"
                    :type="teamMember.moves.fourth.class"
                  />
                </v-row>
                <MultiuseText :text="'Fourth move'" />
                <v-row no-gutters>
                  <v-autocomplete
                    v-model="teamMember.moves.fourth.name"
                    :items="getMoves"
                    item-value="formattedName"
                    item-title="formattedName"
                    return-object
                    density="compact"
                    hide-details
                    variant="outlined"
                    clearable
                    @click:clear="clearMove(index, 'fourth')"
                    @update:modelValue="fetchMoveData(index, 'fourth')"
                  ></v-autocomplete>
                </v-row>
              </v-col>
            </v-row>
          </template>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import MultiuseText from "@/components/MultiuseText.vue";
import PokemonType from "@/components/PokemonType.vue";
import MoveClass from "@/components/MoveClass.vue";
import { TeamMember } from "@/interface";
export default defineComponent({
  name: "TeamFormMember",
  components: {
    MultiuseText,
    PokemonType,
    MoveClass,
  },
  props: {
    member: {
      type: Object,
      default: () => {
        return {};
      },
    },
    index: {
      type: Number,
      default: -1,
    },
    filteredPokemon: {
      type: Array,
      default: () => {
        return [];
      },
    },
    loadingItems: {
      type: Boolean,
      default: false,
    },
    loadingMoves: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters("nuzlockes", {
      getNuzlocke: "GET_NUZLOCKE",
    }),
    ...mapGetters("pokeapi", {
      getItems: "GET_ITEMS",
      getMoves: "GET_MOVES",
    }),
  },
  watch: {
    member: {
      deep: true,
      handler(val) {
        this.teamMember = {
          ...val,
        };
      },
    },
  },
  data() {
    return {
      teamMember: {} as TeamMember,
    };
  },
  mounted() {
    this.teamMember = {
      ...this.member,
    } as TeamMember;
  },
  methods: {
    ...mapActions("pokeapi", {
      fetchItem: "FETCH_ITEM",
      fetchMove: "FETCH_MOVE",
    }),
    updatePokemon(index: number) {
      this.$emit("updatePokemon", {
        index,
        pokemon: this.teamMember.pokemon,
      });
    },
    clearPokemon(index: number) {
      this.$emit("clearPokemon", index);
    },
    removeTeamMember(index: number) {
      this.$emit("removeTeamMember", index);
    },
    fetchItemData(index: number) {
      this.$emit("fetchItemData", index);
    },
    clearItem(index: number) {
      this.$emit("clearItem", index);
    },
    fetchMoveData(index: number, move: string) {
      this.$emit("fetchMoveData", {
        index,
        move,
      });
    },
    clearMove(index: number, move: string) {
      this.$emit("clearMove", {
        index,
        move,
      });
    },
  },
});
</script>

<style></style>
