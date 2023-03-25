import { hashCode } from "@/util.js";
import { Theme } from "@/styles/themes.js";

import { Component } from "./lazyLoadComponents.js";
import { Endpoint } from "./endPoint.js";
import router from "./index.js";

export function addStructureToRoutes(routes, structure, prefix="") {

    // Create a DisplayMenu to navigate the site
    let keys = Object.keys(structure);

    // Remove messages from the click-through items
    keys = keys.filter(key => key !== "messages");

    // Check if there is only one item to click through, automatically forward if so
    if(keys.length == 1 && structure[keys[0]].constructor == Object) {
        let key = keys[0];
        let value = structure[keys[0]];

        const slug = `${prefix}/${key}`.replace(" ", "%20");

        routes.push({path: prefix, redirect: slug});
        addStructureToRoutes(routes, value, slug);
        return;
    }

    if(prefix.endsWith("messages")) {
        // Redirect to inbox
        let redirectPath = prefix.split("/").slice(0, -1).join("/") + "/Inbox";
        routes.push({path: prefix, redirect: redirectPath});
    }
    else {
        routes.push({path: prefix, component: () => import(`@/${Component.ClickThroughView}`), props: {items: keys}});
    }

    for(const key in structure) {
        
        const value = structure[key];

        const slug = `${prefix}/${key}`.replace(" ", "%20");

        // Restrict certain keys 
        if(["messages", "Julia"].includes(key)) {
            routes.push({path: `${slug}/:param`, component: () => import(`@/${Component.AccessDeniedView}`)});
        }
        console.log(key, value, Object.values(Component).includes(value));
        // Check if value is a vue component
        if(typeof value.render === "function"){
            routes.push({path: slug, component: value});
        }
        else if (value instanceof Array || typeof value === "string") {
            
            let endPoint;
            if(value instanceof Array) {
                endPoint = new Endpoint(...value);
            }
            else {
                endPoint = new Endpoint(value);
            }

            if(endPoint.componentName == "CalendarMonthView") {

                // A calendar needs both the month as well as the day view, furthermore
                // a click through menu is shown when a user navigates to just the year path.
                // User created events are created at the new path
                let yearPath = `${slug}/:year`;
                let monthPath = `${yearPath}/:month`;
                let dayPath = `${monthPath}/:day`;
                let newPath = `${slug}/new`;

                let calendar = endPoint.props.calendar;
                let yearEndPoint = new Endpoint(Component.ClickThroughView, {items: calendar.monthNames});
                let dayEndpoint = new Endpoint(Component.CalendarDayView);
                let newEndpoint = new Endpoint(Component.CreateCalendarEventView, {calendar: calendar});

                // Redirect to the current date
                let currentDatePath = `${slug}/${calendar.currentYear}/${calendar.currentMonth}`;
                
                routes.push({path: slug, redirect: currentDatePath});
                routes.push({path: yearPath, component: yearEndPoint.vueComponent, props: yearEndPoint.props});
                routes.push({path: monthPath, component: endPoint.vueComponent, props: endPoint.props});
                routes.push({path: dayPath, component: dayEndpoint.vueComponent, props: endPoint.props});
                routes.push({path: newPath, component: newEndpoint.vueComponent, props: newEndpoint.props});
            }
            else {
                routes.push({path: slug, component: endPoint.vueComponent, props: endPoint.props});
            }
        }
        else {
            // Recursively add to the routes, with an updated prefix
            addStructureToRoutes(routes, value, slug);
        }
    }
}

/**
 * Get the appropiate theme from the path. The path is split. These items are
 * used to traverse the themeStructure, until all items have been enumerated.
 * If the end is a string, then that is simply the theme name, else we take 
 * the empty string as a key for its theme name.
 */
export function getTheme(themeStructure, path) {

    let tempStructure = themeStructure;
    let pathSplit = path.replace("%20", " ").split("/").filter(item => item != "");

    for(let item of pathSplit) {

        // We might reach the end of the themestructure even though we
        // haven't looped over all items in the pathSplit. This is due to 
        // dynamic routing.
        if(typeof tempStructure === "string") {
            return tempStructure;
        }

        if (item in tempStructure) {
            tempStructure = tempStructure[item];
        }
        else {
            return Theme.Default;
        }
    }
    
    if(typeof tempStructure === "string") {
        return tempStructure;
    }

    if ("" in tempStructure) {
        return tempStructure[""];
    }

    return Theme.Default;
}

export function CreateMessageRoutes(messageData, validPersonalCodes) {

    // Collect messages for each hash
    let messageMap = {};
    for(let row of messageData)
    {
        let personalCode = row[0];
        let DmCode = row[1];
        let message = row[2];
        let messageStyle = row[3]; 

        if(!validPersonalCodes.includes(personalCode)) {
            throw new Error(`${personalCode} is not a valid personal code.`);
        }

        let hash = hashCode(personalCode + DmCode);

        if(!(hash in messageMap))
        {
            messageMap[hash] = [];
        }

        messageMap[hash].push({"message": message, "messageStyle": messageStyle});
    }

    // Create routes with the messages
    let routes = {};
    for(let hash in messageMap)
    {
        routes[hash] = [Component.InboxView, {"messages": messageMap[hash]}];
    }

    return routes;
}

export async function prefetchComponents(...components) {

    for(let component of components) {
        import(`@/${component}`);
    }
}

export async function prefetchComponentsFromRoutes(...routes) {

    for (let route of routes) {
        let routeObj = router.getRoutes().find(obj => obj.path == route);
        if (!routeObj) return;
        
        let component = routeObj.components;

        // Trigger the component import by calling the default variable
        // If the component is already loaded then it's value has
        // been changed to an object and is thus not called.
        if (typeof component?.default === "function") {
            component.default();
        }
    }
}
