<template>

<div class="inbox-login-container">
    <form v-if="!showLoadIcon" v-on:submit="onSubmit" class="login-form">
        <input ref="personalCode" placeholder="Personal code" type="text" />
        <input ref="dmCode" placeholder="DM code" type="text" />

        <button>Submit</button>
    </form>

    <div v-if="showInvalidCode" class="invalid-message">Invalid code</div>
    <LoadIcon v-if="showLoadIcon" :message="this.loadMessage"/>
</div>

</template>

<script>

import LoadIcon from "@/components/LoadIcon.vue";
import { hashCode, randomUniform, sleep } from "@/util.js";

export default {
    name: "InboxLoginView",
    components: { LoadIcon },

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

            if (!(this.$refs.dmCode.value === "" && this.$refs.personalCode.value === ""))
            {
                // Show artificial loading screen
                this.showLoadIcon = true,

                this.loadMessage = "Encrypting code";
                await sleep(randomUniform(500, 750));

                this.loadMessage = "Validating code";
                await sleep(randomUniform(1500, 3500));

                if(validRoute) {
                    this.loadMessage = "Fetching message";
                    await sleep(randomUniform(500, 750));                    
                }
                else {
                    // Only disable the loadicon on invalid routes, otherwise the
                    // fade on route change would not look good
                    this.showLoadIcon = false;
                }
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

<style lang="scss">

@import "@/styles/mixins.scss";

.inbox-login-container {
    width: 75%;
    max-width: 15rem;

    @include center-to-screen;
}

.login-form{
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
}

.invalid-message {
    text-align: center;

    font-size: 1.25rem;
    font-weight: bold;
    
    margin: 1em;
}

</style>