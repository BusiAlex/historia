import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        requiresAuth: false,
        title: "Home / História",
      },
    },
    {
      path: "/EventsListWithContent/:countryId",
      name: "EventsListWithContent",
      component: () => import("../views/EventsListWithContent.vue"),
      meta: {
        requiresAuth: false,
        title: "Események és tartalmuk / História",
      },
    },
    
    {
      path: "/textareatest",
      name: "textareatest",
      component: () => import("../views/EventEditor.vue"),
      meta: {
        requiresAuth: false,
        title: "Test / historia",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        requiresAuth: false,
        title: "Login / Taxi",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "PageNotFound",
      component: () => import("../views/404View.vue"),
      meta: {
        requiresAuth: false,
        title: "404 / Taxi",
      },
    },
  ],
});

export default router;
