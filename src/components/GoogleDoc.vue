<template>
    
<LoadIcon v-if="showLoadIcon"/>
<div ref="docWrapper" class="google-doc"></div>
    
</template>

<script>

import LoadIcon from "@/components/LoadIcon.vue";
import {sleep} from "@/util.js";

export default {
    name: "GoogleDoc",
    components: {LoadIcon},
    props: {
        "src": {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            showLoadIcon: true,
        };
    },
    mounted() {
        this.loadGoogleDoc();
    },
    
    methods: {
        async loadGoogleDoc() {

            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.src, true);
            xhr.onload = async () => {

                // TEMP
                await sleep(2000);
                
                let docWrapper = this.$refs.docWrapper;
                let docElement = this.parseResponse(xhr.responseText);

                docWrapper.appendChild(docElement);

                this.showLoadIcon = false;
            };
            xhr.send();
        },

        parseResponse(response) {

            let parser = new DOMParser();
            const htmlDoc = parser.parseFromString(response, "text/html");

            let aTags = htmlDoc.getElementsByTagName("a");
            
            for (let tag of aTags)
            {
                // The hashes do not work, therefore their behaviour is overriden
                if (tag.hash != "")
                {
                    // #id => id
                    let el = htmlDoc.getElementById(tag.hash.slice(1));

                    tag.onclick = event => { 
                        event.preventDefault();
                        event.stopPropagation();
                        
                        el.scrollIntoView({behavior: "smooth"});
                    };
                }
            }

            return htmlDoc.documentElement;
        }
    },
};

</script>

<style lang="scss">

.google-doc{
    width: 100%;
    
    // Overwrite default css applied by google
    * {
    color: gold !important;
    background-color: black !important;        
    }

    .doc-content {
        padding: 5%;
        max-width: inherit;
    }
}

</style>