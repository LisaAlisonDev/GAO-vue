<script  lang="ts">
import ComputerDataService from '@/services/ComputerDataService';
import type Computer from '@/types/ComputerType'
import type ResponseData from '@/types/ResponseDataTypes';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDelete } from '@mdi/js';

export default {
    props: ['computer'],
    data() {
        return {
            dialog: false,
            data: this.computer,
            deleteIcon: mdiDelete,
            snackbar: false,
            message: ""
        }
    },
    components: {
        SvgIcon
    },
    emits: ["deleted"],
    methods: {
        deleteComputer(id : number) {
            ComputerDataService.delete(id)
                .then((response: ResponseData) => {
                    if (response.status !== 200) {
                        this.showSnackBar("Une erreur est survenue.")
                    }
                    this.setUpdate(response.data.data)
                })
                .catch((e: Error) => {
                    this.showSnackBar("Une erreur est survenue.")
                    console.log(e);
                });
        },
        setUpdate(data: Computer) {
            this.showSnackBar("Le poste à bien été supprimé !")
            this.refreshData(data)
            this.dialog = false
        },
        async refreshData(value: Computer) {
            this.$emit('deleted', value)
        },
        showSnackBar(message: string) {
            this.message = message;
            this.snackbar = true;
        },
    }
}
</script>


<template>
    <v-dialog class="edit-computer-dialog" v-model="dialog" width="50%">
        <template v-slot:activator="{ props }">
            <v-btn class="delete-computer-btn" v-bind="props">
                <svg-icon type="mdi" :path="deleteIcon"></svg-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>Supprimer ce poste</v-card-title>
            <v-card-text>
                <p>Etes-vous sûr de vouloir supprimer ce poste ?</p>
                <div class="delete-actions-btn">
                    <v-btn color="red" block @click="deleteComputer(computer.id)">Supprimer</v-btn>
                </div>
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
.edit-computer-dialog {
    width: 100%;
}

.delete-actions-btn {
    width: 50%;
    padding-top: 10px;
    margin: auto;
    text-align: center;
}

.delete-computer-btn {
    border: 1px solid black;
    box-shadow: none;
    margin-right: 5px;
}
</style>