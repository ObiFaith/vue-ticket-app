import { createRouter, createWebHistory } from "vue-router";
import { Login, Signup } from "../views/index";

const routes = [
  { path: "/auth/login", component: Login },
  { path: "/auth/signup", component: Signup },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
