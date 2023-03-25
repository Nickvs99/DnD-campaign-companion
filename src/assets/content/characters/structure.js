import { Component } from "@/router/lazyLoadComponents.js";

export const characterStructure = {
    "empty": {
        "Balro": [Component.CharacterView, {"ID": "53799196"}],
        "Siren": [Component.CharacterView, {"ID": "87953644"}],
        "Ginger": [Component.CharacterView, {"ID": "49093889"}],
        "Grug": [Component.UnderConstructionView],
        "Safqwyn": {
            "Druid": Component.UnderConstructionView,
            "Fighter": Component.UnderConstructionView,
        }
    },
};