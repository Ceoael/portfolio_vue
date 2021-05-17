<template>
    <button
        class="FormElements__SubmitButton"
        type="submit"
        :disabled="!isFormValid"
        @click="clickHandler()">{{ description }}</button>
</template>

<script>
export default {
    props: {
        isFormValid: {
            type: Boolean,
            required: true
        },
        description: {
            type: String,
            required: false,
            default: 'OK'
        }
    },
    emits: ['submitForm'],
    methods: {
        clickHandler(){
            this.$emit('submitForm', true);
        }
    }
}
</script>

<style scoped>
    .FormElements__SubmitButton {
        height: 40px;
        padding: 0 30px;
        margin-bottom: 15px;
        margin-top: 10px;

        font-family: 'Roboto', sans-serif;
        font-size: 20px;

        border-radius: 5px;
        border: none;
        box-shadow: 0 3px 0px 0px black;
        color: black;

        cursor: pointer;
        user-select: none;
        outline: none;

        transition: background-color .3s ease-in-out;
    }

    .FormElements__SubmitButton:hover {
        background-color: #90ee90;
    }

    .FormElements__SubmitButton:active {
        box-shadow: none;
        transform: translateY(3px);
    }

    @media (min-width: 768px) {
        .FormElements__SubmitButton {
            height: 48px;
            font-size: 1.8rem;
            padding: 0 50px;
        }
    }

    @media (min-width: 992px) {
        .FormElements__SubmitButton {
            height: 60px;
            font-size: 2.5rem;
            padding: 0 50px;
        }
    }
</style>
