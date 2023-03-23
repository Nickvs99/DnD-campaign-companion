<template>

<BackGround />
<NavBar />

<router-view v-slot="{Component}">
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

import BackGround from "@/components/BackGround.vue";
import CenterToScreen from "./components/CenterToScreen.vue";
import LoadIcon from "./components/LoadIcon.vue";
import NavBar from "@/components/NavBar.vue";

export default {
    name: "App",
    components: {BackGround, CenterToScreen, LoadIcon, NavBar},
    data() {
        return {
            // This value is changed by the router
            isLoading: false,
        };
    },
    mounted(){
        window.addEventListener("resize", this.setMinHeight);
        this.setMinHeight();
    },
    unmounted() {
        window.removeEventListener("resize", this.setMinHeight);
    },
    methods: {
        
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
