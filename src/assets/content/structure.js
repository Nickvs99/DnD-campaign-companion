/**
 * This file contains the structure of the site through nested dictionaries. 
 * The keys combined give the slug of the page. The end of the strucutre can be
 *  - A vue component 
 *  - An item from the Component enum
 *  - An array with An item from the Component enum at index 0 and
 *      a dict of props at index 1.
 */

import { Component } from "@/router/lazyLoadComponents.js";

import { characterStructure } from "./characters/structure.js";
import { lenovaStructure } from "./lenova/structure.js";


export const structure = {
    "Lenova": lenovaStructure,
    "Characters": characterStructure,
    "Julia": Component.AccessDeniedView,  
};
