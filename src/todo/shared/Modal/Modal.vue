<template>
    <teleport to="body">
        <div class="Modal" :style="{background: backgroundColor, ...modalVisible()}">

            <div class="Modal__header">
                <p>{{ modalName }}</p>
                <div class="Modal__closeButton" @click="closeModal()">
                    <div class="Modal__X"></div>
                </div>
            </div>

            <div class="Modal__contentWrapper">
                <slot></slot>
            </div>

        </div>  
    </teleport>
</template>

<script>
export default {
    props: {
        backgroundColor: {
            type: String,
            required: false,
            default: '#343840'
        },
        modalOpen: {
            type: Boolean,
            required: true
        },
        modalName: {
            type: String,
            required: true
        }
    },
    emits: ['modalOff'],
    methods: {
        modalVisible() {
            return {
                opacity: this.modalOpen ? 1 : 0,
                transform: this.modalOpen ? 'translate(-50%, -50%)' : 'translate(-50%, -200vh)'
            }
        },
        closeModal(){
            this.$emit('modalOff', true);
        }
    }
}
</script>

<style scoped>
    .Modal {
        display: flex;
        flex-direction: column;

        position: fixed;
        top: 50%;
        left: 50%; 
        transform: translate(-50%, -50%);
        z-index: 200;

        /* min-height: 80vh; */
        max-height: 95vh;
        width: 90%;
        padding: 0 20px;

        /* background-color: #343840; */
        background: #4b6cb7;  
        background: -webkit-linear-gradient(to right, #4b6cb7, #5f2c82);  
        background: linear-gradient(to right, #4b6cb7, #5f2c82);

        border-radius: 5px;
        
        box-shadow: 0px 0px 10px 0px rgba(255,255,255, .8);
        /* box-shadow: 0px 0px 20px 5px rgba(0,0,0, 1); */

        color: white;

        transition: all .3s ease-out;
        overflow-y: scroll;
        
    }

    .Modal::-webkit-scrollbar {
        width: 0px;  
        background: transparent;  
    }

    .Modal__header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 10px 0;
        margin-bottom: 20px;

        font-family: 'Roboto', sans-serif;
        font-size: 1.5rem;
        font-weight: lighter;
        color: rgba(255,255,255, 0.6);

        user-select: none;

        border-bottom: 1px solid rgba(255,255,255, 0.4);
    }

    .Modal__closeButton {
        position: relative;

        display: flex;
        justify-content: center;
        align-items: center;

        width: 40px;
        height: 40px;

        border-radius: 5px;

        background: none;


        cursor: pointer;
    }

    .Modal__X {
        width: 80%;
        height: 7px;

        transform: rotate(45deg);
        
        border-radius: 2px;
        background: white;
    }

    .Modal__X::before {
        content: '';
        position: absolute;

        width: 100%;
        height: 100%;
        border-radius: 2px;

        background: white;

        transform: rotate(90deg);
    }

    .Modal__closeButton:hover .Modal__X {
        width: 80%;
        height: 2px;
    }

    .Modal__contentWrapper {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        font-family: 'Roboto', sans-serif;
        font-size: 20px;
        font-weight: lighter;
        color: rgba(255,255,255, 0.6);
    }

    @media (min-width: 768px) {
        .Modal__header {
            font-size: 2rem;
        }
    }

    @media (min-width: 992px) {
        .Modal {
            width: 900px;
        }

        .Modal__header {
            font-size: 3rem;
        }
    }
</style>
