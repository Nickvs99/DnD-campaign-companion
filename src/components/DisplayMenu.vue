<template>

<div class="menu-wrapper">
    <template v-for="(item, index) in items" :key="item">
        <router-link class="menu-item"  :to="getTo(item)"> {{ item }} </router-link>
        <div class="menu-item-seperator" v-if="index != items.length - 1"></div>
    </template>
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

<style lang="scss">

.menu-wrapper {
    min-height: inherit;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.menu-item {
    position: relative;
    display: flex;
    align-items: center;

    font-size: 3rem;
    text-decoration: none;

    margin: 0.33em;
}

.menu-item-seperator {
    width: 66.66%;
    height: 2px;
    background: linear-gradient(to right, transparent, var(--font-color), transparent);
}

</style>