/**
 * This file contains the structure of the site through nested dictionaries. 
 * The keys combined give the slug of the page. The end of the strucutre is a vue
 * component which is rendered as the content of the page. 
 *  * 
 * img sources should be relative to "@/assets/images"
 */

import { Component } from "@/router/lazyLoadComponents.js";
import { Endpoint } from "@/router/endPoint.js";

import { characterStructure } from "./characters/structure.js";
import { lenovaStructure } from "./lenova/structure.js";


export const structure = {
    "Lenova": lenovaStructure,
    "Characters": characterStructure,
    "Julia": new Endpoint(Component.AccessDeniedView),  
};
