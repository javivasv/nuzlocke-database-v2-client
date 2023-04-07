import { createStore } from "vuex";
import { auth } from "./modules/auth";
import { notifications } from "./modules/notifications";
import { videos } from "./modules/videos";
import { nuzlockes } from "./modules/nuzlockes";
import { pokemon } from "./modules/pokemon";
import { teams } from "./modules/teams";
import { pokeapi } from "./modules/pokeapi";

export interface State {
  title: "Nuzlocke DataBase";
}

export default createStore<State>({
  modules: {
    auth,
    notifications,
    videos,
    nuzlockes,
    pokemon,
    teams,
    pokeapi,
  },
  state: {
    title: "Nuzlocke DataBase",
  },
  getters: {},
  mutations: {},
  actions: {},
});
