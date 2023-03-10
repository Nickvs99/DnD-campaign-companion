/**
 * This file contains the structure of the site through nested dictionaries. 
 * The keys combined give the slug of the page. The end of the strucutre is a vue
 * component which is rendered as the content of the page. 
 *  * 
 * img sources should be relative to "@/assets/images"
 */

import { Endpoint } from "@/router/endPoint.js";
import { Component } from "@/router/lazyLoadComponents";
import { hashCode } from "@/util.js";

import { lenovaPersonalCodes, lenovaMessages } from "@/assets/content/lenovaMessages.js";

export const structure = {
    "Lenova": {
        "Session recap": new Endpoint(Component.GoogleDocView, {"src": "https://docs.google.com/document/d/e/2PACX-1vQntHl593EJQ8-uDr3-RxkAVt82--xxKyMOHRISDrqJSSVnXrB2DdhyQeDUFNOIWXv_q6LBTDX7PRUu/pub?embedded=true"}),
        "Maps": {
            "Overview": new Endpoint(Component.ImageDocView, {
                "docSrc": "https://docs.google.com/document/d/e/2PACX-1vQntHl593EJQ8-uDr3-RxkAVt82--xxKyMOHRISDrqJSSVnXrB2DdhyQeDUFNOIWXv_q6LBTDX7PRUu/pub?embedded=true",
                "imgSrc": "lenova/worldmap.jpg"
            }),
            "Virdos": new Endpoint(Component.ImageView, {"src": "lenova/virdos.jpg"})
        },
        "Inbox": new Endpoint(Component.InboxLoginView),
        "messages": CreateMessageRoutes(lenovaMessages, lenovaPersonalCodes),       
    },
    "Characters": {
        "empty": {
            "Balro": new Endpoint(Component.CharacterView, {"ID": "53799196"}),
            "Siren": new Endpoint(Component.CharacterView, {"ID": "87953644"}),
            "Ginger": new Endpoint(Component.CharacterView, {"ID": "49093889"}),
            "Grug": new Endpoint(Component.UnderConstructionView),
            "Safqwyn": {
                "Druid": new Endpoint(Component.UnderConstructionView),
                "Fighter": new Endpoint(Component.UnderConstructionView),
            }
        },
    },
    "Julia": new Endpoint(Component.AccessDeniedView),  
};

function CreateMessageRoutes(messageData, validPersonalCodes) {

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
        routes[hash] = new Endpoint(Component.InboxView, {"messages": messageMap[hash]});
    }

    return routes;

}