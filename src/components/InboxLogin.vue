<template>

<form v-on:submit="onSubmit">
    <input ref="personalCode" placeholder="Personal code" type="text" />
    <input ref="dmCode" placeholder="DM code" type="text" />

    <button>Submit</button>        
</form>

<LoadIcon v-if="showLoadIcon" :message="this.loadMessage"/>
<div v-if="showInvalidCode">Invalid code</div>

</template>

<script>

import LoadIcon from "@/components/LoadIcon.vue";
import { sleep, hashCode } from "@/util.js";

export default {
    name: "InboxLogin",
    components: {LoadIcon},

    data() {
        return {
            showLoadIcon: false,
            showInvalidCode: false,
            loadMessage: "",
        };
    },

    methods:
    {
        async onSubmit(event) {
            
            this.showInvalidCode = false;
            
            event.preventDefault();
            event.stopPropagation();
            
            let pathSplit = this.$route.path.split("/");
            let concat = pathSplit.slice(0, -1).join("/");
            let targetSlug = concat + "/messages/" + hashCode(this.$refs.personalCode.value + this.$refs.dmCode.value);
            
            let validRoute = this.isValidRoute(targetSlug);

            if (this.$refs.dmCode.value != "")
            {
                // Show artificial loading screen
                this.showLoadIcon = true,

                this.loadMessage = "Encrypting code";
                await sleep(1000);

                this.loadMessage = "Validating code";
                await sleep(1000);

                if(validRoute) {
                    this.loadMessage = "Fetching message";
                    await sleep(1000);                    
                }

                this.showLoadIcon = false;
            }


            if(validRoute) {
                this.$router.push(targetSlug);
            }
            else{
                this.showInvalidCode = true;
            }
        },

        isValidRoute(path) {

            for(let route of this.$router.getRoutes())
            {
                if (path === route["path"]) {
                    return true;
                }
            }

            return false;
        }
    } 
};

</script>
