
import { structure } from "@/assets/content/structure.js";

/**
 * Follows the tree-structure of structure.js. The one exeptions is that each key gets
 * an additional empty string value key. This is done since it allows the menu's to also 
 * be styled, instead of just the endings.
 */
let themeStructure = {};

themeStructure = structure;

console.log("THEME");

export { themeStructure };