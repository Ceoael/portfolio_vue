<template>
    <div class="radio">
        <button class="radio__button">
            <span class="material-icons">brush</span>
        </button>
        <div class="radio__content">
            <div v-for="bg in backgrounds" :key="bg.name">
                <input 
                    v-model="selectedTheme" 
                    class="radio__input" 
                    type="radio" 
                    :value="bg.name" 
                    name="myRadio" 
                    :id="bg.name" 
                    :checked="bg.name === selectedTheme" />
                <label 
                    class="radio__label" 
                    :for="bg.name" 
                    :style="bg.styles"
                >{{ bg.name }}</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // props: {
    //     title: {
    //         type: String,
    //         required: true
    //     }
    // },
    inject: ['selectedThemeHandler'],
    data() {
        return {
            selectedTheme: 'Crazy Orange',
            backgrounds: [
                {
                    name: 'Crazy Orange',
                    styles: {
                        // background: '#D38312',
                        // background: '-webkit-linear-gradient(to right, #A83279, #D38312)',
                        background: 'linear-gradient(to right, #A83279, #D38312)'
                    }
                },
                {
                    name: 'Endless River',
                    styles: {
                        // background: '#43cea2',
                        // background: '-webkit-linear-gradient(to bottom, #185a9d, #43cea2)',  
                        background: 'linear-gradient(to bottom, #185a9d, #43cea2)'

                    }
                },
                {
                    name: 'Pinot Noir',
                    styles: {
                        // background: '#4b6cb7',
                        // background: '-webkit-linear-gradient(to right, #182848, #4b6cb7)',
                        background: 'linear-gradient(to bottom, #182848, #4b6cb7)'
                    }
                },
                {
                    name: 'The Strain',
                    styles: {
                        // background: '#870000',
                        // background: '-webkit-linear-gradient(to top, #190A05, #870000)',
                        background: 'linear-gradient(to bottom, #190A05, #870000)'

                    }
                },
                {
                    name: 'Namn',
                    styles: {
                        // background: '#a73737',
                        // background: '-webkit-linear-gradient(to top, #7a2828, #a73737)',
                        background: 'linear-gradient(to left, #7a2828, #a73737)'
                    }
                },
                {
                    name: 'Stellar',
                    styles: {
                        // background: '#7474BF',
                        // background: '-webkit-linear-gradient(to bottom, #348AC7, #7474BF)',
                        background: 'linear-gradient(to bottom, #348AC7, #7474BF)'
                    }
                },
                {
                    name: 'Dracula',
                    styles: {
                        // background: '#DC2424',
                        // background: '-webkit-linear-gradient(to top, #4A569D, #DC2424)',
                        background: 'linear-gradient(to bottom, #4A569D, #DC2424)',
                    }
                },
                {
                    name: 'Midnight City',
                    styles: {
                        // background: '#232526',
                        // background: '-webkit-linear-gradient(to left, #414345, #232526)',
                        background: 'linear-gradient(to left, #414345, #232526)',
                    }
                },

            ]
        }
    },
    methods: {
        getSelectedStyles(theme) {
            const styles = this.backgrounds.filter(( item ) => {
                    return theme === item.name
                })[0].styles;
            return styles;
        }
    },
    watch: {
        selectedTheme(value) {
            this.selectedThemeHandler(this.getSelectedStyles(value));
        }
    }
}

</script>

<style scoped>
    * {
        --border-radius: 3px;
        --transparentWhite: rgba(255, 255, 255, 0.5);
        --buttonHeight: calc(36px - 2*var(--border-radius));
    }

    .radio {
        position: relative;
        border: var(--border-radius) solid var(--transparentWhite);
        border-radius: 5px;
        background: transparent;
        margin: 0 5px;
        display: inline-block;
        transition: all .3s ease;
    }

    .radio__button {
        background: transparent;

        width: 40px;
        height: var(--buttonHeight);

        padding: 2px 0;

        font-family: 'Roboto', sans-serif;
        font-size: 1.2rem;
        color: var(--transparentWhite);
        text-align: center;

        border: none;
        cursor: pointer;

        transition: all .3s ease;
    }

    .radio__icon {
        /* display: block; */
        height: 100%;
        
    }

    .radio:hover,
    .radio__button:hover,
    .radio__button:active {
        --transparentWhite: rgba(255, 255, 255, 0.8);
        box-shadow: 0 0 10px 2px rgba(0,0,0,0.3);
    }

    .radio:hover {
        background: rgba(0,0,0,0.3);
    }

    .radio__content {
        position: absolute;
        margin-top: var(--border-radius);

        display: none;
        
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0,0,0,0.25);
        z-index: 1;
        overflow: hidden;
    }

    .radio:hover .radio__content {
        display: flex;
        flex-direction: column;
    }

    .radio__input {
        display: none;
    }

    .radio__label {
        display: block;
        padding: 8px 14px;
        font-size: 1rem;
        font-family: 'Roboto', sans-serif;
        font-weight: lighter;
        color: #fff;
        background: #009578;
        cursor: pointer;
        transition: background 0.3s;
    }

    .radio__label:not(:last-of-type) {
        border-right: 1px solid #006B56;
    }

    .radio__input:checked + .radio__label{
        box-shadow: inset 0 0 7px 0px white;
        /* box-shadow: inset 0 0 5px 2px black; */
    }
</style>