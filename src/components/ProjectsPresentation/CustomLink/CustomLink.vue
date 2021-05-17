<template>
    <a class="customLink" target="_blank" :href="linkTo"><slot></slot></a>
</template>

<script>
export default {
    name: "CustomLink",
    props: {
        linkTo: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
    .customLink {
        color: #E7E7EB;
    }
</style>
