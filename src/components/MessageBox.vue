<template>
    <div>
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
        }
    }
};

</script>