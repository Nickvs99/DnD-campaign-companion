<template>

<div ref="divToReplace" class="load-icon-wrapper">
    <div class="load-icon"></div>
</div>

</template>

<script>


</script>

<style>

.load-icon-wrapper {
    height: 200px;
    background-color: rebeccapurple;

    display:flex;
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

</style>