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
    
    mounted() {
        this.loadGoogleDoc();
    },
    
    methods: {
        async loadGoogleDoc() {

            let d = document.createElement("div");
            d.classList.add("google-doc");

            let url = "https://docs.google.com/document/d/e/2PACX-1vQntHl593EJQ8-uDr3-RxkAVt82--xxKyMOHRISDrqJSSVnXrB2DdhyQeDUFNOIWXv_q6LBTDX7PRUu/pub?embedded=true";

            let xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onload = async () => {

                // TEMP
                await sleep(2000);
                
                let divToReplace = this.$refs.divToReplace;
                divToReplace.parentElement.replaceChild(d, divToReplace);

                d.innerHTML = xhr.responseText;
            };
            xhr.send();
        },
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