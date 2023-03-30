<template>

<BackGround />
<NavBar />

<router-view v-slot="{Component}">
    <AlertMessage v-if="screenWidth > 1000">
        This site is intended for mobile devices. No resources have been expended to create a visually pleasing layout for larger screens. We are sorry for this abombination.
    </AlertMessage>
    
    <div id="content-wrapper" ref="contentWrapper">
        <transition name="fade" mode="out-in">
            <CenterToScreen v-if="isLoading">
                <LoadIcon/>
            </CenterToScreen>
            <component v-else :is="Component" :key="$route.path"></component>
        </transition>
    </div>
</router-view>

</template>

<script>

import AlertMessage from "@/components/AlertMessage.vue";
import BackGround from "@/components/BackGround.vue";
import CenterToScreen from "@/components/CenterToScreen.vue";
import LoadIcon from "@/components/LoadIcon.vue";
import NavBar from "@/components/NavBar.vue";

export default {
    name: "App",
    components: { AlertMessage, BackGround, CenterToScreen, LoadIcon, NavBar},
    data() {
        return {
            // This value is changed by the router
            isLoading: false,

            screenWidth: null,
        };
    },
    mounted(){
        window.addEventListener("resize", this.onResize);
        this.onResize();
    },
    unmounted() {
        window.removeEventListener("resize", this.onResize);
    },
    methods: {
        
        onResize() {
            this.setMinHeight();
            this.setScreenWidth();
        },

        setScreenWidth() {
            this.screenWidth = window.innerWidth;
        },

        /**
         * Sets mimimum height such that it fills remaining height to the bottom
         */
        setMinHeight() {
            let el = this.$refs.contentWrapper;
            el.style.minHeight = (document.documentElement.clientHeight - el.offsetTop) + "px";
        },
    },
};

</script>

<style lang="scss">

#content-wrapper {
    position: relative;

    // Creates new Block formatting context, making sure that all
    // margins are within the content-wrapper
    overflow: auto;

    width: 100%;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

</style>
