import DisplayMenu from "@/components/DisplayMenu.vue";
import InvalidCodeView from "@/views/InvalidCodeView.vue";

import { Endpoint } from "@/router/endPoint.js";

export function addStructureToRoutes(routes, structure, prefix="") {

    // Create a DisplayMenu to navigate the site
    let items = Object.keys(structure);

    // Remove messages from the click-through items
    items = items.filter(item => item !== "messages");

    routes.push({path: prefix, component: DisplayMenu, props: {items: items}});

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
