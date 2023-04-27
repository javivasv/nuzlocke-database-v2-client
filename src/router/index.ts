import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Home from "../views/Home.vue";
import IndexNuzlockes from "../views/Nuzlockes/index.vue";
import About from "../views/About.vue";
import Nuzlockes from "../views/Nuzlockes/Nuzlockes.vue";
import NuzlockeForm from "../views/Nuzlockes/NuzlockeForm.vue";
import Nuzlocke from "../views/Nuzlockes/Nuzlocke.vue";
import PokemonForm from "../views/Nuzlockes/PokemonForm.vue";
import TeamForm from "../views/Nuzlockes/TeamForm.vue";
import Login from "../views/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
    children: [
      {
        path: "home",
        name: "home",
        component: Home,
      },
      {
        path: "nuzlockes",
        name: "index-nuzlockes",
        component: IndexNuzlockes,
        children: [
          {
            path: "",
            name: "nuzlockes",
            component: Nuzlockes,
          },
          {
            path: "nuzlocke-form",
            name: "nuzlocke-form",
            component: NuzlockeForm,
          },
          {
            path: "nuzlocke/:nuzlockeId/nuzlocke-form",
            name: "edit-nuzlocke-form",
            component: NuzlockeForm,
          },
          {
            path: "nuzlocke/:nuzlockeId",
            name: "nuzlocke",
            component: Nuzlocke,
          },
          {
            path: "nuzlocke/:nuzlockeId/pokemon-form",
            name: "pokemon-form",
            component: PokemonForm,
          },
          {
            path: "nuzlocke/:nuzlockeId/pokemon/:pokemonId",
            name: "edit-pokemon-form",
            component: PokemonForm,
          },
          {
            path: "nuzlocke/:nuzlockeId/team-form",
            name: "team-form",
            component: TeamForm,
          },
          {
            path: "nuzlocke/:nuzlockeId/team/:teamId",
            name: "edit-team-form",
            component: TeamForm,
          },
        ],
      },
      {
        path: "about",
        name: "about",
        component: About,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/home",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  const token = window.localStorage.getItem("ndb_token");

  if (!token) {
    if (to.name === "login" || to.name === "home" || to.name === "about") {
      next();
    } else {
      next("/home");
    }
  } else {
    if (to.name === "login" || to.name === "dashboard") {
      next("/home");
    } else {
      next();
    }
  }
});

export default router;
