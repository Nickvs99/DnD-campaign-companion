import { createRouter, createWebHistory } from "vue-router";

import { app } from "@/main.js";
import { structure } from "@/assets/content/structure.js";
import { themeStructure } from "@/assets/content/themeStructure";
import { sleep } from "@/util.js";

import { addStructureToRoutes, getTheme } from "./util.js";

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
router.beforeEach((to, from) => {

    app.isLoading = true;
    
    if (to.query.redirect) {
        let direct = to.query.redirect.replace(" ", "%20");
        router.replace(direct);
        return;
    }

    // Apply styling according to the themestructure
    let theme = getTheme(themeStructure, to.fullPath);
    setTheme(theme, from);
});

router.afterEach( () => {
    app.isLoading = false;
});

async function setTheme(theme, from) {

    /**
     * If no register property, then the theme will not transition smoothly, therefore the new theme
     * would already be updated before the content is updated. This manual sleep is to make sure that
     * the theme only applies when the content has faded out. The sleep time should be equal to the 
     * fade time in App.vue. Except on initial page load
     */
    if (!CSS.registerProperty && from.href != undefined) {
        await sleep(500);
    }

    document.getElementById("app").setAttribute("theme", theme);
}

export default router;
