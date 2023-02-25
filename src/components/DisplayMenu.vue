<template>

<div class="menu-wrapper">
    <router-link class="menu-item" v-for="item in items" :key="item" :to="getTo(item)">{{item}} |</router-link>
</div>

</template>

<script>
export default {
    name: "DisplayMenu",
    props: {
        items: {
            type: Array,
            required: true
        }
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
         * Compute the target slug based on the current path and the target
         */
        getTo(target){
            
            if(this.$route.path === "/"){
                return this.$route.path + target;
            }
            else {
                return this.$route.path + "/" + target.replace(" ", "%20");
            }
        },

        /**
         * Sets mimimum height such that it fills remaining height to the bottom
         */
        setMinHeight() {
            this.$el.style.minHeight = (document.documentElement.clientHeight - this.$el.offsetTop) + "px";
        }
    }
};
</script>

<style>

.menu-wrapper {
    background-color: olive;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.menu-item {
    background-color: firebrick;
    display: flex;
    align-items: center;
}

</style>