import { createStore } from "vuex";
import { auth } from "./modules/auth";
import { nuzlockes } from "./modules/nuzlockes";

export interface State {
  title: "Nuzlocke DataBase";
}

export default createStore<State>({
  modules: {
    auth,
    nuzlockes,
  },
  state: {
    title: "Nuzlocke DataBase",
  },
  getters: {},
  mutations: {},
  actions: {},
});
