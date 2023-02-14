import { createRouter, createWebHashHistory } from "vue-router";

import { structure, addStructureToRoutes } from "./siteStructure";

/**
 * These routes are manually added and should only be added if it does not follow
 * the siteStructure structure.
 */
const routes = [
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
        path: "/:catchAll(.*)",
        component: () =>
            import(/* webpackChunkName: "404" */ "@/views/404View.vue"),
    }
];

addStructureToRoutes(routes, structure);

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
});

export default router;
