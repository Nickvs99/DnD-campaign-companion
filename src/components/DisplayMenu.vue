<template>
    <router-link v-for="item in items" :key="item" :to="getTo(item)">{{item}} |</router-link>
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
        }
    }
};
</script>