
import { Theme } from "@/styles/themes.js";

import { structure } from "./structure.js";
import { characterThemes } from "./characters/themes.js";
import { lenovaThemes } from "./lenova/themes.js";

/**
 * Follows the tree-structure of structure.js. The one exeptions is that each key gets
 * an additional empty string value key. This is done since it allows the menu's to also 
 * be styled, instead of just the endings.
 */
let themeStructure = {};

createThemeStructure(themeStructure, structure);

let overrideThemes = {
    "Lenova": lenovaThemes,
    "Characters": characterThemes,
};

applyOverrides(themeStructure, overrideThemes);

fillThemeStructure(themeStructure, Theme.Default);

export { themeStructure };

/**
 * Create an object which follows the same tree structure as 'structure'.
 * Except each key branch gets an additional leaf. 
 */
function createThemeStructure(themeStructure, structure) {

    for(let key in structure) {
        let value = structure[key];

        // Check for vue component, array (which contains an item from the component enum), or an item from the component enum
        if (typeof value === "function" || value instanceof Array || typeof value === "string") {
            themeStructure[key] = null;
            continue;
        }
        themeStructure[key] = {"": null};

        createThemeStructure(themeStructure[key], value);
    }
}

function applyOverrides(themeStructure, overrideThemes) {

    for(const [key, value] of Object.entries(overrideThemes)) {
        if (typeof value === "object" && value !== null) {
            applyOverrides(themeStructure[key], overrideThemes[key]);
        }
        else {
            themeStructure[key] = value;
        }
    }
}

/**
 * Fill the theme structure with themes. If a theme is already set,
 * then the theme cacasades down the tree. 
 */
function fillThemeStructure(themeStructure, theme) {

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
