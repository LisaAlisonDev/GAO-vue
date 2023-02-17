<script lang="ts">
import ComputerBox from "../components/ComputerBox.vue";
import ComputerDataService from "@/services/ComputerDataService";
import type Computer from "@/types/ComputerType";
import type ResponseData from "@/types/ResponseDataTypes";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPlus } from '@mdi/js'

export default {
    // Properties returned from data() become reactive state
    // and will be exposed on `this`.
    data() {
        return {
            path: mdiPlus,
            dialog: false,
            computerList: [] as Computer[]
        }
    },
    components: {
		SvgIcon
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
        },
        refreshComputerList(value : Computer){
            this.computerList.pop()
            this.computerList.unshift(value)
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
        <AddComputer @computer="refreshComputerList"/> 
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
    border: 1px solid #000000;
    border-radius: 5px;
    display: inline-flex;
    margin: 5px;
    width: 200px;
    height: 50px;
    float: right;
    line-height: 50px;
    text-align: center;
}
.add-computer-txt, .icon {
    color: #fafdfc;
    display: inline-flex;
    align-items: center;
    vertical-align: middle;

}
div.add-computer-btn {
    display: inline-block;
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
