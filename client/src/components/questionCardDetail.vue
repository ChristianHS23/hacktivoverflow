<template>
    <div id="detailquestion">
        <v-container grid-list-md>
        <v-card>

            <v-layout row>
                <v-flex xs1>
                    <v-layout align-center justify-center column fill-height>

                        <v-btn flat icon color="indigo" @click="upvoteQuestion">
                            <v-icon>arrow_upward</v-icon>
                        </v-btn>
                            {{question.voters}}
                        <v-btn flat icon color="indigo" @click="downvoteQuestion">
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
                            <p class="card-text" v-html="question.description"></p>
                        </v-flex>

                        <v-flex xs12>
                            <v-layout  align-center justify-end row fill-height>
                                <v-btn flat color="warning" :to="{name: 'edit-question', params: {id: question._id}}">Edit</v-btn>
                                <v-btn flat color="error" @click="deleteQuestion">Delete</v-btn>
                            </v-layout>
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

                                <v-btn flat icon color="indigo" @click="upvoteAnswer(answer._id)">
                                    <v-icon>arrow_upward</v-icon>
                                </v-btn>
                                    {{answer.voters}}
                                <v-btn flat icon color="indigo" @click="downvoteAnswer(answer._id)">
                                    <v-icon>arrow_downward</v-icon>
                                </v-btn>

                            </v-layout>
                        </v-flex>

                        <v-flex xs9>
                            <v-layout column>
                                <v-flex xs12>
                                    <p class="card-text" v-html="answer.description"></p>
                                </v-flex>
                                <br>
                            </v-layout>
                        </v-flex>

                        <v-flex xs2>
                            <v-layout  align-center justify-end row fill-height>
                                <v-btn flat color="warning" :to="{name: 'edit-answer', params: {id: answer._id}}">Edit</v-btn>
                            </v-layout>
                        </v-flex>

                    </v-layout>
                </v-card>
            </v-container>

            <v-card>
                <v-layout align-center column>
                    <v-flex xs12>
                        <wysiwyg v-model="answer.description" />
                    </v-flex>
                    <v-btn
                    flat
                    color="primary"
                    @click="createAnswer"
                    >
                        Answer
                    </v-btn>
                </v-layout>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
  name: 'QuestionDetail',
  data () {
    return {
      answer: {
        description: ''
      }
    }
  },
  computed: {
    question () {
      return this.$store.state.question
    }
  },
  methods: {
    upvoteQuestion () {
      this.$store.dispatch('upvoteQuestion', this.question._id)
        .then(() => {
          this.$store.dispatch('getSingleQuestion', this.$route.params.id)
        })
        .catch((err) => {
          this.$swal('You Need Login First', '', 'error')
        })
    },
    downvoteQuestion () {
      this.$store.dispatch('downvoteQuestion', this.question._id)
        .then(() => {
          this.$store.dispatch('getSingleQuestion', this.$route.params.id)
        })
        .catch((err) => {
          this.$swal('You Need Login First', '', 'error')
        })
    },
    upvoteAnswer (answerId) {
      this.$store.dispatch('upvoteAnswer', answerId)
        .then(() => {
          this.$store.dispatch('getSingleQuestion', this.$route.params.id)
        })
        .catch((err) => {
          this.$swal('You Need Login First', '', 'error')
        })
    },
    downvoteAnswer (answerId) {
      this.$store.dispatch('downvoteAnswer', answerId)
        .then(() => {
          this.$store.dispatch('getSingleQuestion', this.$route.params.id)
        })
        .catch((err) => {
          this.$swal('You Need Login First', '', 'error')
        })
    },
    createAnswer () {
      let data = {
        answer: this.answer,
        questionId: this.$route.params.id
      }

      this.$store.dispatch('createAnswer', data)
        .then(result => {
          this.$swal('Success Create Answer', '', 'success')
          this.$store.dispatch('getSingleQuestion', this.$route.params.id)
          this.answer.description = ''
        })
        .catch(err => {
          this.$swal('You Need Login First', '', 'error')
        })
    },
    deleteQuestion() {
        this.$swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this question",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                this.$store.dispatch('deleteQuestion', this.$route.params.id)
            } 
        });

    },
  },
  created () {
    this.$store.dispatch('getSingleQuestion', this.$route.params.id)
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

</style>
