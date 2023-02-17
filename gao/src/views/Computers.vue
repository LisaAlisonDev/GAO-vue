<script lang="ts">
import ComputerBox from "../components/ComputerBox.vue";
import ComputerDataService from "@/services/ComputerDataService";
import type Computer from "@/types/ComputerType";
import type ResponseData from "@/types/ResponseDataTypes";

export default {
    // Properties returned from data() become reactive state
    // and will be exposed on `this`.
    data() {
        return {
            computerList: [] as Computer[]
        }
    },

    // Methods are functions that mutate state and trigger updates.
    // They can be bound as event listeners in templates.
    methods: {
        retrieveComputers() {
            ComputerDataService.getAll()
                .then((response: ResponseData) => {
                    this.computerList = response.data.data.data;
                    console.log(response.data.data.data);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }
    },

    // Lifecycle hooks are called at different stages
    // of a component's lifecycle.
    // This function will be called when the component is mounted.
    mounted() {
        this.retrieveComputers()
    }
}
</script>

<template>
    <main>
        <div>
            <a href="" class="add-computer-btn">Ajouter poste</a>
        </div>
        <div class="computers_box">
            <div v-for="(item, index) in computerList" :key="index" class="computer_box">
                <ComputerBox :computer=item! />
            </div>
        </div>
    </main>
</template>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 2.6rem;
    top: -10px;
}

h3 {
    font-size: 1.2rem;
}
.add-computer-btn{
    background: #adbab6;
    color: #fafdfc;
    border: 1px solid #000000;
    border-radius: 5px;
    display: inline-block;
    margin: 5px;
    padding: 10px;
    width: 200px;
    float: right;
}
div.add-computer-btn {
    display: inline-block;
    justify-self: end;
    justify-items: end;
}
.computers_box {
    display: inline-flex;
    margin-top: 20px;
    width: 100%;
}

.computer_box {
    display: block;
    background-color: white;
    border: 1px solid black;
    width: 50%;
    height: 100%;
    margin-inline: 10px;
}

@media (min-width: 1024px) {}
</style>
