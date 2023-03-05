import { Component } from "@/router/lazyLoadComponents.js";

import { Endpoint } from "@/router/endPoint.js";

import { Theme } from "@/assets/content/themes.js";

export function addStructureToRoutes(routes, structure, prefix="") {

    // Create a DisplayMenu to navigate the site
    let keys = Object.keys(structure);

    // Remove messages from the click-through items
    keys = keys.filter(key => key !== "messages");

    // Check if there is only one item to click through, automatically forward if so
    if(keys.length == 1 && structure[keys[0]].constructor == Object) {
        let key = keys[0];
        let value = structure[keys[0]];

        const slug = `${prefix}/${key}`.replace(" ", "%20");

        routes.push({path: prefix, redirect: slug});
        addStructureToRoutes(routes, value, slug);
        return;
    }

    if(prefix.endsWith("messages")) {
        // Redirect to inbox
        let redirectPath = prefix.split("/").slice(0, -1).join("/") + "/Inbox";
        routes.push({path: prefix, redirect: redirectPath});
    }
    else {
        routes.push({path: prefix, component: () => import(`@/${Component.ClickThroughView}`), props: {items: keys}});
    }

    for(const key in structure) {
        
        const value = structure[key];

        const slug = `${prefix}/${key}`.replace(" ", "%20");

        // Restrict certain keys 
        if(["messages", "Julia"].includes(key)) {
            routes.push({path: `${slug}/:param`, component: () => import(`@/${Component.AccessDeniedView}`)});
        }

        // Check if value is a vue component
        if(typeof value.render === "function"){
            routes.push({path: slug, component: value});
        }
        else if (value instanceof Endpoint) {
            routes.push({path: slug, component: value.vueComponent, props: value.props});
        }
        else {
            // Recursively add to the routes, with an updated prefix
            addStructureToRoutes(routes, value, slug);
        }
    }
}

/**
 * Create an object which follows the same tree structure as 'structure'.
 * Except each key branch gets an additional leaf. 
 */
export function createThemeStructure(themeStructure, structure) {

    for(let key in structure) {
        let value = structure[key];

        if (typeof value === "function" || value instanceof Endpoint) {
            themeStructure[key] = null;
            continue;
        }
        themeStructure[key] = {"": null};

        createThemeStructure(themeStructure[key], value);
    }
}

/**
 * Fill the theme structure with themes. If a theme is already set,
 * then the theme cacasades down the tree. 
 */
export function fillThemeStructure(themeStructure, theme) {

    let currentTheme = theme;

    // Cascade the theme to its siblings
    if("" in themeStructure && themeStructure[""] !== null) {
        currentTheme = themeStructure[""];
    }

    for(let key in themeStructure) {
        let value = themeStructure[key];
        
        if (typeof value === "object" && value !== null) {
            fillThemeStructure(value, currentTheme);
        }
        else if (value === null) {
            themeStructure[key] = currentTheme;
        }
    }
}

/**
 * Get the appropiate theme from the path. The path is split. These items are
 * used to traverse the themeStructure, until all items have been enumerated.
 * If the end is a string, then that is simply the theme name, if not it can be
 * an object. Then we take the empty string as a key for its theme name.
 */
export function getTheme(themeStructure, path) {

    let tempStructure = themeStructure;
    let pathSplit = path.replace("%20", " ").split("/").filter(item => item != "");

    for(let item of pathSplit) {

        if (item in tempStructure) {
            tempStructure = tempStructure[item];
        }
        else {
            return Theme.Default;
        }
    }
    
    if(typeof tempStructure === "string") {
        return tempStructure;
    }

    if ("" in tempStructure) {
        return tempStructure[""];
    }

    return Theme.Default;
}