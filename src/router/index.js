import { createRouter, createWebHistory } from "vue-router";

import { structure } from "@/assets/content/structure.js";
import { addStructureToRoutes, getTheme } from "@/router/util.js";
import { themeStructure } from "@/assets/content/themeStructure";

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
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

/**
 * Since this is a SPA, directly going to a url like /lenova/... would not work, when
 * the site is published on github pages. Instead github pages would throw a 404 error. 
 * This then displays the 404.html in the public directory. This file redirects to the index
 * page with a string query. This string query is catched by vue and the user is redirected
 * accordingly.
 */
router.beforeEach((to) => {
    if (to.query.redirect) {
        let direct = to.query.redirect.replace(" ", "%20");
        router.replace(direct);
        return;
    }

    // Apply styling according to the themestructure
    let theme = getTheme(themeStructure, to.fullPath);
    document.getElementById("app").setAttribute("theme", theme);
});

export default router;
