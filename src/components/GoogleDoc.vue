<template>

    <!-- BUG without the empty div the page breaks when switching pages -->
    <div></div>
    <div ref="divToReplace" class="load-icon-wrapper">
        <div class="load-icon"></div>
    </div>

    
</template>

<script>
import {sleep} from "@/util.js";

export default {
    name: "GoogleDoc",
    props: {
        "src": {
            type: String,
            required: true,
        },
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
                
                let divToReplace = this.$refs.divToReplace;

                let docElement = this.parseResponse(xhr.responseText);
                docElement.classList.add("google-doc");

                divToReplace.parentElement.replaceChild(docElement, divToReplace);
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

.load-icon-wrapper {
    height: 200px;
    background-color: rebeccapurple;


    display:flex;
    align-items: center;
    justify-content: center;

}

@keyframes load-animation {
    0% {transform: rotate(0deg) scale(1);}
    50% {transform: rotate(180deg) scale(1.5);}
    100% {transform: rotate(360deg) scale(1);}    
}

.load-icon {
    border:solid;

    width: 25px;
    height: 25px;

    animation-name: load-animation;
    animation-duration: 1s;
    animation-iteration-count: infinite;
}

</style>