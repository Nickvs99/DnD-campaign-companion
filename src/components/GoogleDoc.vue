<template>

<div>
    <LoadIcon v-if="showLoadIcon" :message="this.loadMessage"/>
    <div ref="docWrapper" class="google-doc"></div>
</div>

</template>

<script>

import LoadIcon from "@/components/LoadIcon.vue";
import {randomUniform, sleep} from "@/util.js";

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
            isDestroyed: false,
            showLoadIcon: true,
            loadMessage: "",
            maxArtificialLoadTime: randomUniform(2500, 4000),
        };
    },
    mounted() {
        this.loadGoogleDoc();
    },
    unmounted() {
        this.xhr.abort();
        this.isDestroyed = true;
    },
    
    methods: {
        async loadGoogleDoc() {


            this.xhr = new XMLHttpRequest();
            this.xhr.open("GET", this.src, true);
            this.xhr.onload = async () => {

                // Calculate any possible remaining wait time
                let artificialWaitTime = Math.max(this.maxArtificialLoadTime - (Date.now() - sendTime), 0);
                await sleep(artificialWaitTime);
                
                // This component might be destroyed during the delays
                if (this.isDestroyed) {
                    return;
                }

                let docWrapper = this.$refs.docWrapper;
                let docElement = this.parseResponse(this.xhr.responseText);

                docWrapper.appendChild(docElement);

                this.showLoadIcon = false;
            };

            let sendTime = Date.now();
            this.xhr.send();

            // Display techy quotes on the load icon
            this.loadMessage = "Fetching document";
            await sleep(randomUniform(1500, 2500));
            
            // Final load message
            this.loadMessage = "Parsing data";
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
        color: var(--secondary-color) !important;
        background-color: var(--primary-color) !important;        
    }

    .doc-content {
        padding: 5%;
        max-width: inherit;
    }
}

</style>