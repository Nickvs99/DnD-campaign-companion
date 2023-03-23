<template>

<IconWithHeader header="Access denied">
    <LockIcon />
</IconWithHeader>

</template>

<script>

import LockIcon from "@/assets/icons/LockIcon.vue";
import IconWithHeader from "@/components/IconWithHeader.vue";

export default {
    name: "AccessDeniedView",
    components: { IconWithHeader, LockIcon },
};

</script>
