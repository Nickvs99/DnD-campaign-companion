<template>
    BUG for some reason their needs to be another element in this component.
    Otherwise switching pages errors.

    <div id="replace">DIV TO REPLACE</div>

    
</template>
<script>

export default {
    
    mounted() {
        this.loadGoogleDoc();
    },
    
    methods: {
        loadGoogleDoc() {

            let d = document.createElement("div");
            d.classList.add("google-doc");

            let replace = document.getElementById("replace");
            replace.parentElement.replaceChild(d, replace);

            let url = "https://docs.google.com/document/d/e/2PACX-1vQntHl593EJQ8-uDr3-RxkAVt82--xxKyMOHRISDrqJSSVnXrB2DdhyQeDUFNOIWXv_q6LBTDX7PRUu/pub?embedded=true";

            let xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onload = () => {
                d.innerHTML = xhr.responseText;
            };
            xhr.send();
        },
    },
};

</script>

<style lang="scss">
    .google-doc {

    }
</style>