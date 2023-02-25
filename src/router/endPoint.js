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

        this.vueComponent = () => import(`@/${componentPath}`);
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

        if(this.componentName === "ExpandableImage") {
            this.props["src"] = require(`@/assets/images/${this.props["src"]}`);
        }
        else if(this.componentName === "ImageDoc") {
            this.props["imgSrc"] = require(`@/assets/images/${this.props["imgSrc"]}`);
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
