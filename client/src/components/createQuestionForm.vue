<template>
    <div id="formQuestion">
        <v-stepper v-model="e1">
            <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Title</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">Description</v-stepper-step>

            </v-stepper-header>

            <v-stepper-items>
            <v-stepper-content step="1">
                <v-card
                class="mb-5"
                color="grey lighten-4"
                height="200px"
                >
                <v-container>
                    <v-layout align-center>
                        <v-flex xs12 align-center justify-space-between>
                            <v-text-field
                                v-model="question.title"
                                :rules="[rules.required]"
                                placeholder="Title"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                </v-card>

                <v-btn
                color="primary"
                @click="e1 = 2"
                >
                Continue
                </v-btn>

            </v-stepper-content>

            <v-stepper-content step="2">
                <v-card
                class="mb-5"
                color="grey lighten-4"
                >
                <v-container>
                    <v-layout align-center>
                        <v-flex xs12 align-center justify-space-between>
                            <wysiwyg v-model="question.description" />
                        </v-flex>
                    </v-layout>
                </v-container>
                </v-card>

                <v-btn
                color="primary"
                @click="createQuestion"
                >
                Done
                </v-btn>

                <v-btn flat 
                @click="e1 = 1"
                >Back</v-btn>
            </v-stepper-content>

            </v-stepper-items>
        </v-stepper>
    </div>
</template>

<script>
export default {
    data() {
        return {
            e1: 0,
            question: {
                title: '',
                description: '',
            },
            rules: {
                required: value => !!value || 'Required.',
            }
        }
    },
    methods: {
        createQuestion() {
            console.log(this.question)
            this.$store.dispatch('createQuestion', this.question)
        }
    },
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

</style>
