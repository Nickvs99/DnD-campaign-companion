<template>

<BackGround />
<NavBar />
<router-view v-slot="{Component}">
    <div class="content-wrapper" ref="contentWrapper">
        <transition name="fade" mode="out-in">
                <component :is="Component" :key="$route.path"></component>
        </transition>
    </div>
</router-view>

</template>

<script>
import BackGround from "@/components/BackGround.vue";
import NavBar from "@/components/NavBar.vue";

export default {
    name: "App",
    components: {BackGround, NavBar},
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

.content-wrapper {
    position: relative;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

</style>
