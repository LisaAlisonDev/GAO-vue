<script  lang="ts">
import type Computer from '@/types/ComputerType'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDelete, mdiPlus } from '@mdi/js';

export default {
    props: ['computer'],
    data() {
        return {
            plusIcon: mdiPlus,
            deleteIcon: mdiDelete
        }
    },
    components: {
        SvgIcon,
    },
    emits: ["refreshEvent"],
    methods: {
        refreshComputer(value: Computer) {
            this.$emit('refreshEvent', value)
        },
    },
}
</script>

<template>
    <div class="computer_actions">
        <h1>{{ computer.name }}</h1>
        <div class="computer_actions_btn">
            <EditComputer :computer="computer" @edited="refreshComputer" />
            <DeleteComputer :computer="computer" @deleted="refreshComputer" />
        </div>
    </div>
    <div class="hour_slot" v-for="n in 10">
        <p>{{ 7 + n }} h</p>
        <v-btn class="add-booking-btn">
            <svg-icon type="mdi" :path=plusIcon class=""></svg-icon>
        </v-btn>
    </div>
</template>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 1rem;
    padding-inline: 15px;
    margin-top: 20px;
    margin-bottom: 20px;
}

h3 {
    font-size: 1.2rem;
}

.add-booking-btn {
    float: right;
    border: 1px solid black;
}

.hour_slot {
    height: 80px;
    margin-top: 10px;
    padding-inline: 15px;
    display: block;
    border-bottom: 1px solid black;
}

.computers_box {
    display: inline-flex;
    margin-top: 20px;
    width: 100%;
}

.computer_actions {
    display: flex;
    justify-content: space-between;
}

.computer_actions_btn {
    margin-top: 10px;
    margin-right: 10px;
    float: right;
}


@media (min-width: 1024px) {}
</style>
