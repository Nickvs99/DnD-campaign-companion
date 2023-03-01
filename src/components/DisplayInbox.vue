<template>

<div>
    <template v-for="(message, index) in messages" :key="message">
        <MessageBox :message="message.message" :messageStyle="message.messageStyle"></MessageBox>
        <HorizontalBar v-if="index != messages.length - 1"/>
    </template>
</div>

</template> 

<script>

import HorizontalBar from "./HorizontalBar.vue";
import MessageBox from "@/components/MessageBox.vue";

export default {
    name: "MailBox",
    components: {HorizontalBar, MessageBox},
    props: {
        "messages": {
            type: Array,
            required: true,
        }
    },
};

</script>