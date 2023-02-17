<script lang="ts">
import ComputerBox from "../components/ComputerBox.vue";
import ComputerDataService from "@/services/ComputerDataService";
import type Computer from "@/types/ComputerType";
import type ResponseData from "@/types/ResponseDataTypes";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPlus } from '@mdi/js'
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'


export default {

    // Properties returned from data() become reactive state
    // and will be exposed on `this`.
    data() {
        return {
            name: "",
            valid: true,
            snackbar: false,
            message: "",
            path: mdiPlus,
            dialog: false,
            computer: {} as Computer,
        }
    },
    components: {
        SvgIcon
    },

    // Methods are functions that mutate state and trigger updates.
    // They can be bound as event listeners in templates.
    methods: {
        nameValidation() {
            if (this.name == "") {
                this.valid = false
                return false
            }
            return true;
        },
        async addNotification() {
            this.snackbar = true;
        },
        async refreshComputerData(computer: Computer) {
            this.$emit('computer', computer);
        },
        async createComputer() {
            if (this.nameValidation()) {
                await ComputerDataService.create({ name: this.name })
                    .then((response: ResponseData) => {
                        this.computer = response.data.data;
                        this.message = response.data.message
                    })
                    .catch((e: Error) => {
                        console.log(e);
                    });
            }
        },
        async setComputer() {
            await this.$nextTick(); // wait until a new text-field will be rendered
            await this.createComputer();
            this.addNotification();
            this.refreshComputerData(this.computer)
            this.dialog = false;
            this.name = ""
        }
    },
}
</script>

<template>
    <main>
        <v-dialog class="add-computer-dialog" v-model="dialog" width="auto">
            <template v-slot:activator="{ props }">
                <v-btn class="add-computer-btn" v-bind="props">
                    <svg-icon type="mdi" class="icon" :path="path"></svg-icon>
                    <span class="add-computer-txt">Ajouter poste</span>
                </v-btn>
            </template>

            <v-card>
                <v-card-title>Ajouter un nouveau poste</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field v-model="name" label="Nom du poste"
                            :rules="[v => !!v || 'Veuillez entrer un nom de poste.']"></v-text-field>
                        <span v-if="valid != true" class="error-text">Veuillez entrer un nom de poste. </span>
                        <v-btn color="#385a50" class="add-computer" block @click="setComputer()">Confirmer</v-btn>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="#385a50" block @click="dialog = false">Fermer</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar">
            {{ message }}
            <template v-slot:actions>
                <v-btn color="pink" variant="text" @click="snackbar = false">
                    Fermer
                </v-btn>
            </template>
        </v-snackbar>

    </main>
</template>

<style scoped>
.error-text {
    color: red;
}

.add-computer {
    border: 1px solid black;
    color: #fff;
}

.add-computer-dialog {
    border: 1px solid black;
}

.add-computer-actions {
    display: inline-flex;
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

@media (min-width: 1024px) {}
</style>
