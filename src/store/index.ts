import { createStore } from "vuex";
import { auth } from "./modules/auth";
import { notifications } from "./modules/notifications";
import { videos } from "./modules/videos";
import { nuzlockes } from "./modules/nuzlockes";
import { pokemon } from "./modules/pokemon";
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
    pokeapi,
  },
  state: {
    title: "Nuzlocke DataBase",
  },
  getters: {},
  mutations: {},
  actions: {},
});
