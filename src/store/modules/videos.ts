import { Module } from "vuex";
import { State } from "@/store/index";
import axios from "axios";

export interface VideosState {
  videos: [];
}

export const videos: Module<VideosState, State> = {
  modules: {},
  namespaced: true,
  state: {
    videos: [],
  },
  getters: {
    GET_VIDEOS: (state: VideosState) => state.videos,
  },
  mutations: {
    SET_VIDEOS: (state: VideosState, videos: []) => {
      state.videos = videos;
    },
  },
  actions: {
    FETCH_VIDEOS: ({ commit, state, dispatch }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${"http://localhost:5000/api"}/videos`)
          .then((res) => {
            commit("SET_VIDEOS", res.data.videos);
            resolve(res.data);
          })
          .catch((error) => {
            dispatch("auth/VALIDATE_ERROR", error, { root: true });
            reject(error.response);
          });
      });
    },
  },
};
