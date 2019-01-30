<template>
    <div id="detailquestion">
        <v-container grid-list-md>
        <v-card>

            <v-layout row>
                <v-flex xs1>
                    <v-layout align-center justify-center column fill-height>

                        <v-btn flat icon color="indigo">
                            <v-icon>arrow_upward</v-icon>
                        </v-btn>
                            {{question.voters}}
                        <v-btn flat icon color="indigo">
                            <v-icon>arrow_downward</v-icon>
                        </v-btn>

                    </v-layout>
                </v-flex>

                <v-flex xs11>
                    <v-layout column>
                        <v-flex xs12>
                            <a :to="{name: 'question', params: {id: question._id}} ">
                                <h1 class="text-md-center">{{question.title}}</h1>
                            </a>
                        </v-flex>
                        
                        <v-flex xs12>
                            {{question.description}}
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-card>
        <br>
        <hr>

            <p class="subheading text-md-center" v-if="question.answers.length === 0"> There still no answer to this question become first to answer</p>
            <v-container grid-list-md
            v-for="(answer, i) in question.answers"
            :key="i"
            >
                <v-card>
                    <v-layout row>
                        <v-flex xs1>
                            <v-layout align-center justify-center column fill-height>

                                <v-btn flat icon color="indigo">
                                    <v-icon>arrow_upward</v-icon>
                                </v-btn>
                                    {{answer.voters}}
                                <v-btn flat icon color="indigo">
                                    <v-icon>arrow_downward</v-icon>
                                </v-btn>

                            </v-layout>
                        </v-flex>

                        <v-flex xs11>
                            <v-layout column>
                                <v-flex xs12>
                                    <h3>{{answer.title}}</h3>
                                </v-flex>
                                
                                <v-flex xs12>
                                    {{answer.description}}
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-container>

        </v-container>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'QuestionDetail',
    data() {
        return {
            
        }
    },
    computed: {
        question () {
            return this.$store.state.question
        },
    },
    methods: {
        
    },
    created() {
        this.$store.dispatch('getSingleQuestion', this.$route.params.id)
    },
}
</script>

<style>

</style>
