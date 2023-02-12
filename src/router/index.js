import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import { structure, addStructureToRoutes } from "./siteStructure";

/**
 * These routes are manually added and should only be added if it does not follow
 * the siteStructure structure.
 */
const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    },
    {
        path: "/docs",
        name: "docs",
        component: () => import(/* webpackChunkName: "docs" */ "../views/GoogleDocs.vue"), 
    }
];

addStructureToRoutes(routes, structure);

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
