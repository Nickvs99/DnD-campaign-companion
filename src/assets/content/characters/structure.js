import { Component } from "@/router/lazyLoadComponents.js";
import { Endpoint } from "@/router/endPoint.js";

export const characterStructure = {
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
};