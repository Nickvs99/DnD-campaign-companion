<template>

<div class="character-page-container">

    <div v-if="valid">
        <div ref="imgContent" class="img-content">
            <div class="image-content-title">{{ name }}</div>
            <div class="image-content-text">Level {{ level }}<DotSeperator/>{{ race }}</div>
            
            
            <div class="image-content-text" v-for="clss in classes" :key="clss.name">       
                {{ clss.name }} <div v-if="classes.length != 1">({{ clss.level }})&nbsp;</div> 
                
                <div v-if="clss.subclass">- {{ clss.subclass }}</div>
            </div>

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
    <CenterToScreen v-else class="error-container">
        <ErrorIcon />
        <h1>Error: 32</h1>
    </CenterToScreen>

   
</div>

</template>

<script>

import CenterToScreen from "@/components/CenterToScreen.vue";
import OpenExternal from "@/assets/icons/OpenExternal.vue";
import DotSeperator from "@/components/DotSeperator.vue";
import StatBlock from "@/components/StatBlock.vue";
import ErrorIcon from "@/assets/icons/ErrorIcon.vue";

export default {
    name: "CharacterView",
    components: { CenterToScreen, DotSeperator, ErrorIcon, OpenExternal, StatBlock },
    props: {
        "data": {
            required: true,
            type: Object,
        }
    },
    data() {
        return {
            characterPageUrl: "",
            classes: null,
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
            valid: true,
  
        };
    },
    mounted() {
        this.parseJsonResponse(this.data);
    },
    methods: {
        parseJsonResponse(json) {
            this.valid = this.isValid(json);
            if(!this.valid) {
                return;
            }

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
    
            let classData = [];
            let classes = json.data.classes;

            for(let clss of classes) {
                classData.push({
                    "level": clss.level,
                    "name": clss.definition.name,
                    "subclass": clss.subclassDefinition != null ? clss.subclassDefinition.name : null,
                });
            }

            this.classes = classData;
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
        },
        isValid(json) {
            
            // Invalid if there is any overriden stat
            let overrideStats = json.data.overrideStats;
            for(let stat of overrideStats) {
                if (stat.value) {
                    return false;
                }
            }

            return true;
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

    div {
        display: inline-block;
    }
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

.error-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    svg{
        aspect-ratio: 1/1;
        width: 10rem;
    }
}

</style>
