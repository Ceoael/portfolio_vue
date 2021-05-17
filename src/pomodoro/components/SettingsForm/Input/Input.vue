<template>
    <div class="Input">
        <div class="Input__wrapper">
            <label class="Input__label" :for="name" >{{ label }}</label>
                <input class="Input__input"
                    :class="{'Input__input--error': !!errorMessage}"
                    :name="name"
                    :id="name"
                    :type="type"
                    :value="inputValue"
                    :placeholder="placeholder"
                    @input="handleChange"
                    @blur="handleBlur"/>
        </div>

        <p class="Input__error" v-show="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { useField } from "vee-validate";

export default {
    name: 'Input',
    props: {
        type: {
            type: String,
            default: "text"
        },
        value: {
            type: Number,
            required: false
        },
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        placeholder: {
            type: Number,
            required: false
        }
    },
    setup(props) {
        const {
            value: inputValue,
            errorMessage,
            handleBlur,
            handleChange,
            meta
        } = useField(props.name, undefined, {
            initialValue: props.value
        });

        return {
            handleChange,
            handleBlur,
            errorMessage,
            inputValue,
            meta
        }
    }
}
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .Input {
        width: 100%;
        position: relative;
        margin-bottom: 10px;
        padding: 5px;
    }
    .Input__wrapper {
        display: flex;
        flex-direction: column;
    }
    .Input__label {
        padding-bottom: 5px;

        font-weight: normal;
        font-family: 'Roboto', sans-serif;
        font-size: 1.1rem;
    }
    .Input__label::first-letter {
        text-transform: capitalize;
    }
    .Input__input {
        width: 100%;
        padding: 10px 10px;

        border-radius: 5px;
        border: 2px solid transparent;

        font-family: 'Roboto', sans-serif;
        font-size: 1rem;

        outline: none;
        background-color: #f2f5f7;
        transition: border-color .3s ease-in-out, color .3s ease-in-out,
            background-color .3s ease-in-out;
    }
    .Input__input:focus {
        border-color: #0071fe;
    }

    .Input__input--error {
        background: #fddfe2;
        color: #f23648;
    }
    .Input__input--error:focus {
        border-color: #f23648;
    }
    .Input__error {
        padding-top: 10px;

        font-family: 'Roboto', sans-serif;
        font-size: 1rem;
        font-weight: normal;
        color: #f23648;
    }
    .Input__error::first-letter {
        text-transform: capitalize;
    }

</style>
