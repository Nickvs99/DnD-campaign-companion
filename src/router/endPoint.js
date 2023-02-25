/** 
 * This class is used when additional data, such as props, is required at 
 * the final value of the siteStructure. It also simplifies the needed information
 * on the structure object.
 * 
 * The componentPath should be relative to the src directory.
 */
export class Endpoint {
    
    constructor(componentPath, props = {}) {

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
        // TODO this does not work yet
        if(this.vueComponent.name === "ExpandableImage") {
            this.props["src"] = require(`@/assets/images/${this.props["src"]}`);
        }
        else if(this.vueComponent.name === "ImageDoc") {
            this.props["imgSrc"] = require(`@/assets/images/${this.props["imgSrc"]}`);
        }
    }
}
