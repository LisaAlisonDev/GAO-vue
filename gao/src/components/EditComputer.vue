<script lang="ts">
import ComputerDataService from "@/services/ComputerDataService";
import type Computer from "@/types/ComputerType";
import type ResponseData from "@/types/ResponseDataTypes";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPencil } from '@mdi/js'

export default {
    props: ['computer'],
    // Properties returned from data() become reactive state
    // and will be exposed on `this`.
    data() {
        return {
            name: "",
            valid: true,
            snackbar: false,
            message: "",
            path: mdiPencil,
            dialog: false,
        }
    },
    components: {
        SvgIcon
    },
    emits: ["edited"],

    // Methods are functions that mutate state and trigger updates.
    // They can be bound as event listeners in templates.
    methods: {
        updateComputer() {
            if (this.nameValidation()) {
                ComputerDataService.update(this.computer.id, { name: this.name})
                    .then(async (response: ResponseData) => {
                        if (response.status != 200) {
                            this.showSnackBar("Une erreur est survenue.")
                        }
                        this.setUpdate(response)
                        this.showSnackBar(response.data.message)
                    })
                    .catch((e: Error) => {
                        this.showSnackBar("Une erreur est survenue.")
                        console.log(e);
                    });
            }
        },
        nameValidation() {
            if (this.name == this.computer.name) {
                this.valid = false
                return false
            }
            return true;
        },
        setUpdate(data: any) {
            this.refreshComputerData({ data }.data)
            this.dialog = false
        },
        showSnackBar(message: string) {
            this.message = message;
            this.snackbar = true;
        },
        refreshComputerData(computer: Computer) {
            this.$emit('edited', computer);
        },

    },
}
</script>

<template>
    <v-dialog class="edit-computer-dialog" v-model="dialog" width="50%">
        <template v-slot:activator="{ props }">
            <v-btn class="edit-computer-btn" v-bind="props">
                <svg-icon type="mdi" :path="path"></svg-icon>
            </v-btn>
        </template>

        <v-card>
            <v-card-title>Editer ce poste : {{ computer.name }}</v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="name" :placeholder=computer.name label="Nom du poste"
                        :rules="[v => !!v || 'Veuillez entrer un nom de poste.']"></v-text-field>
                    <span v-if="valid != true" class="error-text">Veuillez entrer un nom de poste. </span>
                    <v-btn color="#385a50" class="edit-computer" block @click="updateComputer()">Modifier</v-btn>
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
</template>
<style scoped>
.edit-computer {
    color : #fff
}
.edit-computer-dialog {
    width: 100%;
}

.edit-computer-btn {
    border: 1px solid black;
    box-shadow: none;
    margin-right: 5px;
    background-color: #adbab6;
}
</style>