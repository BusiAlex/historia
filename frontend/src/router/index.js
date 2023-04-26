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
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
      meta: {
        requiresAuth: false,
        title: "About / Taxi",
      },
    },
    {
      path: "/taxiFuvarjai",
      name: "taxiFuvarjai",
      component: () => import("../views/TaxiFuvarjaiView.vue"),
      meta: {
        requiresAuth: false,
        title: "Taxi fuvarjai / Taxi",
      },
    },
    {
      path: "/taxiKezeles",
      name: "taxiKezeles",
      component: () => import("../views/TaxiKezelesView.vue"),
      meta: {
        requiresAuth: true,
        title: "Taxi Kezelés / Taxi",
      },
    },
    {
      path: "/fuvarBevitel",
      name: "fuvarBevitel",
      component: () => import("../views/FuvarBevitel.vue"),
      meta: {
        requiresAuth: true,
        title: "Fuvar bevitel / Taxi",
      },
    },
    {
      path: "/count1",
      name: "count1",
      component: () => import("../views/Count1View.vue"),
      meta: {
        requiresAuth: false,
        title: "Counter 1 / Taxi",
      },
    },
    {
      path: "/count2",
      name: "count2",
      component: () => import("../views/Count2View.vue"),
      meta: {
        requiresAuth: false,
        title: "Counter 2 / historia",
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
