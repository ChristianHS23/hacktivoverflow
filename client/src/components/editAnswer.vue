<template>
    <div id="edit-answer-component">
        <v-stepper v-model="e1">
            <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Description</v-stepper-step>

            </v-stepper-header>

            <v-stepper-items>
            <v-stepper-content step="1">
                <v-card
                class="mb-5"
                color="grey lighten-4"
                >
                <v-container>
                    <v-layout align-center>
                        <v-flex xs12 align-center justify-space-between>
                           <wysiwyg v-model="answer.description" />
                        </v-flex>
                    </v-layout>
                </v-container>
                </v-card>

                <v-btn
                color="primary"
                @click="updateAnswer"
                >
                Done
                </v-btn>

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
        }
    },
    computed: {
        answer () {
            return this.$store.state.answer
        }
    },
    methods: {
        updateAnswer () {
            let objUpdate = {
                answer: this.answer,
                answerId: this.$route.params.id,
                questionId: this.answer.question
            }
            this.$store.dispatch('updateAnswer', objUpdate)
        }
    },
    created() {
        this.$store.dispatch('getSingleAnswer', this.$route.params.id)
    },

}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

</style>
