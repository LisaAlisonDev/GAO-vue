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
            page: 1,
            maxPage: 0,
            total: 0,
            currentPage: 1,
            computerList: [] as Computer[]
        }
    },
    components: {
        SvgIcon
    },
    // Methods are functions that mutate state and trigger updates.
    // They can be bound as event listeners in templates.
    methods: {
        retrieveComputers(page: number) {
            ComputerDataService.getAll(page)
                .then((response: ResponseData) => {
                    this.computerList = response.data.data.data;
                    this.maxPage = response.data.data.last_page
                    this.total = response.data.data.total
                    this.currentPage = page
                    console.log(response.data.data.data);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },
        refreshComputerList(value: Computer) {
            this.retrieveComputers(this.currentPage)
        },
        changeToNextPage() {
            this.currentPage++
            if (this.currentPage < this.maxPage) {
                this.retrieveComputers(this.currentPage)
            }
        },
        changeToPreviousPage() {
            this.currentPage--
            if (this.currentPage < this.maxPage) {
                this.retrieveComputers(this.currentPage)
            }
        }
    },
    // Lifecycle hooks are called at different stages
    // of a component's lifecycle.
    // This function will be called when the component is mounted.
    mounted() {
        this.retrieveComputers(this.page)
    }
}
</script>

<template>
    <main>
        <div class="computer_pagination">
            <v-btn @click="changeToPreviousPage()" v-if="currentPage !== 1" class="pagination_number">&lt;</v-btn>
            <v-btn @click="retrieveComputers(n)" :active="n == currentPage" v-for="n in maxPage" class="pagination_number">
                {{ n }}
            </v-btn>
            <v-btn @click="changeToNextPage()" v-if="currentPage !== maxPage" class="pagination_number">Suivant</v-btn>
        </div>
        
        <AddComputer @computer="refreshComputerList" />
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

.computer_pagination {
    width: 60%;
    margin: auto;
    text-align: center;
}

.current_page {
    color: red !important;
}

.computer_pagination>.pagination_number {
    margin-top: 25px;
    display: inline-block;
    margin-right: 10px;
    height: 50px;
    line-height: 25px;
    background-color: white;
    padding: 15px;
    border: 1px solid black;
}

.add-computer-btn {
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

.add-computer-txt,
.icon {
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

@media (min-width: 1024px) {}</style>
