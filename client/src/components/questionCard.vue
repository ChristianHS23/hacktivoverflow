<template>
    <v-container py-3 my-1>
        <v-card>
            <v-layout>
                <v-flex xs1>
                    <v-layout column>
                        <v-flex xs12>
                            <p class="text-md-center">
                                {{getVote()}}
                            </p>
                        </v-flex>
                        <v-flex>
                            <p class="text-md-center">
                                Votes
                            </p>
                        </v-flex>
                        <v-flex xs12>
                            <p class="text-md-center">
                                {{question.answers.length}}
                            </p>
                        </v-flex>
                        <v-flex xs12>
                            <p class="text-md-center">
                                Answers
                            </p>
                        </v-flex>
                    </v-layout>
                </v-flex>
                
                <v-flex xs9>
                    <v-card-title>
                        <div class="text-truncate">
                            <router-link :to="{name: 'question', params: {id: question._id}} ">
                                    {{question.title}}
                            </router-link>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <div class="text-truncate">
                            {{question.description}}
                        </div>
                    </v-card-text>
                </v-flex>

                <v-flex xs2>
                    <v-layout column>
                        <v-flex xs12>
                        <p>Posted By</p>
                        <small>{{question.author.username}}</small>
                        <br>
                        <div class="text-truncate">
                        <small>{{question.author.email}}</small>
                        </div>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs12>
                            <small>{{Date(question.created_at).toString()}}</small>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-card>
    </v-container>

</template>

<script>
export default {
    name: 'CardQuestion',
    props: ['question'],
    methods: {
        getVote() {
            if(!this.question.voters.length) {
                return this.question.voters.length
            } else{
                let upvote = this.question.voters.filter(e => e.status === "upvote").length
                let downvote = this.question.voters.filter(e => e.status === "downvote").length
                return upvote - downvote
            }
        }
    },
}
</script>

<style>

</style>
