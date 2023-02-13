/** 
 * This class is used when additional data, such as props, is required at 
 * the final value of the siteStructure. It also simplifies the needed information
 * on the structure object.
  */
export class Endpoint {
    
    constructor(vueComponent, props = {}) {
        this.vueComponent = vueComponent;
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

        if(this.vueComponent.name === "ExpandableImage") {
            this.props["src"] = require(`@/assets/images/${this.props["src"]}`);
        }
        else if(this.vueComponent.name === "ImageDoc") {
            this.props["imgSrc"] = require(`@/assets/images/${this.props["imgSrc"]}`);
        }
    }
}
