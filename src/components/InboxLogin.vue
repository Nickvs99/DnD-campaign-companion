<template>

    <form v-on:submit="onSubmit">
        <input ref="personalCode" placeholder="Personal code" type="text" />
        <input ref="dmCode" placeholder="DM code" type="text" />

        <button>Submit</button>        
    </form>

    <div class="hidden" ref="invalidMessage">Invalid code</div>

</template>

<script>

import { hashCode } from "@/util.js";

export default {
    name: "InboxLogin",
    methods:
    {
        onSubmit(event) {
            event.preventDefault();
            event.stopPropagation();

            let pathSplit = this.$route.path.split("/");
            let concat = pathSplit.slice(0, -1).join("/");
            let targetSlug = concat + "/messages/" + hashCode(this.$refs.personalCode.value + this.$refs.dmCode.value);
            
            if(this.isValidRoute(targetSlug)) {
                this.$router.push(targetSlug);
            }
            else{
                this.$refs.invalidMessage.classList.remove("hidden");
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
