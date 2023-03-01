<template>

<p ref="messageWrapper" class="message-wrapper"></p>

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
        this.$refs.messageWrapper.innerHTML = this.message;
        this.setMessageStyle();
    },

    methods: {
        setMessageStyle() {
            let messageStyle = this.messageStyle === "" ? "default" : this.messageStyle;
            this.$refs.messageWrapper.classList.add(`${messageStyle}-style`);
        }
    }
};

</script>

<style lang="scss">

.message-wrapper {
    margin: 2rem 0;
}
    
.default-style {
    font: inherit;
}

.child-style {
    font-family: "Comic Sans MS", "Comic Sans", cursive;
    font-size: 28px;
}

</style>