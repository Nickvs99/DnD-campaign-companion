<template>

<div class="character-page-container">

    <h1>{{ name }}</h1>
    <h2>{{ race }}</h2>
    <h2>{{ className }} - {{ subclass }}</h2>
    <h2>Level: {{ level }}</h2>

    <div class="stat-block-container" v-if="stats[0].value != null">
        <StatBlock v-for="stat in stats" :key="stat.name" :name="stat.name" :value="stat.value"/>
    </div>
</div>

</template>

<script>
import StatBlock from "@/components/StatBlock.vue";
import data from "@/assets/character.json";

export default {
    name: "CharacterView",
    components: { StatBlock },
    props: {
        "character_id": {
            required: true,
            type: String,
        }
    },
    data() {
        return {
            data: data,
            name: null,
            race: null,
            className: null,
            subclass: null,
            level: null,
            stats: [
                {"name": "Strength", "value": null},
                {"name": "Dexterity", "value": null},
                {"name": "Constitution", "value": null},
                {"name": "Intelligence", "value": null},
                {"name": "Wisdom", "value": null},
                {"name": "Charisma", "value": null},
            ]
        };
    },
    mounted() {
        this.parseJsonResponse(this.data);
    },
    methods: {
        parseJsonResponse(json) {
            this.setClass(json);
            this.setLevel(json);
            this.setName(json);
            this.setRace(json);
            this.setStats(json);
        },
        setClass(json) {

            let classes = json.data.classes;
            if (classes.length !== 1) {
                alert("This page does not work yet with Multiclassing. Please notify Nick :) ");
            }

            this.className = classes[0].definition.name;
            this.subclass = classes[0].subclassDefinition.name;
        },
        setLevel(json) {

            let level = 0;
            for(let clss of json.data.classes) {
                level += clss.level;
            }
            this.level = level;
        },
        setName(json) {
            this.name = json.data.name;
        },
        setRace(json) {
            this.race = json.data.race.fullName;
        },
        setStats(json) {
            let baseStats = json.data.stats;
            let bonusStats = json.data.bonusStats;

            for(let i = 0; i < baseStats.length; i ++) {
                this.stats[i].value = baseStats[i].value + bonusStats[i].value;
            }

            // Racial bonus and ability score improvment
            let raceModifiers = json.data.modifiers.race;
            let classModifiers = json.data.modifiers.class;

            let modifiers = raceModifiers.concat(classModifiers);
            for(let modifier of modifiers) {
                
                // Stat modifiers are of type bonus and the subtype is written like 'statName'-score
                // e.g. strength-score
                if(modifier.type !== "bonus" || !modifier.subType.endsWith("-score")) {
                    continue;
                }

                let statName = modifier.subType.split("-")[0];
                let statIndex = this.stats.findIndex(stat => stat.name.toLowerCase() === statName);
                
                this.stats[statIndex].value += modifier.value;
            }
        }
    }
};

</script>

