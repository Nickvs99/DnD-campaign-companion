import { Component } from "@/router/lazyLoadComponents.js";
import { CreateMessageRoutes } from "@/router/util.js";

import { lenovaCalendar } from "./calendar.js";
import { lenovaPersonalCodes, lenovaMessages } from "./messages.js";

export const lenovaStructure = {
    "Session recap": [Component.GoogleDocView, {"src": "https://docs.google.com/document/d/e/2PACX-1vQntHl593EJQ8-uDr3-RxkAVt82--xxKyMOHRISDrqJSSVnXrB2DdhyQeDUFNOIWXv_q6LBTDX7PRUu/pub?embedded=true"}],
    "Maps": {
        "Overview": [Component.ImageDocView, {
            "docSrc": "https://docs.google.com/document/d/e/2PACX-1vQntHl593EJQ8-uDr3-RxkAVt82--xxKyMOHRISDrqJSSVnXrB2DdhyQeDUFNOIWXv_q6LBTDX7PRUu/pub?embedded=true",
            "imgSrc": "lenova/worldmap.jpg"
        }],
        "Virdos": [Component.ImageView, {"src": "lenova/virdos.jpg"}],
    },
    "Inbox": Component.InboxLoginView,
    "messages": CreateMessageRoutes(lenovaMessages, lenovaPersonalCodes),    
    "Calendar": [Component.CalendarMonthView, {"calendar": lenovaCalendar}],
};
