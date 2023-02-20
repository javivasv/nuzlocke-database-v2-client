import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Dashboard,
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
