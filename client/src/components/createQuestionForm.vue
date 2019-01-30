<template>
    <div id="formQuestion">
        <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
                <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                    <v-text-field
                        v-model="question.title"
                        :rules="[rules.required]"
                        placeholder="Title"
                    ></v-text-field>
                </v-layout>
                </v-flex>

                <v-flex xs12>
                    <v-textarea
                    box
                    name="input-7-4"
                    label="Box textarea"    
                    ></v-textarea>
                </v-flex>
                <!-- <v-flex xs12>
                <v-text-field
                    prepend-icon="mail"
                    placeholder="Email"
                    :rules="[rules.required, rules.email]"
                    v-model="user.email"
                ></v-text-field>
                </v-flex> -->
            </v-layout>
            </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            question: {
                title: '',
                descripion: '',
            },
            rules: {
                required: value => !!value || 'Required.',
            }
        }
    },
}
</script>

<style>

</style>
