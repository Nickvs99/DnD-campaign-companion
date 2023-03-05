<template>

<nav class="navbar">
    <router-link class="navbar-item" to="/"><HomeIcon class="navbar-svg"/></router-link>

    <TransitionGroup name="slide">
        <router-link class="navbar-item" v-for="item in navBarItems" :to="item.to" :key="item.to"> {{ item.text }} </router-link>
    </TransitionGroup>
</nav>

</template>

<script>

import HomeIcon from "@/assets/icons/HomeIcon.vue";

export default {
    name: "NavBar",
    components: { HomeIcon },
    data() {
        return {
            navBarItems: [],
        };
    },
    mounted() {
        this.setNavBarItems(this.$route.path);
    },
    watch: {
        $route(to) {
            this.setNavBarItems(to.fullPath);
        }
    },
    methods: {
        setNavBarItems(toPath) {
            this.navBarItems = [];

            let path = "";
            let pathSplit = toPath.split("/").filter(item => item !== "");

            // Remove last item, since current page does not need to be in the navbar
            for(let item of pathSplit.slice(0, -1)){

                path += `/${item}`;
                this.navBarItems.push({to: path, text: item.replace("%20", " ")});
            }
        }
    }
};

</script>

<style lang="scss">

.navbar { 
    overflow:scroll;
    white-space: nowrap;

    -webkit-tap-highlight-color: transparent;

    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }
}

.navbar-item {
    display: inline-block;
    font-size: 2rem;

    text-decoration: none;

    &:not(:first-child)::before{
        content: "\2219"; // Thick dot
        margin: 0.25em;
    }
}

.slide-enter-active, .slide-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from, .slide-leave-to {
    opacity: 0;
    transform: translateX(300px);
}

.navbar-svg {
    width: 2rem;
    height: 2rem;
}

</style>