<template>

<BackGround />
<NavBar />
<router-view v-slot="{Component}">
    <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
    </transition>
</router-view>

</template>

<script>
import BackGround from "@/components/BackGround.vue";
import NavBar from "@/components/NavBar.vue";

export default {
    name: "App",
    components: {BackGround, NavBar}
};
</script>

<style lang="scss">

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

</style>
