<template>

<div class="character-page-container">

    <div ref="imgContent" class="img-content">
        <div class="image-content-title">{{ name }}</div>
        <div class="image-content-text">Level {{ level }}<DotSeperator/>{{ race }}</div>
        <div class="image-content-text">{{ className }} - {{ subclass }}</div>

        <a :href="characterPageUrl" target="_blank">
            <OpenExternal class="open-external-svg"/>
        </a>
    </div>

    <div class="stat-container" v-if="stats[0].value != null">
        <StatBlock v-for="stat in stats" :key="stat.name" :name="stat.name" :value="stat.value"/>
    </div>

    <div v-if="description">
        {{  description  }}
    </div>
</div>

</template>

<script>

import OpenExternal from "@/assets/icons/OpenExternal.vue";
import DotSeperator from "@/components/DotSeperator.vue";
import StatBlock from "@/components/StatBlock.vue";
import data from "@/assets/character.json";

export default {
    name: "CharacterView",
    components: { DotSeperator, OpenExternal, StatBlock },
    props: {
        "character_id": {
            required: true,
            type: String,
        }
    },
    data() {
        return {
            data: data,
            
            characterPageUrl: "",
            className: null,
            description: null,
            imgSrc: "",
            level: null,
            name: null,
            race: null,
            stats: [
                {"name": "Strength", "value": null},
                {"name": "Dexterity", "value": null},
                {"name": "Constitution", "value": null},
                {"name": "Intelligence", "value": null},
                {"name": "Wisdom", "value": null},
                {"name": "Charisma", "value": null},
            ],   
            subclass: null,
  
        };
    },
    mounted() {
        this.parseJsonResponse(this.data);
    },
    methods: {
        parseJsonResponse(json) {
            this.setCharacterPageUrl(json);
            this.setClass(json);
            this.setDescription(json);
            this.setImgSrc(json);
            this.setLevel(json);
            this.setName(json);
            this.setRace(json);
            this.setStats(json);

            this.$refs.imgContent.style.backgroundImage = "url(" + this.imgSrc + ")";
        },
        setCharacterPageUrl(json) {
            this.characterPageUrl = json.data.readonlyUrl;
        },
        setClass(json) {

            let classes = json.data.classes;
            if (classes.length !== 1) {
                alert("This page does not work yet with Multiclassing. Please notify Nick :) ");
            }

            this.className = classes[0].definition.name;
            this.subclass = classes[0].subclassDefinition.name;
        },
        setDescription(json) {
            this.description = json.data.notes.otherNotes;
        },
        setImgSrc(json) {
            
            if(json.data.decorations.avatarUrl) {
                this.imgSrc = json.data.decorations.avatarUrl;
            }
            else {
                this.imgSrc = require("@/assets/images/default-avatar.jpg");
            }
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
                
                const validSubTypes = ["strength-score", "dexterity-score", "constitution-score", "intelligence-score", "wisdom-score", "charisma-score"];
                if(modifier.type !== "bonus" || !validSubTypes.includes(modifier.subType)) {
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

<style lang="scss">

.character-page-container {
    margin: 1rem 0;
}

.img-content {

    // Adjust font since the background will always be dark-ish
    --font-color: antiquewhite;
    
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    row-gap: 0.25rem;
    
    aspect-ratio: 1/1;
    background-size: cover;

    border-radius: 10px;
    padding: 0.5rem;
    margin: 0.5rem 0;
    
    isolation: isolate;

    &::before{
        content: "";
        position: absolute;
        inset: 0;

        z-index: -1;

        border-radius: inherit;

        background: linear-gradient(
            0deg, 
            rgba(0,0,0,0.5),
            rgba(0,0,0,0)
        );
    }
}

.image-content-title {
    font-size: 2rem;
    font-weight: bold;

    color: var(--font-color);
}

.image-content-text {
    font-size: 1.25rem;
}

.stat-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
    margin: 1rem 0;  
}

.open-external-svg {
    position: absolute;
    inset: 1rem 1rem auto auto;
    background-color: rgba(0,0,0,0.25);
}

</style>
