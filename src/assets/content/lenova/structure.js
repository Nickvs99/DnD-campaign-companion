import { Component } from "@/router/lazyLoadComponents.js";
import { CreateMessageRoutes } from "@/router/util.js";
import { Endpoint } from "@/router/endPoint.js";

import { lenovaPersonalCodes, lenovaMessages } from "./messages.js";

export const lenovaStructure = {
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
};
