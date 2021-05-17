<template>
    <teleport :to="renderTo">
        <div v-if="show" class="Backdrop" @click="close()">
        </div>
    </teleport>
</template>

<script>
export default {
    props: {
        show: { 
            type:Boolean,
            required: true 
        },
        renderTo: {
            type: String,
            required: false,
            default: 'body'
        }
    },
    emits: ['closeBackdrop'],
    methods: {
        close() {
            this.$emit('closeBackdrop', true);
        }
    }
}
</script>

<style scoped>
    .Backdrop {
        width: 100%;
        height: 100%;
        /* margin-top: 60px; */
        position: fixed;
        z-index: 99;
        left: 0;
        top: 0;
        background-color: rgba(0,0,0,0.4);
        backdrop-filter: blur(5px);
    }
</style>
