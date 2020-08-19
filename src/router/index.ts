import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
        import(/* webpackChunkName: "register" */ "../views/Register.vue")
  },
  {
    path: "/party/list",
    name: "Party-List",
    component: () =>
      import(/* webpackChunkName: "larty-list" */ "../views/party/List.vue")
  },
  {
    path: "/party/create",
    name: "Party-Create"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!store.state.auth.token;
  if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  else if ((to.name === "Register" || to.name === "Login") && isAuthenticated) next({ name: "Home" });
  else next();
});

export default router;
