<template>
    <div class="ButtonWrapper">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "ButtonsWrapper"
}
</script>

<style scoped>
    .ButtonWrapper {
        display: flex;
        justify-content: space-around;
        align-items: center;

        width: 100%;

        margin-top: 20px;
    }


    @media (min-width: 768px) {
        .ButtonWrapper {
            width: 90%;
        }
    }

    @media (min-width: 1000px) {
        .ButtonWrapper {
            width: 800px;
        }
    }
</style>