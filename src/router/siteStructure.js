/**
 * This file contains the structure of the site through nested dictionaries. 
 * The keys combined give the slug of the page. The end of the strucutre is a vue
 *  component which is rendered as the content of the page. 
 * 
 * The keys can not have spaces, otherwise redirects within a google doc stop working.
 */

import DisplayMenu from "@/components/DisplayMenu.vue";
import GoogleDoc from "@/components/GoogleDoc.vue";
import TempView from "@/views/TempView.vue";

import { Endpoint } from "@/router/endPoint.js";

export const structure = {
    "": {
        "Lenova": {
            "Session_recap": new Endpoint(GoogleDoc, {"src": "https://docs.google.com/document/d/e/2PACX-1vQntHl593EJQ8-uDr3-RxkAVt82--xxKyMOHRISDrqJSSVnXrB2DdhyQeDUFNOIWXv_q6LBTDX7PRUu/pub?embedded=true"})
        },
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
        if(typeof value.render === "function"){
            routes.push({path: slug, component: value});
        }
        else if (value instanceof Endpoint) {
            routes.push({path: slug, component: value.vueComponent, props: value.props});
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
