<template>

<MessageBox v-for="message in messages" :key="message" :message="message.message" :messageStyle="message.messageStyle"></MessageBox>

</template> 

<script>

import MessageBox from "@/components/MessageBox.vue";

export default {
    name: "MailBox",
    components: {MessageBox},
    props: {
        "messages": {
            type: Array,
            required: true,
        }
    },
};

</script>