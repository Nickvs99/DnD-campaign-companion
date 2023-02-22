<template>

<div ref="divToReplace" class="load-icon-wrapper">
    <div class="load-icon"></div>
    <div class="load-message" ref="loadMessage" data-trailing-dots=""> {{ message }}</div>
</div>

</template>

<script>

export default {
    props: {
        "message": {
            type: String,
            required: false,
            default: "",
        }
    },

    data() {
        return {
            nDots: 0,
        };
    },

    mounted() {
        this.updateInterval = window.setInterval(() => {
            this.nDots = (this.nDots + 1) % 4;

            if(this.message != ""){
                this.$refs.loadMessage.setAttribute("data-trailing-dots", ".".repeat(this.nDots));
            }
            else {
                this.$refs.loadMessage.setAttribute("data-trailing-dots", "");
            }
        }, 500);
    },
    unmounted() {
        window.clearInterval(this.updateInterval);
    }
};

</script>

<style>

.load-icon-wrapper {
    height: 200px;
    background-color: rebeccapurple;

    display:flex;
    flex-direction: column;
    row-gap: 1.4rem;
    align-items: center;
    justify-content: center;
}

@keyframes load-animation {
    0% {transform: rotate(0deg) scale(1);}
    50% {transform: rotate(180deg) scale(1.5);}
    100% {transform: rotate(360deg) scale(1);}    
}

.load-icon {
    border:solid;

    width: 25px;
    height: 25px;

    animation-name: load-animation;
    animation-duration: 1s;
    animation-iteration-count: infinite;
}

.load-message {
    color: white;
    font-size: 1.5rem;
}

.load-message::after {
    content: attr(data-trailing-dots);
    
    /* This makes sure that the message is not constantly jumping around */
    position:absolute;
}

</style>