/**
 * This file contains the structure of the site through nested dictionaries. 
 * The keys combined give the slug of the page. The end of the strucutre is a vue
 * component which is rendered as the content of the page. 
 *  * 
 * img sources should be relative to "@/assets/images"
 */

import ExpandableImage from "@/components/ExpandableImage.vue";
import GoogleDoc from "@/components/GoogleDoc.vue";
import ImageDoc from "@/components/ImageDoc.vue";
import InboxLogin from "@/components/InboxLogin.vue";
import MailBox from "@/components/MailBox.vue";

import TempView from "@/views/TempView.vue";

import { Endpoint } from "@/router/endPoint.js";
import { hashCode } from "@/util.js";

import { lenovaPersonalCodes, lenovaMessages } from "@/assets/content/lenovaMessages.js";

export const structure = {
    "Lenova": {
        "Session recap": new Endpoint(GoogleDoc, {"src": "https://docs.google.com/document/d/e/2PACX-1vQntHl593EJQ8-uDr3-RxkAVt82--xxKyMOHRISDrqJSSVnXrB2DdhyQeDUFNOIWXv_q6LBTDX7PRUu/pub?embedded=true"}),
        "Maps": {
            "Overview": new Endpoint(ImageDoc, {"docSrc": "https://docs.google.com/document/d/e/2PACX-1vQntHl593EJQ8-uDr3-RxkAVt82--xxKyMOHRISDrqJSSVnXrB2DdhyQeDUFNOIWXv_q6LBTDX7PRUu/pub?embedded=true",
                "imgSrc": "lenova/worldmap.jpg"},
            ),
            "Virdos": new Endpoint(ExpandableImage, {"src": "lenova/virdos.jpg"})
        },
        "Inbox": InboxLogin,
        "messages": CreateMessageRoutes(lenovaMessages, lenovaPersonalCodes),       
    },
    "Characters": {
        "Balro": TempView,
        "Siren": TempView,
        "Ginger": TempView,
        "Grug": TempView,
        "Safqwyn": {
            "Druid": TempView,
            "Fighter": TempView,
        }
    },
    "Julia": TempView,  
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
        routes[hash] = new Endpoint(MailBox, {"messages": messageMap[hash]});
    }

    return routes;

}