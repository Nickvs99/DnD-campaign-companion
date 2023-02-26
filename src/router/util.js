import DisplayMenu from "@/components/DisplayMenu.vue";
import InvalidCodeView from "@/views/InvalidCodeView.vue";

import { Endpoint } from "@/router/endPoint.js";

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

        // 
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
        routes.push({path: prefix, component: DisplayMenu, props: {items: keys}});
    }

    for(const key in structure) {
        
        const value = structure[key];

        const slug = `${prefix}/${key}`.replace(" ", "%20");

        // Catch invalid codes 
        if(key === "messages") {
            routes.push({path: `${slug}/:code`, component: InvalidCodeView});
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
