<template>

<form v-on:submit="onSubmit">
    <input ref="personalCode" placeholder="Personal code" type="text" />
    <input ref="dmCode" placeholder="DM code" type="text" />

    <button>Submit</button>        
</form>

<LoadIcon v-if="showLoadIcon"/>
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
        };
    },

    methods:
    {
        async onSubmit(event) {
            
            this.showInvalidCode = false;
            
            event.preventDefault();
            event.stopPropagation();
            
            if (this.$refs.dmCode.value != "")
            {
                // Show artificial loading screen
                this.showLoadIcon = true,
                await sleep(1000);
                this.showLoadIcon = false;
            }

            let pathSplit = this.$route.path.split("/");
            let concat = pathSplit.slice(0, -1).join("/");
            let targetSlug = concat + "/messages/" + hashCode(this.$refs.personalCode.value + this.$refs.dmCode.value);
            
            if(this.isValidRoute(targetSlug)) {
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
