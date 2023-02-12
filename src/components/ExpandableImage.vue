<template>
    <img :src="src" class="image"/>
</template>

<script>

export default {
    props: {
        "src": {
            type: String,
            required: true,
        }
    }
};

</script>

<style lang="scss" scoped>

.image {
    width: 100%;
}

</style>