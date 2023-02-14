<template>

<div ref="messageWrapper">
    {{  message }}
</div>

</template>

<script>

export default {
    name: "MessageBox",
    props: {
        "message": {
            type: String,
            required: true,
        },
        "messageStyle": {
            type: String,
            default: "default",
        }
    },

    mounted() {
        this.setMessageStyle();
    },

    methods: {
        setMessageStyle() {
            this.$refs.messageWrapper.classList.add(`${this.messageStyle}-style`);
        }
    }
};

</script>

<style lang="scss">
    
.default-style {
    font: inherit;
}

.child-style {
    font-family: "Comic Sans MS", "Comic Sans", cursive;
    font-size: 28px;
}

</style>