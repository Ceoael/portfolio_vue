<template>
    <div class="Toolbar">
        <div class="Toolbar__group">
            <div v-if="eventLength > 1"
                class="Toolbar__Rotation" >
                <input class="Toolbar__Input" type="number" min="2" max="10" @blur="rotationTimeHandler" :value="rotationTime"/>
                <span>s</span>
            </div>

            <theme-select title="Theme"/>
        </div>
        
        <button class="Toolbar__Button" @click="clickHandler">+</button>
    </div>
</template>

<script>
    import ThemeSelect from './ThemeSelect/ThemeSelect.vue';

    export default {
        components: {
            ThemeSelect
        },
        emits: ['openEditModal', 'update:modelValue'],
        props: ['modelValue', 'eventLength'],
        data() {
            return {
                rotationTime: this.modelValue,
            }
        },
        methods: {
            rotationTimeHandler(event){
                let currentValue = +event.target.value;

                if (currentValue > 10) {
                    currentValue = 10;
                }
                if (currentValue < 2) {
                    currentValue = 2;
                }
                this.rotationTime = currentValue;
                
                this.$emit('update:modelValue', currentValue);
            },
            clickHandler(){
                this.$emit('openEditModal');
            },
        }
    }
</script>

<style scoped>
    * {
        --buttonColor: rgba(255, 255, 255, 0.5);
        --squareSide: 38px;
    }

    .Toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        padding: 10px 20px;
    }

    .Toolbar__group {
        display: flex;
    }

    .Toolbar__Button {
        

        display: block;
        

        font-family: 'Roboto', sans-serif;
        font-size: 1.5rem;
        font-weight: normal;
        color: var(--buttonColor);

        height: var(--squareSide);
        width: var(--squareSide);

        background: transparent;
        border: 3px solid var(--buttonColor);
        border-radius: 5px;

        cursor: pointer;
        outline: none;
        user-select: none;

        transition: all .3s ease;
    }

    .Toolbar__Button:hover,
    .Toolbar__Button:active {
        --buttonColor: rgba(255, 255, 255, 0.8);
        background: rgba(0,0,0,0.3);

        box-shadow: 0 0 10px 2px rgba(0,0,0,0.3);
    }

    .Toolbar__Button:active {
        font-weight: bolder;
    }

    /* @media (min-width: 1024px) {
        .Toolbar {
            width: 70%;
        }
    }

    @media (min-width: 1200px) {
        .Toolbar {
            width: 50%;
        }
    } */

    .Toolbar__Rotation{
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 0 10px;
        padding: 0 5px;

        font-family: 'Roboto', sans-serif;
        font-size: 1.2rem;
    
        color: var(--buttonColor);

        height: var(--squareSide);

        background: transparent;
        border: 3px solid var(--buttonColor);
        border-radius: 5px;
    }

    .Toolbar__Input{
        width: 3rem;

        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
        color: var(--buttonColor);

        background: transparent;
        outline: hidden;
        border: none;
    }
    .Toolbar__Input::-webkit-inner-spin-button, 
    .Toolbar__Input::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }

    .Toolbar__Input:focus,
    .Toolbar__Input:active{
        outline-style: none;
        box-shadow: none;
        border-color: transparent;
        background-color: rgba(0,0,0,0.3);
        border-radius: 5px;
    }
</style>
