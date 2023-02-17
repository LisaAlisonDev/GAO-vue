import { createRouter, createWebHistory } from "vue-router";
import Computers from "../views/Computers.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "computers",
      component: Computers,
    },
  ],
});

export default router;
