/** 
 * This class is used when additional data, such as props, is required at 
 * the final value of the siteStructure.
  */
export class Endpoint {
    
    constructor(vueComponent, props = {}) {
        this.vueComponent = vueComponent;
        this.props = props;
    }
}
