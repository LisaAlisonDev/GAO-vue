<script setup lang="ts">
import type Computer from '@/types/ComputerType'

defineProps<{
    computer : Computer,
}>();
</script>

<template>
    <h1>{{ computer.name }}</h1>
     <div class="hour_slot" v-for="n in 10">
        <p>{{ 7 + n }} h</p>
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
.hour_slot {
    height: 80px;
    margin-top: 10px;
    padding-inline: 15px;
    border-bottom: 1px solid black;
}
.computers_box {
    display: inline-flex;
    margin-top: 20px;
    width: 100%;
}


@media (min-width: 1024px) {}
</style>
