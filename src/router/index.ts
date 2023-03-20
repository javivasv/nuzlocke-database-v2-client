import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Home from "../views/Home.vue";
import Nuzlockes from "../views/Nuzlockes.vue";
import About from "../views/About.vue";
import NuzlockeForm from "../views/NuzlockeForm.vue";
import Nuzlocke from "../views/Nuzlocke.vue";
import PokemonForm from "../views/PokemonForm.vue";
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
        name: "nuzlockes",
        component: Nuzlockes,
      },
      {
        path: "about",
        name: "about",
        component: About,
      },
      {
        path: "nuzlocke-form",
        name: "nuzlocke-form",
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
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  const token = window.localStorage.getItem("pndb_token");

  if (!token) {
    if (to.name === "login" || to.name === "home" || to.name === "about") {
      next();
    } else {
      next("/home");
    }
  } else {
    if (to.name === "login") {
      next("/home");
    } else {
      next();
    }
  }
});

export default router;

// {
// path: "/about",
// name: "about",
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () =>
//   import(/* webpackChunkName: "about" */ "../views/About.vue"),
// },
