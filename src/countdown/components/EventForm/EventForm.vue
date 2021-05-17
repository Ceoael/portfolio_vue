<template>
    <div class="EventForm">
        <Form ref="form" class="EventForm__Form" @submit="handleSubmit" :validation-schema="schema">
            <Input
                name="year"
                type="number"
                label="Year"/>
            <Input
                name="month"
                type="number"
                label="Month"/>
            <Input
                name="day"
                type="number"
                label="Day"/>
            <Input
                name="hour"
                type="number"
                label="Hour"/>
            <Input
                name="minute"
                type="number"
                label="Minute"/>
            <Input
                name="eventDescription"
                type="text"
                label="Event description"/>
            <div class="EventForm__ButtonWrapper">
                <Button type="button" @buttonClicked="handleCancelButton">CANCEL</Button>
                <Button type="submit">OK</Button>
            </div>
        </Form>
    </div>
</template>

<script>
import { markRaw } from 'vue';
import { Form } from 'vee-validate';
import { object, number, string } from 'yup';

import Input from './../Input/Input.vue';
import Button from './../Button/Button.vue';


export default {
    components: {
        Form,
        Input,
        Button
    },
    inject: ['closeShow'],
    emits: ['addNewEvent', 'modalOff'],
    data() {
        const schema = markRaw(object().shape({
            year: number().typeError('year must be a number')
                .required().min( new Date().getFullYear()),
            month: number().typeError('month must be a number')
                .required().max(12).test({
                    name: 'min',
                    exclusive: false,
                    params: { },
                    test: function (value) {
                        const getMinMonth = new Date().getMonth() + 1;

                        if (!isNaN(this.parent.year) && this.parent.year === new Date().getFullYear() && value < getMinMonth) {
                            return this.createError({ message: `Month must be greater than or equal to ${getMinMonth}`})
                        }
                        else if (value < 1) {
                            return this.createError({ message: 'Month must be greater than or equal to 1'});
                        }
                        return true;
                    }
                }),
            day: number().typeError('day must be a number')
                .required().test({
                    name: 'min',
                    exclusive: false,
                    params: { },
                    test: function (value) {
                        const getMinDay = new Date().getDate();

                        if (!isNaN(this.parent.day) && 
                            !isNaN(this.parent.month) && 
                            !isNaN(this.parent.year) && 
                            this.parent.year === new Date().getFullYear() && 
                            this.parent.month === new Date().getMonth() + 1 &&
                            value < getMinDay) {
                            return this.createError({ message: `Day must be greater than or equal to ${getMinDay}`})
                        }
                        else if (value < 1) {
                            return this.createError({ message: 'Day must be greater than or equal to 1'});
                        }
                        return true;
                    }
                }).test({
                    name: 'max',
                    exclusive: false,
                    params: { },
                    test: function (value) {
                        const checkIfYearOrMonthAreNaN = () => {
                            return isNaN(this.parent.year) || isNaN(this.parent.month);
                        }

                        const getNumberOfDaysInMonth = () => {
                            if (checkIfYearOrMonthAreNaN()) {
                                return 31;
                            }
                            return new Date(this.parent.year, this.parent.month, 0).getDate();
                        }

                        if (value > getNumberOfDaysInMonth()) {
                            return this.createError({ message: `Day must be less than or equal to ${checkIfYearOrMonthAreNaN()  ? 
                                                                                        31 : 
                                                                                        new Date(this.parent.year, this.parent.month, 0).getDate()}`})
                        }

                        return true;
                    }
                }),
            hour: number().typeError('hour must be a number').required().test({
                    name: 'min',
                    exclusive: false,
                    params: { },
                    test: function (value) {
                        const getHours = new Date().getHours();

                        if (!isNaN(this.parent.day) && 
                            !isNaN(this.parent.month) && 
                            !isNaN(this.parent.year) && 
                            this.parent.year === new Date().getFullYear() && 
                            this.parent.month === new Date().getMonth() + 1 &&
                            this.parent.day === new Date().getDate() &&
                            value < getHours) {
                            return this.createError({ message: `Hour must be greater than or equal to ${getHours}`})
                        }
                        else if (value < 0) {
                            return this.createError({ message: 'Hour must be greater than or equal to 0'});
                        }
                        return true;
                    }
                }).max(23),
            minute: number().typeError('minute must be a number').required().test({
                    name: 'min',
                    exclusive: false,
                    params: { },
                    test: function (value) {
                        const getMinutes = new Date().getMinutes();

                        if (!isNaN(this.parent.day) && 
                            !isNaN(this.parent.month) && 
                            !isNaN(this.parent.year) && 
                            !isNaN(this.parent.hour) && 
                            this.parent.year === new Date().getFullYear() && 
                            this.parent.month === new Date().getMonth() + 1 &&
                            this.parent.day === new Date().getDate() &&
                            this.parent.hour === new Date().getHours() &&
                            value <= getMinutes) {
                            return this.createError({ message: `Minute must be greater than or equal to ${getMinutes + 1}`})
                        }
                        else if (value < 0) {
                            return this.createError({ message: 'Minute must be greater than or equal to 0'});
                        }
                        return true;
                    }
                }).max(59),
            eventDescription: string().required()
        }));

        return {
            schema
        }
    },
    methods: {
        handleSubmit(eventData, { resetForm }) {
            resetForm();
            this.$emit('addNewEvent', eventData)
        },
        handleCancelButton() {
            this.$refs.form.resetForm();
            this.closeShow();
        }
    }
}
</script>

<style scoped>
.EventForm {
    max-width: 400px;
    padding: 10px 0;
}
.EventForm__ButtonWrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.EventForm__Form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

@media (min-width: 560px) {
    .EventForm__Form {
        flex-direction: row;
        flex-wrap: wrap;
    }
}

@media (min-width: 768px) {
    .EventForm {
        max-width: 700px;
    }
}
</style>