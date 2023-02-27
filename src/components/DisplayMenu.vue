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
    }
};
</script>

<style>

.menu-wrapper {
    min-height: inherit;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.menu-item {
    display: flex;
    align-items: center;

    font-size: 3em;
}

</style>