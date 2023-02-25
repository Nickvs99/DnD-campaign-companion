<template>

<nav class="navbar">
    <router-link class="navbar-item" v-for="item in navBarItems" :to="item.to" :key="item.to"> {{ item.text }} </router-link>
</nav>

</template>

<script>

export default {
    name: "NavBar",
    data() {
        return {
            navBarItems: [{to: "/", text:"Vaarwel"}],
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
            this.navBarItems = [{to: "/", text:"Home"}];

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

<style>

.navbar { 
    overflow:scroll;
    white-space: nowrap;
}

.navbar-item {
    font-size: 3rem;
    background-color: aquamarine;
    border: 1px solid;
}

</style>