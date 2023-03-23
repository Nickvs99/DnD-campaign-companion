<template>

<IconWithHeader header="Page not found">
    <NotFoundIcon />
</IconWithHeader>

</template>

<script>

import NotFoundIcon from "@/assets/icons/NotFoundIcon.vue";
import IconWithHeader from "@/components/IconWithHeader.vue";

export default {
    name: "404View",
    components: { NotFoundIcon, IconWithHeader },
};

</script>
