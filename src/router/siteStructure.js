/**
 * This file contains the structure of the site through nested dictionaries. 
 * The keys combined give the slug of the page. The end of the strucutre is a vue
 *  component which is rendered as the content of the page.
 */

import TempView from "../views/TempView.vue";
import DisplayMenu from "@/components/DisplayMenu.vue";

export const structure = {
    "": {
        "Lenova": TempView,
        "Characters": {
            "Balro": TempView,
            "Siren": TempView,
            "Ginger": TempView,
            "Grug": TempView,
            "Safqwyn": {
                "Druid": TempView,
                "Fighter": TempView,
            }
        },
        "Julia": TempView,  
    }
};

export function addStructureToRoutes(routes, structure, prefix="") {

    for(const key in structure) {
        
        const value = structure[key];

        const slug = `${prefix}/${key}`;

        // Check if value is a vue component
        if(value && typeof value.render === "function"){
            routes.push({path: slug, component: value});
        }
        else {
            // Add a DisplayMenu to navigate the site
            let items = Object.keys(value);
            routes.push({path: slug, component: DisplayMenu, props: {items: items}});
            
            // Recursively add to the routes, with an updated prefix
            addStructureToRoutes(routes, value, slug);
        }
    }
}
