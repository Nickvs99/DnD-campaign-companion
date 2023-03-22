import { ParseEvents } from "./calendarUtil.js";

/** 
 * This class is used when additional data, such as props, is required at 
 * the final value of the siteStructure. It also simplifies the needed information
 * on the structure object.
 * 
 * The componentPath should be relative to the src directory.
 */
export class Endpoint {
    
    constructor(componentPath, props = {}) {

        this.componentName = this.getComponentName(componentPath);

        this.vueComponent = () => import(/* webpackChunkName: "[request]" */ `@/${componentPath}`);
        this.props = props;

        this.parseProps();
    }

    /**
     * Parses the props to simplify the structure input.
     * 
     * Checking type of vuecomponent could also be done by importing the component
     * and then using instanceof, but that requires additional imports.
     */
    parseProps() {

        if(this.componentName === "ImageView") {
            this.props["src"] = require(`@/assets/images/${this.props["src"]}`);
        }
        else if(this.componentName === "ImageDocView") {
            this.props["imgSrc"] = require(`@/assets/images/${this.props["imgSrc"]}`);
        }
        else if(this.componentName === "CharacterView") {
            this.props["data"] = require(`@/assets/characters/${this.props["ID"]}.json`);
        }
        else if(this.componentName === "CalendarMonthView") {
            this.props.calendar.events = ParseEvents(this.props.calendar);
        }
    }

    getComponentName(componentPath) {

        // Get filename of path
        let pathSplit = componentPath.split("/");
        let last = pathSplit[pathSplit.length - 1];

        // remove extension
        return last.split(".").slice(0, -1).join(".");
    }
}
