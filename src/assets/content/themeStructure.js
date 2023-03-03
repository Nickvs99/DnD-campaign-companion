
import { structure } from "@/assets/content/structure.js";
import { createThemeTreeStructure } from "@/router/util.js";
import { Theme } from "@/assets/content/themes.js";

/**
 * Follows the tree-structure of structure.js. The one exeptions is that each key gets
 * an additional empty string value key. This is done since it allows the menu's to also 
 * be styled, instead of just the endings.
 */
let themeStructure = {};

createThemeTreeStructure(themeStructure, structure);


// Overrides
themeStructure["Characters"]["empty"]["Grug"] = Theme.Grug;
themeStructure["Lenova"][""] = Theme.Lenova;

export { themeStructure };