<template>
    <div class="CountdownPart" :class="{'CountdownPart--finished': expired}">
        <p class="CountdownPart__Digits">{{ formattedValue }}</p>
        <p class="CountdownPart__Unit">{{ unit }}</p>
    </div>
</template>

<script>
export default {
    props: {
        expired: {
            type: Boolean,
            required: true
        },
        value: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        }
    },
    computed: {
        formattedValue() {
            return this.value < 10 ? "0" + this.value : this.value;
        }
    }
}
</script>

<style scoped>
    .CountdownPart {
        flex-grow: 1;

        --margin: 10px;

        min-width: calc(50% - (var(--margin) * 2));

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        padding: 10px;
        margin: var(--margin);

        /* box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.4); */
        border: 5px solid rgba(255, 255, 255, 0.4);
        border-radius: 15px;

        font-family: 'Roboto', sans-serif;
        font-weight: lighter;
        color: rgba(255, 255, 255, 0.6);
    }

    .CountdownPart__Digits {
        flex-grow: 1;
        font-size: 3rem;
    }

    .CountdownPart__Unit {
        font-size: 1.5rem;
    }

    .CountdownPart--finished {
        animation: breathEffect 1.2s ease-in-out alternate infinite both;
    }
    
    @media (min-width: 568px) {
    .CountdownPart {
        min-width: calc(25% - (var(--margin) * 2));
    }
}
</style>
